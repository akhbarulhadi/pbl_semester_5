const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');
const multer = require('multer');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);



router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .eq("id_user", userId)
      .order("id_course", { ascending: false });

    if (coursesError) throw coursesError;

    const { data: joinCourses, error: joinCoursesError } = await supabase
      .from("join_courses")
      .select("*");

    if (joinCoursesError) throw joinCoursesError;

    const { data: modules, error: modulesError } = await supabase
      .from("modules")
      .select("*");

    if (modulesError) throw modulesError;

    const { data: openedModules, error: openedModulesError } = await supabase
      .from("user_opened_modules")
      .select("*");

    if (openedModulesError) throw openedModulesError;

    // Hitung jumlah join_courses untuk setiap id_course
    const joinCountMap = {};
    joinCourses.forEach(join => {
      if (joinCountMap[join.id_course]) {
        joinCountMap[join.id_course]++;
      } else {
        joinCountMap[join.id_course] = 1;
      }
    });

    // Hitung persentase modul yang telah dikerjakan oleh user
    const moduleCompletionMap = {};
    const modulesPerCourse = {};

    // Hitung jumlah total modul per kursus
    modules.forEach(module => {
      if (!modulesPerCourse[module.id_courses]) {
        modulesPerCourse[module.id_courses] = 0;
      }
      modulesPerCourse[module.id_courses]++;
    });

    // Hitung jumlah modul yang telah dibuka user untuk setiap kursus
    openedModules.forEach(openedModule => {
      const { id_modules, id_user } = openedModule;
      const module = modules.find(m => m.id_modules === id_modules);
      if (module) {
        if (!moduleCompletionMap[module.id_courses]) {
          moduleCompletionMap[module.id_courses] = {};
        }
        if (!moduleCompletionMap[module.id_courses][id_user]) {
          moduleCompletionMap[module.id_courses][id_user] = 0;
        }
        moduleCompletionMap[module.id_courses][id_user]++;
      }
    });

    // Gabungkan data dari `courses` dengan jumlah join_courses dan persentase penyelesaian modul
    const result = courses.map(course => {
      const totalModules = modulesPerCourse[course.id_course] || 0;
      const userCompletion = moduleCompletionMap[course.id_course] || {};

      const totalOpenedModules = Object.values(userCompletion).reduce(
        (acc, value) => acc + value,
        0
      );
      const totalUsers = Object.keys(userCompletion).length;

      const completionPercentage =
        totalModules > 0 && totalUsers > 0
          ? (totalOpenedModules / (totalModules * totalUsers)) * 100
          : 0;

      return {
        ...course,
        joined_count: joinCountMap[course.id_course] || 0,
        completion_percentage: completionPercentage.toFixed(2),
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// router.get("/dashboard", async (req, res) => {
//   const userId = req.user.id;

//   try {
//     // Fetch data from the `courses` table based on id_user
//     const { data: courses, error: coursesError } = await supabase
//       .from("courses")
//       .select("*")
//       .eq("id_user", userId)
//       .order("id_course", { ascending: false });

//     if (coursesError) throw coursesError;

//     // Count the total number of courses
//     const totalCourses = courses.length;

//     // Fetch all data from the `join_courses` table
//     const { data: joinCourses, error: joinCoursesError } = await supabase
//       .from("join_courses")
//       .select("*");

//     if (joinCoursesError) throw joinCoursesError;

//     // Fetch data from the `modules` and `user_opened_modules` tables
//     const { data: modules, error: modulesError } = await supabase
//       .from("modules")
//       .select("*");

//     if (modulesError) throw modulesError;

//     const { data: openedModules, error: openedModulesError } = await supabase
//       .from("user_opened_modules")
//       .select("*");

//     if (openedModulesError) throw openedModulesError;

//     // Count the number of join_courses for each id_course
//     const joinCountMap = {};
//     joinCourses.forEach(join => {
//       if (joinCountMap[join.id_course]) {
//         joinCountMap[join.id_course]++;
//       } else {
//         joinCountMap[join.id_course] = 1;
//       }
//     });

//     // Calculate total joined count overall
//     const totalJoinedCount = joinCourses.length;

//     // Calculate unique user IDs in join_courses
//     const uniqueUserIds = new Set(joinCourses.map(join => join.id_user));
//     const totalSiswa = uniqueUserIds.size;

//     // Calculate module completion percentages
//     const moduleCompletionMap = {};
//     const modulesPerCourse = {};

//     // Count total modules per course
//     modules.forEach(module => {
//       if (!modulesPerCourse[module.id_courses]) {
//         modulesPerCourse[module.id_courses] = 0;
//       }
//       modulesPerCourse[module.id_courses]++;
//     });

//     // Count opened modules by user for each course
//     openedModules.forEach(openedModule => {
//       const { id_modules, id_user } = openedModule;
//       const module = modules.find(m => m.id_modules === id_modules);
//       if (module) {
//         if (!moduleCompletionMap[module.id_courses]) {
//           moduleCompletionMap[module.id_courses] = {};
//         }
//         if (!moduleCompletionMap[module.id_courses][id_user]) {
//           moduleCompletionMap[module.id_courses][id_user] = 0;
//         }
//         moduleCompletionMap[module.id_courses][id_user]++;
//       }
//     });

//     // Combine data from `courses` with join_counts and completion percentages
//     const result = courses.map(course => {
//       const totalModules = modulesPerCourse[course.id_course] || 0;
//       const userCompletion = moduleCompletionMap[course.id_course] || {};

//       const totalOpenedModules = Object.values(userCompletion).reduce(
//         (acc, value) => acc + value,
//         0
//       );
//       const totalUsers = Object.keys(userCompletion).length;

//       const completionPercentage =
//         totalModules > 0 && totalUsers > 0
//           ? (totalOpenedModules / (totalModules * totalUsers)) * 100
//           : 0;

//       return {
//         ...course,
//         joined_count: joinCountMap[course.id_course] || 0,
//         completion_percentage: completionPercentage.toFixed(2), // Calculate percentage of completed modules
//       };
//     });

//     // Send results with total joined count, total siswa, and total courses
//     res.status(200).json({
//       courses: result,
//       total_joined_count: totalJoinedCount,
//       total_siswa: totalSiswa, // Add total siswa to the response
//       total_courses: totalCourses // Add total courses to the response
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// router.get("/dashboard", async (req, res) => {
//   const userId = req.user.id;

//   try {
//     // Ambil data dari tabel `courses` berdasarkan id_user
//     const { data: courses, error: coursesError } = await supabase
//       .from("courses")
//       .select("*")
//       .eq("id_user", userId)
//       .order("id_course", { ascending: false });

//     if (coursesError) throw coursesError;

//     // Ambil semua data dari tabel `join_courses`
//     const { data: joinCourses, error: joinCoursesError } = await supabase
//       .from("join_courses")
//       .select("*");

//     if (joinCoursesError) throw joinCoursesError;

//     // Ambil data dari tabel `modules` dan `user_opened_modules`
//     const { data: modules, error: modulesError } = await supabase
//       .from("modules")
//       .select("*");

//     if (modulesError) throw modulesError;

//     const { data: openedModules, error: openedModulesError } = await supabase
//       .from("user_opened_modules")
//       .select("*");

//     if (openedModulesError) throw openedModulesError;

//     // Hitung jumlah join_courses untuk setiap id_course
//     const joinCountMap = {};
//     joinCourses.forEach(join => {
//       if (joinCountMap[join.id_course]) {
//         joinCountMap[join.id_course]++;
//       } else {
//         joinCountMap[join.id_course] = 1;
//       }
//     });

//     // Hitung persentase modul yang telah dikerjakan oleh user
//     const moduleCompletionMap = {};
//     const modulesPerCourse = {};

//     // Hitung jumlah total modul per kursus
//     modules.forEach(module => {
//       if (!modulesPerCourse[module.id_courses]) {
//         modulesPerCourse[module.id_courses] = 0;
//       }
//       modulesPerCourse[module.id_courses]++;
//     });

//     // Hitung jumlah modul yang telah dibuka user untuk setiap kursus
//     openedModules.forEach(openedModule => {
//       const { id_modules, id_user } = openedModule;
//       const module = modules.find(m => m.id_modules === id_modules);
//       if (module) {
//         if (!moduleCompletionMap[module.id_courses]) {
//           moduleCompletionMap[module.id_courses] = {};
//         }
//         if (!moduleCompletionMap[module.id_courses][id_user]) {
//           moduleCompletionMap[module.id_courses][id_user] = 0;
//         }
//         moduleCompletionMap[module.id_courses][id_user]++;
//       }
//     });

//     // Gabungkan data dari `courses` dengan jumlah join_courses dan persentase penyelesaian modul
//     const result = courses.map(course => {
//       const totalModules = modulesPerCourse[course.id_course] || 0;
//       const userCompletion = moduleCompletionMap[course.id_course] || {};

//       const totalOpenedModules = Object.values(userCompletion).reduce(
//         (acc, value) => acc + value,
//         0
//       );
//       const totalUsers = Object.keys(userCompletion).length;

//       const completionPercentage =
//         totalModules > 0 && totalUsers > 0
//           ? (totalOpenedModules / (totalModules * totalUsers)) * 100
//           : 0;

//       return {
//         ...course,
//         joined_count: joinCountMap[course.id_course] || 0,
//         completion_percentage: completionPercentage.toFixed(2), // Menghitung persentase modul yang diselesaikan
//       };
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// Endpoint untuk menghitung jumlah courses berdasarkan id_user

router.get('/count', async (req, res) => {
  const id_user = req.user.id;

  try {
      const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('id_course', { count: 'exact' })
          .eq('id_user', id_user);

      if (coursesError) {
          return res.status(400).json({ error: coursesError.message });
      }

      const totalCourses = coursesData.length;

      const { data: joinData, error: joinError } = await supabase
          .from('join_courses')
          .select('id_user', { count: 'exact' })
          .in('id_course', coursesData.map(course => course.id_course));

      if (joinError) {
          return res.status(400).json({ error: joinError.message });
      }

      const totalJoinedUsers = joinData.length;

      const uniqueUserIds = new Set(joinData.map(join => join.id_user));

      const totalUniqueJoinedUsers = uniqueUserIds.size;

      const { data: teacherBalance, error: teacherBalanceError } = await supabase
      .from('teacher_balance')
      .select('balance')
      .eq('id_user_teacher', id_user);

      if (teacherBalanceError) {
          return res.status(400).json({ error: teacherBalanceError.message });
      }
    
      const Balance = teacherBalance;

      res.json({ id_user, total_courses: totalCourses, total_joined_users: totalJoinedUsers, total_unique_joined_users: totalUniqueJoinedUsers, balance: Balance });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/list-transactions', async (req, res) => {
  const idUser = req.user.id;

  try {
    const { data: payments, error: paymentsError } = await supabase
      .from('user_payment_courses')
      .select('*')
      .eq('id_user_teacher', idUser);

    if (paymentsError) throw paymentsError;

    const courseIds = payments.map(payment => payment.id_course);

    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id_course, course_title')
      .in('id_course', courseIds)
      .eq('id_user', idUser);

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

router.get('/:id_course', async (req, res) => {
  const { id_course } = req.params;
  const idUser = req.user.id;

  try {
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id_course', id_course)
      .eq('id_user', idUser)
      .single();

    if (courseError) {
      console.error('Error fetching course:', courseError);
      return res.status(400).json({ error: 'Error fetching course' });
    }

    if (!courseData) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const { data: modulesData, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .eq('id_courses', id_course);

    if (modulesError) {
      console.error('Error fetching modules:', modulesError);
      return res.status(400).json({ error: 'Error fetching modules' });
    }

    const responseData = {
      course: courseData,
      modules: modulesData
    };

    console.log('Fetched course and modules data:', responseData);

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: error.message });
  }
});


// ! Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/kelas/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// ! Inisialisasi uplod middleware
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  const { 
    courseTitle, 
    courseDescription, 
    price, 
    paid, 
    trailerVideoYoutube, 
    statusCourse, 
    online, 
    modules, 
    benefit, 
    locationOffline, 
    preOrderOfflineDate 
  } = req.body;

  const idUser = req.user.id;

  console.log('Payload received:', req.body);
  console.log('File uploaded:', req.file);

  if (!courseTitle || !courseDescription || !idUser) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const finalPrice = price === "" ? null : price;
  const finalPO = preOrderOfflineDate === "" ? null : preOrderOfflineDate;
  const imageUrl = req.file ? `/uploads/kelas/${req.file.filename}` : null; 

  try {
    // Insert new course
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .insert([{
        course_title: courseTitle,
        course_description: courseDescription,
        price: finalPrice,
        paid: paid,
        id_user: idUser,
        trailer_video_youtube: trailerVideoYoutube,
        status_course: statusCourse,
        online: online,
        benefit: benefit,
        location_offline: locationOffline,
        preorder_offline_date: finalPO,
        image_url: imageUrl,
      }])
      .select('id_course');

    if (courseError) {
      console.error('Error inserting course:', courseError);
      return res.status(400).json({ error: 'Error inserting course' });
    }

    console.log('Inserted course data:', courseData);

    if (!courseData || courseData.length === 0) {
      return res.status(400).json({ error: 'No course data returned from Supabase' });
    }

    const courseId = courseData[0].id_course;

    if (online === 'true') {  // Pastikan untuk membandingkan dengan string 'true'
      // Mengonversi modules dari string JSON ke objek
      let modulesData = [];
      if (modules) {
        try {
          modulesData = JSON.parse(modules);
          console.log('Parsed modules data:', modulesData); // Log data modules
        } catch (parseError) {
          console.error('Error parsing modules JSON:', parseError);
          return res.status(400).json({ error: 'Invalid modules format' });
        }
      }

      // Siapkan data untuk di-insert
      const modulesToInsert = modulesData.map(module => ({
        id_courses: courseId, // ID kursus yang baru saja dibuat
        link_video_youtube: module.linkVideoYoutube, // Pastikan ini sesuai dengan key dalam JSON
        header: module.header
      }));

      console.log('Modules data to insert:', modulesToInsert); // Log data yang akan di-insert

      const { error: moduleError } = await supabase
        .from('modules')
        .insert(modulesToInsert);

      if (moduleError) {
        console.error('Error inserting modules:', moduleError);
        return res.status(400).json({ error: 'Error inserting modules' });
      }
    }

    res.status(200).json({ message: 'Course and modules added successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(400).json({ error: error.message });
  }
});


// router.get('/:id_course', async (req, res) => {
//   const { id_course } = req.params;
//   const idUser = req.user.id;

//   try {
//     const { data: courseData, error: courseError } = await supabase
//       .from('courses')
//       .select('*')
//       .eq('id_course', id_course)
//       .eq('id_user', idUser)
//       .single();

//     if (courseError) {
//       console.error('Error fetching course:', courseError);
//       return res.status(400).json({ error: 'Error fetching course' });
//     }

//     if (!courseData) {
//       return res.status(404).json({ error: 'Course not found' });
//     }

//     const { data: modulesData, error: modulesError } = await supabase
//       .from('modules')
//       .select('*')
//       .eq('id_courses', id_course);

//     if (modulesError) {
//       console.error('Error fetching modules:', modulesError);
//       return res.status(400).json({ error: 'Error fetching modules' });
//     }

//     const responseData = {
//       course: courseData,
//       modules: modulesData
//     };

//     console.log('Fetched course and modules data:', responseData);

//     res.status(200).json(responseData);
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });



module.exports = router;
