const express = require('express');
const router = express.Router();
const snap = require('../midtrans'); // Midtrans configuration
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint untuk memulai pembayaran
router.post("/pay-course", async (req, res) => {
    const { id_user, id_course } = req.body;
  
    console.log('Request Body:', req.body); // Tambahkan log ini
  
    try {
      // Ambil detail kursus
      const { data: course, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id_course", id_course)
        .single();
  
      if (courseError || !course) throw new Error("Kursus tidak ditemukan");
  
      // Ambil detail pengguna
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id_user", id_user)
        .single();
  
      if (userError || !user) throw new Error("Pengguna tidak ditemukan");
  
      // Buat data transaksi untuk Midtrans
      const transaction = {
        transaction_details: {
          order_id: `course-${id_course}-user-${id_user}-${Date.now()}`,
          gross_amount: course.price,
        },
        customer_details: {
          first_name: user.name,
          email: user.email,
        },
        item_details: [
          {
            id: course.id_course.toString(), // Pastikan ID adalah string
            price: course.price,
            quantity: 1,
            name: course.course_title,
          },
        ],
        display: {
          // Menggunakan popup layout untuk tampilan yang lebih responsif
          popup: false,
        },
      };
  
      // Buat transaksi di Midtrans
      const midtransResponse = await snap.createTransaction(transaction);
  
      console.log('Midtrans Response:', midtransResponse); // Tambahkan log ini
  
      if (!midtransResponse || !midtransResponse.redirect_url) {
        throw new Error('Midtrans response tidak valid atau redirect_url tidak ditemukan');
      }
  
      // Simpan transaksi di tabel `user_payment_courses` dengan status `pending`
      const { data: paymentData, error: paymentError } = await supabase
        .from("user_payment_courses")
        .insert([
          {
            id_user: id_user,
            id_course: id_course,
            payment_status: 'pending',
            // transaction_id: midtransResponse.order_id, // Gunakan ID transaksi dari Midtrans
            transaction_id: transaction.transaction_details.order_id, // Gunakan ID transaksi dari Midtrans
            snap_token: midtransResponse.token,
            snap_redirect_url: midtransResponse.redirect_url

          },
        ]);
  
      if (paymentError) throw paymentError;
  
      res.status(201).json({
        message: "Transaksi berhasil dibuat",
        redirect_url: midtransResponse.redirect_url,
        snap_token: midtransResponse.token,

      });
    } catch (error) {
      console.error('Error dalam proses pembayaran:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

  router.post("/midtrans-notification", async (req, res) => {
    const { order_id, transaction_status, payment_type } = req.body;
  
    try {
      // Log metode pembayaran yang diterima dari notifikasi Midtrans
      // console.log('Midtrans Notification - Payment Method:', payment_type);
      // console.log('Midtrans Notification - Full Body:', req.body); // Log seluruh isi notifikasi Midtrans
      
      // Update status pembayaran berdasarkan notifikasi Midtrans
      let payment_status = 'pending';
      if (transaction_status === 'settlement' || transaction_status === 'capture') {
        payment_status = 'paid';
      } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
        payment_status = 'failed';
      }
  
      // Update status pembayaran di database
      const { data, error } = await supabase
        .from("user_payment_courses")
        .update({ payment_status, payment_method: payment_type, payment_date: new Date() })
        .eq("transaction_id", order_id);
  
      if (error) throw error;
  
      res.status(200).json({ 
        message: "Notifikasi diterima", 
        data,
        status: payment_status,
        // redirect_url: "http://localhost:3000/courses" 
      });
    } catch (error) {
      console.error('Error dalam Midtrans Notification:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  

  
module.exports = router;
