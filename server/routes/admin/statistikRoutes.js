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

module.exports = router;
