const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.post("/", async (req, res) => {
  const userId = req.user.id;
  const { amount, bank_name, bank_account_holder_name, bank_account_number } = req.body;

  try {
    // Ambil saldo pengajar
    const { data: teacherBalance, error: teacherBalanceError } = await supabase
      .from('teacher_balance')
      .select('balance')
      .eq('id_user_teacher', userId)
      .single(); // asumsi satu catatan per pengguna

    if (teacherBalanceError) {
      return res.status(400).json({ error: teacherBalanceError.message });
    }

    const balance = teacherBalance.balance; // Ekstrak saldo dari respons

    // Cek jika jumlah penarikan melebihi saldo
    if (amount > balance) {
      return res.status(400).json({ error: "Jumlah penarikan melebihi saldo yang tersedia." });
    }

    // Masukkan permintaan penarikan jika saldo mencukupi
    const { data, error } = await supabase
      .from("teacher_withdrawal")
      .insert([{
        id_user_teacher: userId,
        amount, 
        bank_name, 
        bank_account_holder_name, 
        bank_account_number, 
        status: "Pending",
      }]);

    if (error) {
      console.log("Error memasukkan data:", error.message); // Catat error
      throw error;
    }

    console.log("Data berhasil dimasukkan:", data); // Catat keberhasilan
    res.status(201).json(data);
  } catch (error) {
    console.log("Kesalahan dalam blok catch:", error.message); // Catat error dalam blok catch
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
