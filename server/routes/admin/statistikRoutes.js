const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');
const { format } = require('date-fns');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Route to get total purchases per month
router.get('/total-purchases', async (req, res) => {
    const { data, error } = await supabase
      .from('user_payment_courses')
      .select('id_user_payment_courses, created_at');
  
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  
    // Group by month
    const purchasesPerMonth = {};
    data.forEach((purchase) => {
      const month = format(new Date(purchase.created_at), 'yyyy-MM');
      purchasesPerMonth[month] = (purchasesPerMonth[month] || 0) + 1;
    });
  
    res.json({ purchasesPerMonth });
  });
  
  // Route to get total visitors per month
  router.get('/total-visitors', async (req, res) => {
    const { data, error } = await supabase
      .from('visitors')
      .select('id_visitor, created_at');
  
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  
    // Group by month
    const visitorsPerMonth = {};
    data.forEach((visitor) => {
      const month = format(new Date(visitor.created_at), 'yyyy-MM');
      visitorsPerMonth[month] = (visitorsPerMonth[month] || 0) + 1;
    });
  
    res.json({ visitorsPerMonth });
  });



  // Route to get total users per month
  router.get('/total-users', accessControl('Admin'), async (req, res) => {
    const { data, error } = await supabase
      .from('users')
      .select('id_user, created_at');
  
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



  router.get('/count', accessControl('Admin'), async (req, res) => {

    try {
  
        const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id_user', { count: 'exact' })
        .eq('role', 'Student');
  
        if (usersError) {
            return res.status(400).json({ error: usersError.message });
        }
  
        const { data: teachersData, error: teachersError } = await supabase
            .from('users')
            .select('id_user', { count: 'exact' })
            .eq('role', 'Teacher');
  
        if (teachersError) {
            return res.status(400).json({ error: teachersError.message });
        }
        
  
        const { data: joincoursesData, error: coursesError } = await supabase
        .from('join_courses')
        .select('id_course', { count: 'exact' });
  
        if (coursesError) {
            return res.status(400).json({ error: coursesError.message });
        }
  
        const { data: teacherBalance, error: teacherBalanceError } = await supabase
        .from('teacher_balance')
        .select('balance', { count: 'exact' });
  
        if (teacherBalanceError) {
            return res.status(400).json({ error: teacherBalanceError.message });
        }
      
        const totalBalance = teacherBalance.reduce((sum, item) => sum + item.balance, 0);
  
        // Mengambil id_course yang unik dengan Set
        const uniqueCourses = new Set(joincoursesData.map(course => course.id_course));
  
        // Menghitung jumlah id_course unik
        const totalCourses = uniqueCourses.size;
  
        const totalUser = usersData.length;
  
        const totalTeacher = teachersData.length;
  
        res.json({ userCount: totalUser, teacherCount: totalTeacher, total_courses: totalCourses, total_balance: totalBalance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  
module.exports = router;
