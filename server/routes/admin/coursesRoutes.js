const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/', async (req, res) => {
  try {
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*');

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




module.exports = router;
