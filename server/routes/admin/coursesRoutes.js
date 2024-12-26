const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/', accessControl('Admin'), async (req, res) => {
  try {
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*, join_courses(id_course)');

    if (coursesError) throw coursesError;

    const userIds = courses.map(course => course.id_user);

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id_user, name')
      .in('id_user', userIds);

    if (usersError) throw usersError;

    const mergedData = courses.map(course => {
      const user = users.find(user => user.id_user === course.id_user);
      return {
        ...course,
        join_count: course.join_courses.length,
        user_name: user ? user.name : 'Nama tidak ditemukan'
      };
    });

    res.status(200).json(mergedData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data courses dan users.' });
  }
});


// Endpoint untuk mengubah status course
router.put('/:id_course', async (req, res) => {
  const { id_course } = req.params;
  const { status_course } = req.body;

  // console.log(`Updating course ID: ${id_course} to status: ${status_course}`);

  if (!['Activated', 'Deactivate', 'Pending'].includes(status_course)) {
    return res.status(400).json({ error: 'Status course tidak valid' });
  }

  try {
    const { error } = await supabase
      .from('courses')
      .update({ 
        status_course,
        updated_at: new Date().toISOString()
      })
      .eq('id_course', id_course);

    if (error) {
      console.error('Update error:', error);
      throw error;
    }

    res.status(200).json({ message: 'Status course berhasil diubah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengubah status course.' });
  }
});

router.get('/list-transactions', async (req, res) => {
  try {
    const { data: payments, error: paymentsError } = await supabase
      .from('user_payment_courses')
      .select('*');

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


router.get('/:id_course', async (req, res) => {
  const { id_course } = req.params;

  try {
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id_course', id_course)
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

router.get('/dashboard/top-courses', accessControl('Admin'), async (req, res) => {
  try {
    // Query untuk mengambil data courses beserta join_courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id_course, course_title, price, paid, join_courses(id_course)')
      .eq("status_course", "Activated"); // Filter hanya course yang diaktifkan

    if (coursesError) {
      return res.status(400).json({ error: 'Error fetching courses: ' + coursesError.message });
    }

    // Hitung jumlah join_courses per course
    const courseJoinCounts = courses.map(course => ({
      id_course: course.id_course,
      course_title: course.course_title,
      price: course.price ? course.price : 0,
      paid: course.paid,
      join_count: course.join_courses.length,
    }));

    // Urutkan courses berdasarkan join_count dari besar ke kecil
    const sortedCourses = courseJoinCounts.sort((a, b) => b.join_count - a.join_count);

    // Ambil course dengan jumlah join_courses terbanyak (misalnya, hanya 1)
    const topCourses = sortedCourses.slice(0, 5); // Slice untuk mendapatkan hanya top course

    return res.status(200).json(topCourses); // Kembalikan data course yang paling banyak di-join
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

router.get('/dashboard/pengajuan-courses', accessControl('Admin'), async (req, res) => {
  try {
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .eq('status_course', 'Pending');

    if (coursesError) throw coursesError;

    const userIds = courses.map(course => course.id_user);

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id_user, name')
      .in('id_user', userIds);

    if (usersError) throw usersError;

    const mergedData = courses.map(course => {
      const user = users.find(user => user.id_user === course.id_user);
      return {
        id_course: course.id_course,
        course_title: course.course_title,
        price: course.price ? course.price : 0,
        paid: course.paid,
        status_course: course.status_course,
        user_name: user ? user.name : 'Nama tidak ditemukan'
      };
    });
    
    const limitedData = mergedData.slice(0, 5);

    res.status(200).json(limitedData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data courses dan users.' });
  }
});

module.exports = router;
