const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// router.get('/users-teacher', accessControl('Admin'), async (req, res) => {
//   try {
//     // Query untuk mengambil data dari tabel public.users
//     const { data: publicUsers, error: publicUsersError } = await supabase
//       .from('users')
//       .select('name, created_at, role, id_user')
//       .eq("role", "Teacher");

//     if (publicUsersError) {
//       return res.status(400).json({ error: 'Error fetching public users: ' + publicUsersError.message });
//     }

//     // Query untuk mengambil data dari auth.users menggunakan Supabase Admin API
//     const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();

//     if (authUsersError) {
//       return res.status(400).json({ error: 'Error fetching auth users: ' + authUsersError.message });
//     }

//     // Query untuk mengambil semua courses
//     const { data: allCourses, error: allCoursesError } = await supabase
//       .from('courses')
//       .select('id_user');

//     if (allCoursesError) {
//       return res.status(400).json({ error: 'Error fetching all courses: ' + allCoursesError.message });
//     }

//     // Hitung total courses per user
//     const courseCounts = {};
//     allCourses.forEach(course => {
//       if (course.id_user) {
//         courseCounts[course.id_user] = (courseCounts[course.id_user] || 0) + 1;
//       }
//     });

//     const { data: joinData, error: joinError } = await supabase
//       .from('join_courses')
//       .select('id_user', { count: 'exact' });

//     if (joinError) {
//       return res.status(400).json({ error: joinError.message });
//     }

//     const uniqueUserIds = new Set(joinData.map(join => join.id_user));

//     // Hitung jumlah pengguna unik yang bergabung
//     const totalUniqueJoinedUsers = uniqueUserIds.size;

//     // Gabungkan data dari kedua tabel
//     const mergedData = publicUsers.map(publicUser => {
//       const authUser = authUsers.users.find(au => au.id === publicUser.id_user);
//       return {
//         ...publicUser,
//         email: authUser ? authUser.email : null,
//         last_sign_in_at: authUser ? authUser.last_sign_in_at : null,
//         total_courses: courseCounts[publicUser.id_user] || 0, // Menghitung total courses
//         total_unique_joined_users: totalUniqueJoinedUsers // Menambahkan totalUniqueJoinedUsers ke setiap pengguna
//       };
//     });

//     // Kembalikan data users yang sudah digabung
//     return res.status(200).json(mergedData); 
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error: ' + error.message });
//   }
// });

// ! Endpoint untuk mendapatkan daftar pengajar
router.get('/users-teacher', accessControl('Admin'), async (req, res) => {
  try {
    // Query untuk mengambil data dari tabel public.users
    const { data: publicUsers, error: publicUsersError } = await supabase
      .from('users')
      .select('name, created_at, role, id_user')
      .eq("role", "Teacher");

    if (publicUsersError) {
      return res.status(400).json({ error: 'Error fetching public users: ' + publicUsersError.message });
    }

    // Query untuk mengambil data dari auth.users menggunakan Supabase Admin API
    const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();

    if (authUsersError) {
      return res.status(400).json({ error: 'Error fetching auth users: ' + authUsersError.message });
    }

    // Query untuk mengambil semua courses
    const { data: allCourses, error: allCoursesError } = await supabase
      .from('courses')
      .select('id_user');

    if (allCoursesError) {
      return res.status(400).json({ error: 'Error fetching all courses: ' + allCoursesError.message });
    }

    // Hitung total courses per user
    const courseCounts = {};
    allCourses.forEach(course => {
      if (course.id_user) {
        courseCounts[course.id_user] = (courseCounts[course.id_user] || 0) + 1;
      }
    });

    const { data: joinData, error: joinError } = await supabase
      .from('join_courses')
      .select('id_user', { count: 'exact' });

    if (joinError) {
      return res.status(400).json({ error: joinError.message });
    }

    const uniqueUserIds = new Set(joinData.map(join => join.id_user));

    // Hitung jumlah pengguna unik yang bergabung
    const totalUniqueJoinedUsers = uniqueUserIds.size;

    // Ambil data rating dari tabel teacher_ratings
    const { data: ratingsData, error: ratingsError } = await supabase
      .from('teacher_ratings')
      .select('id_user_teacher, rating');

    if (ratingsError) {
      return res.status(400).json({ error: 'Error fetching teacher ratings: ' + ratingsError.message });
    }

    // Hitung rata-rata rating per guru
    const ratingSums = {};
    const ratingCounts = {};

    ratingsData.forEach(rating => {
      const { id_user_teacher, rating: teacherRating } = rating;

      if (!ratingSums[id_user_teacher]) {
        ratingSums[id_user_teacher] = 0;
        ratingCounts[id_user_teacher] = 0;
      }

      ratingSums[id_user_teacher] += teacherRating;
      ratingCounts[id_user_teacher] += 1;
    });

    const averageRatings = {};
    for (const id in ratingSums) {
      averageRatings[id] = ratingSums[id] / ratingCounts[id];
    }

    // Gabungkan data dari kedua tabel
    const mergedData = publicUsers.map(publicUser => {
      const authUser = authUsers.users.find(au => au.id === publicUser.id_user);
      return {
        ...publicUser,
        email: authUser ? authUser.email : null,
        last_sign_in_at: authUser ? authUser.last_sign_in_at : null,
        total_courses: courseCounts[publicUser.id_user] || 0, // Menghitung total courses
        total_unique_joined_users: totalUniqueJoinedUsers, // Menambahkan totalUniqueJoinedUsers ke setiap pengguna
        average_rating: averageRatings[publicUser.id_user] || null // Menambahkan rata-rata rating
      };
    });

    // Kembalikan data users yang sudah digabung
    return res.status(200).json(mergedData); 
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

router.get('/count', accessControl('Admin'), async (req, res) => {

  try {
      const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id_user', { count: 'exact' });

      if (usersError) {
          return res.status(400).json({ error: usersError.message });
      }

      const totalUsers = usersData.length;

      res.json({ userCount: totalUsers });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ! Endpoint untuk mendapatkan daftar users
router.get('/users', accessControl('Admin'), async (req, res) => {
  try {
    // Query untuk mengambil data dari tabel public.users
    const { data: publicUsers, error: publicUsersError } = await supabase
      .from('users')
      .select('name, created_at, role, id_user, no_telp, foto');

    if (publicUsersError) {
      return res.status(400).json({ error: 'Error fetching public users: ' + publicUsersError.message });
    }

    // Query untuk mengambil data dari auth.users menggunakan Supabase Admin API
    const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();

    if (authUsersError) {
      return res.status(400).json({ error: 'Error fetching auth users: ' + authUsersError.message });
    }

    // Gabungkan data dari kedua tabel berdasarkan id_user dan id dari auth.users
    const mergedData = publicUsers.map(publicUser => {
      const authUser = authUsers.users.find(au => au.id === publicUser.id_user);
      return {
        ...publicUser,
        email: authUser ? authUser.email : null,
        last_sign_in_at: authUser ? authUser.last_sign_in_at : null,
      };
    });

    return res.status(200).json(mergedData); // Kembalikan data users yang sudah digabung
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

module.exports = router;
