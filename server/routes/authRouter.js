const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// * Route untuk login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Autentikasi pengguna dengan Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // ! Buat token
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' } // ! Token berlaku selama 1 jam
  );

  // ! Simpan token dalam HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,       // Hanya bisa diakses oleh HTTP, bukan JavaScript
    secure: process.env.NODE_ENV === 'production', // Aktifkan secure hanya di production
    sameSite: 'Strict',   // Untuk mencegah CSRF
    maxAge: 60 * 60 * 1000, // Cookie berlaku selama 1 jam
  });

  res.json({ message: 'Login berhasil', id_user: data.user.id });
});


// * Route untuk logout
router.post('/logout', (req, res) => {
  // Hapus token dari cookie dengan menetapkan waktu kedaluwarsa menjadi waktu lampau
  res.cookie('token', '', {
    httpOnly: true,       // Tetap httpOnly untuk keamanan
    secure: process.env.NODE_ENV === 'production', // Aktifkan secure di production
    sameSite: 'Strict',   // Untuk mencegah CSRF
    expires: new Date(0), // Set cookie kadaluarsa di masa lalu untuk menghapusnya
  });

  res.json({ message: 'Logout berhasil' });
});

module.exports = router;
