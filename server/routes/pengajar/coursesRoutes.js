const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// router.get("/", async (req, res) => {
//   const userId = req.user.id;

//   try {
//     // Ambil data dari tabel `courses` berdasarkan id_user
//     const { data: courses, error: coursesError } = await supabase
//       .from("courses")
//       .select("*")
//       .eq("id_user", userId) // Mengambil courses berdasarkan id_user
//       .order("id_course", { ascending: false });

//     if (coursesError) throw coursesError;

//     // Ambil semua data dari tabel `join_courses`
//     const { data: joinCourses, error: joinCoursesError } = await supabase
//       .from("join_courses")
//       .select("*");

//     if (joinCoursesError) throw joinCoursesError;

//     // Hitung jumlah join_courses untuk setiap id_course
//     const joinCountMap = {};
//     joinCourses.forEach(join => {
//       if (joinCountMap[join.id_course]) {
//         joinCountMap[join.id_course]++;
//       } else {
//         joinCountMap[join.id_course] = 1;
//       }
//     });

//     // Gabungkan data dari `courses` dengan jumlah join_courses
//     const result = courses.map(course => {
//       return {
//         ...course,
//         joined_count: joinCountMap[course.id_course] || 0, // Mengambil jumlah join_courses, default 0
//       };
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    // Ambil data dari tabel `courses` berdasarkan id_user
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .eq("id_user", userId)
      .order("id_course", { ascending: false });

    if (coursesError) throw coursesError;

    // Ambil semua data dari tabel `join_courses`
    const { data: joinCourses, error: joinCoursesError } = await supabase
      .from("join_courses")
      .select("*");

    if (joinCoursesError) throw joinCoursesError;

    // Ambil data dari tabel `modules` dan `user_opened_modules`
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
        completion_percentage: completionPercentage.toFixed(2), // Menghitung persentase modul yang diselesaikan
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
      // Query to count total courses created by the user
      const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('id_course', { count: 'exact' })
          .eq('id_user', id_user);

      if (coursesError) {
          return res.status(400).json({ error: coursesError.message });
      }

      // Get the total number of courses
      const totalCourses = coursesData.length;

      // Query to count how many users have joined the user's courses
      const { data: joinData, error: joinError } = await supabase
          .from('join_courses')
          .select('id_user', { count: 'exact' })
          .in('id_course', coursesData.map(course => course.id_course));

      if (joinError) {
          return res.status(400).json({ error: joinError.message });
      }

      // Get the total number of users who joined the user's courses
      const totalJoinedUsers = joinData.length;

      // Create a Set to filter out duplicate users
      const uniqueUserIds = new Set(joinData.map(join => join.id_user));

      // Get the total number of unique users who joined the user's courses
      const totalUniqueJoinedUsers = uniqueUserIds.size;

      res.json({ id_user, total_courses: totalCourses, total_joined_users: totalJoinedUsers, total_unique_joined_users: totalUniqueJoinedUsers });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/', async (req, res) => {
  const { courseTitle, courseDescription, price, paid, trailerVideoYoutube, statusCourse, online, modules, benefit, locationOffline, preOrderOfflineDate } = req.body;
  const idUser = req.user.id;

  // Log untuk memastikan payload diterima dengan benar
  console.log('Payload received:', req.body);

  // Pastikan semua field terisi dengan nilai yang benar
  if (!courseTitle || !courseDescription || !idUser) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const finalPrice = price === "" ? null : price;


  try {
    // Insert new course
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .insert([
        {
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
          preorder_offline_date: preOrderOfflineDate,
          
        }
      ])
      .select('id_course');  // Return the course ID after insertion

    if (courseError) {
      console.error('Error inserting course:', courseError);
      return res.status(400).json({ error: 'Error inserting course' });
    }

    // Log untuk memastikan course berhasil di-insert
    console.log('Inserted course data:', courseData);

    if (!courseData || courseData.length === 0) {
      return res.status(400).json({ error: 'No course data returned from Supabase' });
    }

    const courseId = courseData[0].id_course;

    // Insert modules
    const modulesData = modules.map(module => ({
      id_courses: courseId,
      link_video_youtube: module.linkVideoYoutube,
      header: module.header
    }));

    const { error: moduleError } = await supabase
      .from('modules')
      .insert(modulesData);

    if (moduleError) {
      console.error('Error inserting modules:', moduleError);
      return res.status(400).json({ error: 'Error inserting modules' });
    }

    res.status(200).json({ message: 'Course and modules added successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(400).json({ error: error.message });
  }
});


router.get('/:id_course', async (req, res) => {
  const { id_course } = req.params; // Get the course ID from the request parameters

  try {
    // Fetch course data by id_course
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('*')  // You can adjust the fields you want to return
      .eq('id_course', id_course)
      .single(); // Use .single() if you expect only one result

    if (courseError) {
      console.error('Error fetching course:', courseError);
      return res.status(400).json({ error: 'Error fetching course' });
    }

    if (!courseData) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Log to ensure the course data is returned correctly
    console.log('Fetched course data:', courseData);

    res.status(200).json(courseData); // Return the course data
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: error.message });
  }
});






// router.get("/", async (req, res) => {
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

//     // Ambil semua data dari tabel `modules`
//     const { data: modules, error: modulesError } = await supabase
//       .from("modules")
//       .select("*");

//     if (modulesError) throw modulesError;

//     // Ambil semua data dari tabel `user_opened_modules`
//     const { data: userOpenedModules, error: userOpenedModulesError } = await supabase
//       .from("user_opened_modules")
//       .select("*")
//       .eq("id_user", userId); // Filter by user_id

//     if (userOpenedModulesError) throw userOpenedModulesError;

//     // Log retrieved data for debugging
//     console.log("Courses:", courses);
//     console.log("Modules:", modules);
//     console.log("User Opened Modules:", userOpenedModules);

//     // Hitung jumlah join_courses untuk setiap id_course
//     const joinCountMap = {};
//     joinCourses.forEach(join => {
//       if (joinCountMap[join.id_course]) {
//         joinCountMap[join.id_course]++;
//       } else {
//         joinCountMap[join.id_course] = 1;
//       }
//     });

//     // Hitung jumlah opened modules untuk setiap id_course
//     const openedModulesMap = {};
//     userOpenedModules.forEach(opened => {
//       const moduleId = opened.module_id; // Assuming you have module_id in user_opened_modules
//       const module = modules.find(mod => mod.id_module === moduleId); // Find the corresponding module
//       if (module) {
//         const courseId = module.id_course; // Assuming modules have an id_course field
//         if (openedModulesMap[courseId]) {
//           openedModulesMap[courseId].push(moduleId);
//         } else {
//           openedModulesMap[courseId] = [moduleId];
//         }
//       }
//     });

//     // Log the opened modules map for debugging
//     console.log("Opened Modules Map:", openedModulesMap);

//     // Gabungkan data dari `courses` dengan jumlah join_courses dan persen opened modules
//     const result = courses.map(course => {
//       const totalModules = modules.filter(mod => mod.id_course === course.id_course).length;
//       const openedModulesCount = openedModulesMap[course.id_course] ? openedModulesMap[course.id_course].length : 0;
//       const openedPercentage = totalModules > 0 ? (openedModulesCount / totalModules) * 100 : 0;

//       console.log(`Course ID: ${course.id_course}, Total Modules: ${totalModules}, Opened Count: ${openedModulesCount}, Percentage: ${openedPercentage}`);

//       return {
//         ...course,
//         joined_count: joinCountMap[course.id_course] || 0,
//         opened_percentage: openedPercentage.toFixed(2), // Persen dibulatkan ke dua angka desimal
//       };
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });






// router.post("/", async (req, res) => {
//   const { course_title, course_description } = req.body;

//   try {
//     const { data, error } = await supabase
//       .from("courses")
//       .insert([{ course_title, course_description }]);

//     if (error) throw error;
//     res.status(201).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put("/:id_course", async (req, res) => {
//   const { id_course } = req.params;
//   const { course_title, course_description } = req.body;

//   try {
//     const { data, error } = await supabase
//       .from("courses")
//       .update({ course_title, course_description })
//       .eq("id_course", id_course);

//     if (error) throw error;
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.delete("/:id_course", async (req, res) => {
//   const { id_course } = req.params;

//   try {
//     const { data, error } = await supabase
//       .from("courses")
//       .delete()
//       .eq("id_course", id_course);

//     if (error) throw error;
//     res.status(200).json({ message: "Data berhasil dihapus", data });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // * ini menampilkan kursus yang sudah di bayar(unutk detail)
// router.get("/:id_course", async (req, res) => {
//   const { id_course } = req.params;
//   const userId = req.user.id;

//   try {
//     // Cek di tabel `join_courses` apakah user sudah membayar kursus
//     const { data: paymentData, error: paymentError } = await supabase
//       .from("join_courses")
//       .select("*")
//       .eq("id_course", id_course)
//       .eq("id_user", userId)
//       .single();

//     if (paymentError || !paymentData) {
//       return res.status(403).json({ message: "Akses ditolak. Pembayaran belum dilakukan." });
//     }

//     // Ambil data kursus beserta modulnya
//     const { data: courseData, error: courseError } = await supabase
//       .from("courses")
//       .select("*, modules(*)")
//       .eq("id_course", id_course)
//       .single();

//     if (courseError) throw courseError;

//     // Urutkan modul berdasarkan created_at
//     if (courseData && courseData.modules) {
//       courseData.modules.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//     }

//     // Ambil data modul yang sudah dibuka oleh user
//     const { data: openedModules, error: openedError } = await supabase
//       .from("user_opened_modules")
//       .select("id_modules")
//       .eq("id_user", userId);

//     if (openedError) throw openedError;

//     // Tandai modul yang sudah dibuka oleh user
//     if (courseData && courseData.modules) {
//       const openedModuleIds = openedModules.map((module) => module.id_modules);
//       courseData.modules = courseData.modules.map((module) => ({
//         ...module,
//         isOpened: openedModuleIds.includes(module.id_modules), // Tandai apakah modul sudah dibuka
//       }));
//     }

//     res.status(200).json(courseData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // * ini untuk mencatat modul yang sudah dibuka oleh user
// router.post("/:id_course/open-module/:id_modules", async (req, res) => {
//   const { id_course, id_modules } = req.params;
//   const userId = req.user.id;

//   try {
//     // Log parameter untuk memastikan nilainya
//     // console.log("ID Course:", id_course);
//     // console.log("ID Module:", id_modules);
//     // console.log("User ID:", userId);
//     // Cek apakah data sudah ada di tabel user_opened_modules (agar tidak duplikat)
//     const { data: existingData, error: existingError } = await supabase
//       .from("user_opened_modules")
//       .select("*")
//       .eq("id_user", userId)
//       .eq("id_modules", id_modules)
//       .single();

//     if (existingError && existingError.code !== 'PGRST116') throw existingError; // Error jika bukan karena data tidak ditemukan

//     if (existingData) {
//       return res.status(200).json({ message: "Modul sudah pernah dibuka sebelumnya." });
//     }

//     // Masukkan data baru ke tabel user_opened_modules
//     const { data: insertData, error: insertError } = await supabase
//       .from("user_opened_modules")
//       .insert([{ id_user: userId, id_modules: id_modules }]);

//     if (insertError) throw insertError;

//     res.status(200).json({ message: "Modul berhasil dicatat sebagai dibuka." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // * ini menampilkan kursus yang mau di bayar(unutk payment)
// router.get("/willpay/:id_course", async (req, res) => {
//   const { id_course } = req.params;

//   try {
//     const { data, error } = await supabase
//       .from("courses")
//       .select("*")
//       .eq("id_course", id_course)
//       .single();

//     if (error) throw error;

//     if (data) {
//       res.status(200).json(data);
//     } else {
//       res.status(404).json({ message: "Data tidak ditemukan" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ! ini unutk cek modul apakah sudah di buka semua
// router.get('/check-completion/:courseId', async (req, res) => {
//   const { courseId } = req.params;
//   const userId = req.user.id;

//   try {
//     const { data: totalModules, error: modulesError } = await supabase
//       .from('modules')
//       .select('id_modules') 
//       .eq('id_courses', courseId);

//     if (modulesError) throw modulesError;

//     if (totalModules.length === 0) {
//       return res.status(404).json({ error: 'No modules found for this course' });
//     }

//     // Ambil modul yang telah diselesaikan user berdasarkan user dan id_modules
//     const { data: completedModules, error: completedError } = await supabase
//       .from('user_opened_modules')
//       .select('id_modules')
//       .in('id_modules', totalModules.map(module => module.id_modules)) // Filter berdasarkan modul yang terkait dengan courseId
//       .eq('id_user', userId);

//     if (completedError) throw completedError;

//     // Cek apakah user sudah menyelesaikan semua modul
//     if (completedModules.length === totalModules.length) {
//       return res.json({ completed: true });
//     } else {
//       return res.json({ completed: false });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


module.exports = router;
