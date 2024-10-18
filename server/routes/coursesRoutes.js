const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../middleware/accessControl');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  const userId = req.user.id;
  // console.log('ID User dari Token:', req.user.role);

  try {
    // Ambil semua data dari tabel `courses`
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .order("id_course", { ascending: false });

    if (coursesError) throw coursesError;

    // Ambil data dari tabel `join_courses`
    const { data: joinCourses, error: joinCoursesError } = await supabase
      .from("join_courses")
      .select("*")
      .eq("id_user", userId);

    if (joinCoursesError) throw joinCoursesError;

    // Gabungkan data dari `courses` dan `join_courses` berdasarkan `id_course`
    const result = courses.map(course => {
      const joined = joinCourses.filter(join => join.id_course === course.id_course);
      return {
        ...course,
        joined_users: joined.map(join => join.id_user),
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { course_title, course_description } = req.body;

  try {
    const { data, error } = await supabase
      .from("courses")
      .insert([{ course_title, course_description }]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id_course", async (req, res) => {
  const { id_course } = req.params;
  const { course_title, course_description } = req.body;

  try {
    const { data, error } = await supabase
      .from("courses")
      .update({ course_title, course_description })
      .eq("id_course", id_course);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id_course", async (req, res) => {
  const { id_course } = req.params;

  try {
    const { data, error } = await supabase
      .from("courses")
      .delete()
      .eq("id_course", id_course);

    if (error) throw error;
    res.status(200).json({ message: "Data berhasil dihapus", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// * ini menampilkan kursus yang sudah di bayar(unutk detail)
router.get("/:id_course", async (req, res) => {
  const { id_course } = req.params;
  const userId = req.user.id;

  try {
    // Cek di tabel `join_courses` apakah user sudah membayar kursus
    const { data: paymentData, error: paymentError } = await supabase
      .from("join_courses")
      .select("*")
      .eq("id_course", id_course)
      .eq("id_user", userId)
      .single();

    if (paymentError || !paymentData) {
      return res.status(403).json({ message: "Akses ditolak. Pembayaran belum dilakukan." });
    }

    // Ambil data kursus beserta modulnya
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("*, modules(*)")
      .eq("id_course", id_course)
      .single();

    if (courseError) throw courseError;

    // Urutkan modul berdasarkan created_at
    if (courseData && courseData.modules) {
      courseData.modules.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    // Ambil data modul yang sudah dibuka oleh user
    const { data: openedModules, error: openedError } = await supabase
      .from("user_opened_modules")
      .select("id_modules")
      .eq("id_user", userId);

    if (openedError) throw openedError;

    // Tandai modul yang sudah dibuka oleh user
    if (courseData && courseData.modules) {
      const openedModuleIds = openedModules.map((module) => module.id_modules);
      courseData.modules = courseData.modules.map((module) => ({
        ...module,
        isOpened: openedModuleIds.includes(module.id_modules), // Tandai apakah modul sudah dibuka
      }));
    }

    res.status(200).json(courseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// * ini untuk mencatat modul yang sudah dibuka oleh user
router.post("/:id_course/open-module/:id_modules", async (req, res) => {
  const { id_course, id_modules } = req.params;
  const userId = req.user.id;

  try {
    // Log parameter untuk memastikan nilainya
    // console.log("ID Course:", id_course);
    // console.log("ID Module:", id_modules);
    // console.log("User ID:", userId);
    // Cek apakah data sudah ada di tabel user_opened_modules (agar tidak duplikat)
    const { data: existingData, error: existingError } = await supabase
      .from("user_opened_modules")
      .select("*")
      .eq("id_user", userId)
      .eq("id_modules", id_modules)
      .single();

    if (existingError && existingError.code !== 'PGRST116') throw existingError; // Error jika bukan karena data tidak ditemukan

    if (existingData) {
      return res.status(200).json({ message: "Modul sudah pernah dibuka sebelumnya." });
    }

    // Masukkan data baru ke tabel user_opened_modules
    const { data: insertData, error: insertError } = await supabase
      .from("user_opened_modules")
      .insert([{ id_user: userId, id_modules: id_modules }]);

    if (insertError) throw insertError;

    res.status(200).json({ message: "Modul berhasil dicatat sebagai dibuka." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// * ini menampilkan kursus yang mau di bayar(unutk payment)
router.get("/willpay/:id_course", async (req, res) => {
  const { id_course } = req.params;

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id_course", id_course)
      .single();

    if (error) throw error;

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ! ini unutk cek modul apakah sudah di buka semua
router.get('/check-completion/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  try {
    const { data: totalModules, error: modulesError } = await supabase
      .from('modules')
      .select('id_modules') 
      .eq('id_courses', courseId);

    if (modulesError) throw modulesError;

    if (totalModules.length === 0) {
      return res.status(404).json({ error: 'No modules found for this course' });
    }

    // Ambil modul yang telah diselesaikan user berdasarkan user dan id_modules
    const { data: completedModules, error: completedError } = await supabase
      .from('user_opened_modules')
      .select('id_modules')
      .in('id_modules', totalModules.map(module => module.id_modules)) // Filter berdasarkan modul yang terkait dengan courseId
      .eq('id_user', userId);

    if (completedError) throw completedError;

    // Cek apakah user sudah menyelesaikan semua modul
    if (completedModules.length === totalModules.length) {
      return res.json({ completed: true });
    } else {
      return res.json({ completed: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
