const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware autentikasi
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  // console.log('ID User dari Token:', userId);

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

router.post("/", authMiddleware, async (req, res) => {
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

router.put("/:id_course", authMiddleware, async (req, res) => {
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

router.delete("/:id_course", authMiddleware, async (req, res) => {
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
router.get("/:id_course", authMiddleware, async (req, res) => {
  const { id_course } = req.params;
  const userId = req.user.id;

  try {
    // Cek di tabel `user_payment_courses` apakah user sudah membayar kursus
    const { data: paymentData, error: paymentError } = await supabase
      .from("join_courses")
      .select("*")
      .eq("id_course", id_course)
      .eq("id_user", userId)
      .single();

    if (paymentError || !paymentData) {
      // Jika tidak ada data pembayaran yang cocok
      return res.status(403).json({ message: "Akses ditolak. Pembayaran belum dilakukan." });
    }

    // Jika pembayaran ditemukan, ambil data kursus
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id_course", id_course)
      .single();

    if (courseError) throw courseError;

    if (courseData) {
      res.status(200).json(courseData);
    } else {
      res.status(404).json({ message: "Data kursus tidak ditemukan" });
    }
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

module.exports = router;
