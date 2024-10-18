const express = require('express');
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  const { id_user } = req.query;

  // ! Cek apakah id_user dikirim dan merupakan string
  if (!id_user || typeof id_user !== 'string') {
    return res.status(400).json({ error: "Invalid or missing id_user" });
  }

  try {
    const { data: userPayments, error: userPaymentsError } = await supabase
      .from("user_payment_courses")
      .select("id_course, payment_status, payment_date")
      .eq("id_user", id_user)
      .eq("payment_status", "paid")
      .order("payment_date", { ascending: false }); // berarti descending

    if (userPaymentsError) throw userPaymentsError;

    const courseIds = userPayments.map(payment => payment.id_course);

    if (courseIds.length === 0) {
      return res.status(200).json({ message: "No paid courses found" });
    }

    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .in("id_course", courseIds);

    if (coursesError) throw coursesError;

    const result = courses.map(course => {
      const payment = userPayments.find(payment => payment.id_course === course.id_course);
      return {
        ...course,
        payment_status: payment.payment_status,
        payment_date: payment.payment_date,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
