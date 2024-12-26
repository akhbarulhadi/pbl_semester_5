const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


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
    const { data: courses, error: coursesError  } = await supabase
      .from('courses')
      .select('id_user');

    if (coursesError) {
      return res.status(400).json({ error: 'Error fetching all courses: ' + coursesError.message });
    }

    // Hitung total courses per user
    const courseCounts = {};
    courses.forEach(course => {
      if (course.id_user) {
        courseCounts[course.id_user] = (courseCounts[course.id_user] || 0) + 1;
      }
    });

    const { data: joinCourses, error: joinCoursesError } = await supabase
      .from('join_courses')
      .select('id_user', { count: 'exact' });

    if (joinCoursesError) {
      return res.status(400).json({ error: joinCoursesError.message });
    }

    // Hitung jumlah pengguna unik yang join courses per teacher
    const teacherJoinCounts = {};

    joinCourses.forEach(join => {
      const course = courses.find(c => c.id === join.id_course); // Temukan course yang cocok
      if (course) {
        const teacherId = course.id_user; // id_user dari tabel courses adalah teacher
        if (!teacherJoinCounts[teacherId]) {
          teacherJoinCounts[teacherId] = new Set(); // Gunakan Set untuk memastikan unik
        }
        teacherJoinCounts[teacherId].add(join.id_user); // Tambahkan id_user (student) ke Set
      }
    });

    // Ubah Set menjadi jumlah pengguna unik
    const uniqueJoinCounts = {};
    for (const teacherId in teacherJoinCounts) {
      uniqueJoinCounts[teacherId] = teacherJoinCounts[teacherId].size;
    }

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

    // Query untuk mengambil data dari tabel teacher_balance berdasarkan id_user
    const { data: teacherBalances, error: teacherBalanceError } = await supabase
      .from('teacher_balance')
      .select('id_user_teacher, balance');

    if (teacherBalanceError) {
      return res.status(400).json({ error: 'Error fetching teacher balance: ' + teacherBalanceError.message });
    }

    // Gabungkan data dari kedua tabel
    const mergedData = publicUsers.map(publicUser => {
      const authUser = authUsers.users.find(au => au.id === publicUser.id_user);
      const balanceData = teacherBalances.find(balance => balance.id_user_teacher === publicUser.id_user);
      return {
        ...publicUser,
        email: authUser ? authUser.email : null,
        last_sign_in_at: authUser ? authUser.last_sign_in_at : null,
        total_courses: courseCounts[publicUser.id_user] || 0, // Menghitung total courses
        total_unique_joined_users: uniqueJoinCounts[publicUser.id_user] || 0, // Menambahkan totalUniqueJoinedUsers ke setiap pengguna
        average_rating: averageRatings[publicUser.id_user] || null, // Menambahkan rata-rata rating
        balance: balanceData ? balanceData.balance : 0
      };
    });

    // Kembalikan data users yang sudah digabung
    return res.status(200).json(mergedData); 
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
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
