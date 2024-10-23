const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const { data: joinCourses, error: joinCoursesError } = await supabase
      .from("join_courses")
      .select("*")
      .eq("id_user", userId);

    if (joinCoursesError) throw joinCoursesError;

    const courseIds = joinCourses.map(join => join.id_course);

    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .in("id_course", courseIds)
      .order("id_course", { ascending: false })
      // .eq("status_course", "Activated")
      ;

    if (coursesError) throw coursesError;

    const progressPromises = courses.map(async (course) => {
      const { data: totalModules, error: modulesError } = await supabase
        .from("modules")
        .select("*")
        .eq("id_courses", course.id_course);

      if (modulesError) throw modulesError;

      const { data: openedModules, error: openedModulesError } = await supabase
        .from("user_opened_modules")
        .select("*")
        .eq("id_user", userId)
        .in("id_modules", totalModules.map(module => module.id_modules));

      if (openedModulesError) throw openedModulesError;

      // Hitung progress berdasarkan jumlah modul yang telah dibuka
      const totalModuleCount = totalModules.length;
      const openedModuleCount = openedModules.length;
      const progressPercentage = totalModuleCount > 0 ? ((openedModuleCount / totalModuleCount) * 100).toFixed(2) : 0;

      // Kembalikan data course beserta progressnya
      return {
        ...course,
        total_modules: totalModuleCount,
        opened_modules: openedModuleCount,
        progress: progressPercentage, // ! Persentase progress dengan 2 angka desimal itu di progressPercentage
      };
    });

    // Tunggu semua promises selesai dan kembalikan hasilnya
    const progressResults = await Promise.all(progressPromises);

    res.status(200).json(progressResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/semua-kursus", async (req, res) => {
  const userId = req.user.id;

  try {
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .order("id_course", { ascending: false })
      .eq("status_course", "Activated");

    if (coursesError) throw coursesError;

    const { data: joinCourses, error: joinCoursesError } = await supabase
      .from("join_courses")
      .select("*")
      .eq("id_user", userId);

    if (joinCoursesError) throw joinCoursesError;

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

router.get('/list-transactions', async (req, res) => {
  const idUser = req.user.id;

  try {
    const { data: payments, error: paymentsError } = await supabase
      .from('user_payment_courses')
      .select('*')
      .eq('id_user', idUser);

    if (paymentsError) throw paymentsError;

    const courseIds = payments.map(payment => payment.id_course);

    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id_course, course_title')
      .in('id_course', courseIds);

    if (coursesError) throw coursesError;

    const userIds = payments.map(payment => payment.id_user);
    const teacherIds = payments.map(payment => payment.id_user_teacher);

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id_user, name')
      .in('id_user', [...userIds, ...teacherIds]);

    if (usersError) throw usersError;

    const mergedData = payments.map(payment => {
      const course = courses.find(course => course.id_course === payment.id_course);
      const user = users.find(user => user.id_user === payment.id_user);
      const teacher = users.find(user => user.id_user === payment.id_user_teacher);

      return {
        ...payment,
        course_title: course ? course.course_title : 'Course Title tidak ditemukan',
        user_name: user ? user.name : 'User Name tidak ditemukan',
        teacher_name: teacher ? teacher.name : 'Teacher Name tidak ditemukan',
      };
    });

    // Kirim data hasil penggabungan
    res.status(200).json(mergedData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data courses, users, dan payments.' });
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
    const { data: paymentData, error: paymentError } = await supabase
      .from("join_courses")
      .select("*")
      .eq("id_course", id_course)
      .eq("id_user", userId)
      .single();

    if (paymentError || !paymentData) {
      console.log('Request Body:', userId);
      return res.status(403).json({ message: "Akses ditolak. Pembayaran belum dilakukan." });
    }

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
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id_course", id_course)
      .single();

    if (courseError) throw courseError;

    if (courseData) {
      const { data: modulesData, error: modulesError } = await supabase
        .from("modules")
        .select("header")
        .eq("id_courses", id_course);

      if (modulesError) throw modulesError;

      // Fetch user data based on id_user
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("name")
        .eq("id_user", courseData.id_user)
        .single();

      if (userError) throw userError;

      // Combine course, modules, and user data
      const result = {
        ...courseData,
        modules: modulesData,
        user: userData, // Add user data to the result
      };

      res.status(200).json(result);
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

// router.get('/profile/cek', async (req, res) => {
//   const userId = req.user.id;
//   try {
//     // Query untuk mengambil data dari tabel public.users
//     const { data: publicUsers, error: publicUsersError } = await supabase
//       .from('users')
//       .select('name, created_at, role, id_user')
//       .eq("id_user", userId)
//       .single();

//     if (publicUsersError) {
//       return res.status(400).json({ error: 'Error fetching public users: ' + publicUsersError.message });
//     }

//     // Query untuk mengambil data dari auth.users menggunakan Supabase Admin API
//     const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();

//     if (authUsersError) {
//       return res.status(400).json({ error: 'Error fetching auth users: ' + authUsersError.message });
//     }

//     // // Query untuk mengambil semua courses
//     // const { data: allCourses, error: allCoursesError } = await supabase
//     //   .from('courses')
//     //   .select('id_user');

//     // if (allCoursesError) {
//     //   return res.status(400).json({ error: 'Error fetching all courses: ' + allCoursesError.message });
//     // }

//     // // Hitung total courses per user
//     // const courseCounts = {};
//     // allCourses.forEach(course => {
//     //   if (course.id_user) {
//     //     courseCounts[course.id_user] = (courseCounts[course.id_user] || 0) + 1;
//     //   }
//     // });

//     // const { data: joinData, error: joinError } = await supabase
//     //   .from('join_courses')
//     //   .select('id_user', { count: 'exact' });

//     // if (joinError) {
//     //   return res.status(400).json({ error: joinError.message });
//     // }

//     // const uniqueUserIds = new Set(joinData.map(join => join.id_user));

//     // // Hitung jumlah pengguna unik yang bergabung
//     // const totalUniqueJoinedUsers = uniqueUserIds.size;

//     // Gabungkan data dari kedua tabel
//     const mergedData = publicUsers.map(publicUser => {
//       const authUser = authUsers.users.find(au => au.id === publicUser.id_user);
//       return {
//         ...publicUser,
//         email: authUser ? authUser.email : null,
//         last_sign_in_at: authUser ? authUser.last_sign_in_at : null,
//         // total_courses: courseCounts[publicUser.id_user] || 0, // Menghitung total courses
//         // total_unique_joined_users: totalUniqueJoinedUsers // Menambahkan totalUniqueJoinedUsers ke setiap pengguna
//       };
//     });

//     // Kembalikan data users yang sudah digabung
//     return res.status(200).json(mergedData); 
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error: ' + error.message });
//   }
// });

// router.get('/profile/cek', async (req, res) => {
//   const userId = req.user.id;
//   try {
//     // Query untuk mengambil data dari tabel public.users
//     const { data: publicUser, error: publicUsersError } = await supabase
//       .from('users')
//       .select('name, created_at, role, id_user, no_telp, foto')
//       .eq('id_user', userId)
//       .single(); // Menggunakan single karena kita hanya mengambil satu user berdasarkan id_user

//     if (publicUsersError) {
//       return res.status(400).json({ error: 'Error fetching public users: ' + publicUsersError.message });
//     }

//     // Query untuk mengambil data dari auth.users menggunakan Supabase Admin API
//     const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();

//     if (authUsersError) {
//       return res.status(400).json({ error: 'Error fetching auth users: ' + authUsersError.message });
//     }

//     // Cari user yang sesuai di authUsers berdasarkan id_user
//     const authUser = authUsers.users.find(au => au.id === publicUser.id_user);

//     // Gabungkan data dari publicUser dan authUser
//     const mergedData = {
//       ...publicUser,
//       email: authUser ? authUser.email : null,
//       last_sign_in_at: authUser ? authUser.last_sign_in_at : null,
//     };

//     return res.status(200).json(mergedData); // Kembalikan data user yang sudah digabung
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error: ' + error.message });
//   }
// });


module.exports = router;
