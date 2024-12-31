const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');
const multer = require('multer');
const { rating } = require('@material-tailwind/react');
const { format } = require('date-fns');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/list-courses/forum-diskusi", accessControl('Teacher'), async (req, res) => {
  const userId = req.user.id;

  try {
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("id_course, course_title, course_description")
      .eq("id_user", userId)
      .order("id_course", { ascending: false });

    if (coursesError) throw coursesError;

    const result = courses.map(course => {
      return {
        ...course,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get total users per month
router.get('/total-visit/to-teacher', accessControl('Teacher'), async (req, res) => {
  const userId = req.user.id;
  const { data, error } = await supabase
    .from('visit_to_teacer_course')
    .select('id_visit_teacher, created_at')
    .eq("id_user_teacher", userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Group by month
  const userPerMonth = {};
  data.forEach((user) => {
    const month = format(new Date(user.created_at), 'yyyy-MM');
    userPerMonth[month] = (userPerMonth[month] || 0) + 1;
  });

  res.json({ userPerMonth });
});


router.get("/", accessControl('Teacher'), async (req, res) => {
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

router.get('/count', accessControl('Teacher'), async (req, res) => {
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

      const { data: teacherRating, error: teacherRatingError } = await supabase
      .from('teacher_ratings')
      .select('rating')
      .eq('id_user_teacher', id_user);

      if (teacherRatingError) {
          return res.status(400).json({ error: teacherRatingError.message });
      }
    
      // Jika tidak ada rating, kembalikan rating 0
      if (!teacherRating || teacherRating.length === 0) {
        return res.status(200).json({ rating: 0 });
      }
    
      // Hitung rata-rata rating secara manual
      const sum = teacherRating.reduce((total, current) => total + current.rating, 0);
      const average = sum / teacherRating.length;

      res.json({ id_user, total_courses: totalCourses, total_joined_users: totalJoinedUsers, total_unique_joined_users: totalUniqueJoinedUsers, balance: Balance, rating: average.toFixed(1) });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/list-transactions', accessControl('Teacher'), async (req, res) => {
//   const idUser = req.user.id;

//   try {
//     const { data: payments, error: paymentsError } = await supabase
//       .from('user_payment_courses')
//       .select('*')
//       .eq('id_user_teacher', idUser);

//     if (paymentsError) throw paymentsError;

//     const courseIds = payments.map(payment => payment.id_course);

//     const { data: courses, error: coursesError } = await supabase
//       .from('courses')
//       .select('id_course, course_title')
//       .in('id_course', courseIds)
//       .eq('id_user', idUser);

//     if (coursesError) throw coursesError;

//     const userIds = payments.map(payment => payment.id_user);
//     const teacherIds = payments.map(payment => payment.id_user_teacher);

//     const { data: users, error: usersError } = await supabase
//       .from('users')
//       .select('id_user, name')
//       .in('id_user', [...userIds, ...teacherIds]);

//     if (usersError) throw usersError;

//     const mergedData = payments.map(payment => {
//       const course = courses.find(course => course.id_course === payment.id_course);
//       const user = users.find(user => user.id_user === payment.id_user);
//       const teacher = users.find(user => user.id_user === payment.id_user_teacher);

//       return {
//         ...payment,
//         course_title: course ? course.course_title : 'Course Title tidak ditemukan',
//         user_name: user ? user.name : 'User Name tidak ditemukan',
//         teacher_name: teacher ? teacher.name : 'Teacher Name tidak ditemukan',
//       };
//     });

//     // Kirim data hasil penggabungan
//     res.status(200).json(mergedData);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data courses, users, dan payments.' });
//   }
// });

router.get("/pengajuan-dana", accessControl('Teacher'), async (req, res) => {
  const id_user = req.user.id;
  try {
    const { data: withdarwals, error: withdarwalError } = await supabase
      .from("teacher_withdrawal")
      .select("*")
      .order("created_at", { ascending: false })
      .eq('id_user_teacher', id_user);

      if (withdarwalError) throw withdarwalError;

      const userIds = withdarwals.map(withdarwal => withdarwal.id_user_teacher);
  
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id_user, name')
        .in('id_user', userIds);
  
      if (usersError) throw usersError;


      const mergedData = withdarwals.map(withdarwal => {
        const user = users.find(user => user.id_user === withdarwal.id_user_teacher);
        return {
          id_withdraw: withdarwal.id_withdraw,
          status: withdarwal.status,
          created_at: withdarwal.created_at,
          updated_at: withdarwal.updated_at,
          user_name: withdarwal.user_name,
          amount: withdarwal.amount ? withdarwal.amount : 0,
          bank_name: withdarwal.bank_name,
          bank_account_number: withdarwal.bank_account_number,
          bank_account_holder_name: withdarwal.bank_account_holder_name,
          user_name: user ? user.name : 'Nama tidak ditemukan'
        };
      });

      const limitedData = mergedData;

      res.status(200).json(limitedData);
      
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id_course', accessControl('Teacher'), async (req, res) => {
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


// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       // Tentukan folder berdasarkan field
//       const dest = file.fieldname === 'file' ? 'uploads/kelas/' : 'uploads/module/';
//       cb(null, dest);
//     },
//     filename: (req, file, cb) => {
//       // Gunakan nama unik untuk file
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, uniqueSuffix + '-' + file.originalname);
//     },
//   }),
//   limits: { fileSize: 50 * 1024 * 1024 }, // Batas ukuran file
// });

// // Middleware untuk menangani beberapa file
// const uploadFields = upload.fields([
//   { name: 'file', maxCount: 1 }, // Gambar untuk tabel courses
//   { name: 'file_module', maxCount: 1 }, // File modul untuk tabel modules
// ]);

// router.post('/', uploadFields, async (req, res) => {
//   console.log('Payload received:', req.body);
//   console.log('Course file uploaded:', req.file);
//   console.log('Module file uploaded:', req.file_modules);
//   try {
//     const {
//       courseTitle,
//       courseDescription,
//       price,
//       paid,
//       trailerVideoYoutube,
//       statusCourse,
//       online,
//       locationOffline,
//       preOrderOfflineDate,
//       benefit,
//       modules,
//     } = req.body;

//     const idUser = req.user.id;

//     // Validasi data utama
//     if (!courseTitle || !courseDescription || !idUser) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // URL file dari hasil upload
//     const imageUrl = req.files.file 
//       ? `/uploads/kelas/${req.files.file[0].filename}` 
//       : null;
//       console.log('Course:', imageUrl);

//     const fileModuleUrl = req.files.file_module 
//       ? `/uploads/module/${req.files.file_module[0].filename}` 
//       : null;

//       console.log('Module:', fileModuleUrl);


//     // Insert ke tabel courses
//     const { data: courseData, error: courseError } = await supabase
//       .from('courses')
//       .insert({
//         course_title: courseTitle,
//         course_description: courseDescription,
//         price: price || null,
//         paid,
//         id_user: idUser,
//         trailer_video_youtube: trailerVideoYoutube,
//         status_course: statusCourse,
//         online,
//         location_offline: locationOffline,
//         preorder_offline_date: preOrderOfflineDate || null,
//         image_url: imageUrl,
//       })
//       .select('id_course');

//     if (courseError) throw new Error(courseError.message);

//     const courseId = courseData[0].id_course;

//     // Insert benefits (jika ada)
//     let benefitsArray = [];
//     if (benefit) {
//       try {
//         benefitsArray = JSON.parse(benefit);
//       } catch (error) {
//         return res.status(400).json({ error: 'Invalid JSON format for benefits' });
//       }

//       if (benefitsArray.length > 0) {
//         const benefitsToInsert = benefitsArray.map(item => ({
//           id_course: courseId,
//           benefit: item.benefit,
//         }));

//         const { error: benefitError } = await supabase.from('benefit_course').insert(benefitsToInsert);
//         if (benefitError) throw new Error(benefitError.message);
//       }
//     }

// // Insert modules (jika ada dan online = true)
// let modulesData = [];
// if (online === 'true' && modules) {
//   try {
//     modulesData = JSON.parse(modules);
//   } catch (error) {
//     return res.status(400).json({ error: 'Invalid JSON format for modules' });
//   }

//   if (modulesData.length > 0) {
//     const modulesToInsert = modulesData.map(module => {
//       const fileModuleUrl = req.files.file_module
//         ? `/uploads/module/${req.files.file_module[0].filename}`
//         : null;

//       return {
//         id_courses: courseId,
//         link_video_youtube: module.linkVideoYoutube,
//         header: module.header,
//         file_module: fileModuleUrl, // Menyimpan URL file yang sudah di-upload
//       };
//     });

//     const { error: moduleError } = await supabase.from('modules').insert(modulesToInsert);
//     if (moduleError) throw new Error(moduleError.message);
//   }
// }


//     res.status(200).json({ message: 'Course, benefits, and modules added successfully' });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });



const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = file.fieldname.startsWith('file_module_') ? 'uploads/module/' : 'uploads/kelas/';
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // Batas ukuran file
});

// Tangkap semua file
const uploadAny = upload.any();

router.post('/', uploadAny, async (req, res) => {
  console.log('Payload received:', req.body);
  console.log('Files received:', req.files);
  // console.log('Received module files:', req.files.filter(file => file.fieldname.startsWith('file_module_')));

  const { courseTitle, courseDescription, price, paid, trailerVideoYoutube, statusCourse, online, locationOffline, preOrderOfflineDate, category, benefit, modules, quiz } = req.body;
  const idUser = req.user.id;

  if (!courseTitle || !courseDescription || !idUser) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Proses file course
  const courseFile = req.files.find(file => file.fieldname === 'file');
  const imageUrl = courseFile ? `/uploads/kelas/${courseFile.filename}` : null;

  // Proses file modules
  const moduleFiles = req.files.filter(file => file.fieldname.startsWith('file_module_'));
  const fileModuleUrls = moduleFiles.map(file => `/uploads/module/${file.filename}`);

  // Insert ke tabel courses
  const { data: courseData, error: courseError } = await supabase.from('courses').insert({
    course_title: courseTitle,
    course_description: courseDescription,
    price: price || null,
    paid,
    id_user: idUser,
    trailer_video_youtube: trailerVideoYoutube,
    status_course: statusCourse,
    online,
    location_offline: locationOffline,
    preorder_offline_date: preOrderOfflineDate || null,
    image_url: imageUrl,
    category: category
  }).select('id_course');

  if (courseError) throw new Error(courseError.message);

  const courseId = courseData[0].id_course;

      // Insert benefits (jika ada)
    let benefitsArray = [];
    if (benefit) {
      try {
        benefitsArray = JSON.parse(benefit);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON format for benefits' });
      }

      if (benefitsArray.length > 0) {
        const benefitsToInsert = benefitsArray.map(item => ({
          id_course: courseId,
          benefit: item.benefit,
        }));

        const { error: benefitError } = await supabase.from('benefit_course').insert(benefitsToInsert);
        if (benefitError) throw new Error(benefitError.message);
      }
    }


  // Insert modules (jika ada dan online = true)
  if (online === 'true' && modules) {
    let modulesData = [];
    try {
      modulesData = JSON.parse(modules);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON format for modules' });
    }
  
    if (modulesData.length > 0) {
      const modulesToInsert = modulesData.map((module, index) => {
        const moduleFile = (module.inputType === "file" || module.inputType === "essay")
          ? moduleFiles.find(file => file.fieldname === `file_module_${index}`)
          : null;
  
        return {
          id_courses: courseId,
          link_video_youtube: module.inputType === "youtube" ? module.linkVideoYoutube : null,
          header: module.header,
          file_module: moduleFile ? `/uploads/module/${moduleFile.filename}` : null,
          type_link: module.inputType === "youtube" ? "youtube" : module.inputType === "file" ? "pdf" : module.inputType === "essay" ? "pdf" : null,
          type_module: module.inputType === "essay" ? "essay" : "modul",
          can_user_upload: module.inputType === "essay" ? true : false,
        };
      });
  
      const { error: moduleError } = await supabase.from('modules').insert(modulesToInsert);
      if (moduleError) throw new Error(moduleError.message);
    }
  }

    // Insert quiz ke modules dan tabel quiz
    if (quiz) {
      let quizData = [];
      try {
        quizData = JSON.parse(quiz);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON format for quiz' });
      }
  
      const validQuizData = quizData.filter(quizItem => quizItem.question && quizItem.a && quizItem.b && quizItem.c && quizItem.d);
  
      if (validQuizData.length > 0) {
        const { data: moduleData, error: moduleError } = await supabase.from('modules').insert({
          id_courses: courseId,
          header: req.body.quizTitle,
          type_link: 'kuis',
          type_module: 'kuis',
          can_user_upload: false,
        }).select('id_modules');
  
        if (moduleError) throw new Error(moduleError.message);
  
        const moduleId = moduleData[0].id_modules;
  
        for (const quizItem of validQuizData) {
          const { error: quizError } = await supabase.from('quiz').insert({
            id_modules: moduleId,
            soal: quizItem.question,
            a: quizItem.a,
            b: quizItem.b,
            c: quizItem.c,
            d: quizItem.d,
            true_answer: quizItem.answer,
          });
  
          if (quizError) throw new Error(quizError.message);
        }
      }
    }
  

  res.status(200).json({ message: 'Course, benefits, and modules added successfully' });
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
