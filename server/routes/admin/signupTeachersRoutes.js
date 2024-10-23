const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();
const multer = require('multer');

// Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/user/'); // Tentukan folder penyimpanan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Tambahkan suffix untuk mencegah duplikat
    cb(null, uniqueSuffix + '-' + file.originalname); // Nama file akan unik
  }
});

// Inisialisasi upload middleware
const upload = multer({ storage: storage });

router.post('/add-teacher', upload.single('foto_pengajar'), async (req, res) => { // Ganti nama file dengan 'foto_pengajar'
  console.log("Body Request:", req.body); // Log body request untuk debugging

  const { nama_pengajar, email, password, role, no_telepon_pengajar } = req.body;
  const imageUrl = req.file ? `/uploads/user/${req.file.filename}` : null; // URL file yang di-upload

  if (!email || !password || !nama_pengajar) {
    return res.status(400).json({ error: 'Email, password, dan nama pengajar wajib diisi' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: null } // Nonaktifkan konfirmasi email
    });

    if (error || !data.user) {
      return res.status(400).json({ error: 'Gagal mendaftarkan pengguna: ' + error.message });
    }

    console.log('User ID:', data.user.id);

    const { error: insertError } = await supabase
      .from('users')
      .insert([{
        id_user: data.user.id,
        name: nama_pengajar,
        role: role || 'Teacher',
        no_telp: no_telepon_pengajar,
        foto: imageUrl // Simpan URL gambar
      }]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(200).json({
      message: 'Pengajar berhasil ditambahkan',
      data: {
        id_user: data.user.id,
        name: nama_pengajar,
        role: role || 'Teacher',
        no_telp: no_telepon_pengajar,
        foto: imageUrl
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

module.exports = router;