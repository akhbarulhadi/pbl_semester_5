const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const useragent = require('express-useragent'); // Import express-useragent

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Gunakan middleware express-useragent
router.use(useragent.express());

// Rate limiter untuk rute login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 percobaan login
  message: 'Terlalu banyak percobaan login, coba lagi setelah beberapa saat',
  headers: true,
});

// // Login Route
// router.post('/', loginLimiter, async (req, res) => {
//   const { email, password } = req.body;

//   // Autentikasi pengguna dengan Supabase
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//   if (error || !data.user) {
//     return res.status(401).json({ error: 'Email atau password salah' });
//   }

//   // Pastikan email telah diverifikasi
//   if (!data.user.email_confirmed_at) {
//     return res.status(403).json({ error: 'Email belum diverifikasi. Silakan cek email Anda.' });
//   }

//   // Simpan session Supabase
//   res.cookie('sb-access-token', data.session.access_token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'Strict',
//     maxAge: 60 * 60 * 1000, // 1 jam
//   });

//   res.cookie('sb-refresh-token', data.session.refresh_token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'Strict',
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
//   });

//   res.json({ message: 'Login berhasil', id_user: data.user.id });
// });


// ! Login Route yang dipakai
router.post('/', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return res.status(401).json({ error: 'Email atau password salah' });
  }

  if (!data.user.email_confirmed_at) {
    return res.status(403).json({ error: 'Email belum diverifikasi. Silakan cek email Anda.' });
  }

  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select('name, role')
    .eq('id_user', data.user.id)
    .single();

  if (profileError || !userProfile) {
    return res.status(500).json({ error: 'Gagal mengambil profil pengguna' });
  }

  const token = jwt.sign(
    {
      id: data.user.id,
      email: data.user.email,
      name: userProfile.name,
      role: userProfile.role,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' } // Token akses berlaku selama 1 jam
  );

  const refreshToken = jwt.sign(
    { id: data.user.id, email: data.user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Refresh token berlaku selama 7 hari
  );

  // Simpan token di HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    // maxAge: 15 * 1000, // 15 detik
    // maxAge: 15 * 60 * 1000, // 15 menit
    // maxAge: 60 * 1000, // 1 menit
    maxAge: 60 * 60 * 1000, // 1 jam
  });

  // Simpan refresh token di HttpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    // maxAge: 15 * 1000, // 15 detik
    // maxAge: 60 * 1000, // 1 menit
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
  });

  res.json({ message: 'Login berhasil', id_user: data.user.id, name: userProfile.name, role: userProfile.role });
  console.log(req.ip);
  console.log(req.get('User-Agent'));
});


router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token tidak tersedia' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ error: 'Refresh token tidak valid' });

    // Ambil name dan role dari public.users menggunakan id dari token
    const { data: userProfile, error: profileError } = await supabase
      .from('users') // Tabel public.users
      .select('name, role')
      .eq('id_user', user.id) // Menggunakan id dari refreshToken
      .single(); // Mengambil satu data saja

    if (profileError || !userProfile) {
      return res.status(500).json({ error: 'Gagal mengambil profil pengguna' });
    }

    // Buat token baru dengan tambahan name dan role dari public.users
    const newToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: userProfile.name, // Tambahkan name dari public.users
        role: userProfile.role, // Tambahkan role dari public.users
        ip: req.ip,
        userAgent: req.get('User-Agent')
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' } // Token baru berlaku selama 1 jam
    );

    // Simpan token baru di HttpOnly cookie
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      // maxAge: 15 * 1000, // 15 detik
      // maxAge: 60 * 1000, // 1 menit
      maxAge: 60 * 60 * 1000, // 1 jam
    });

    res.json({ message: 'Token diperbarui' });
    // console.log(req.cookies.refreshToken);
  });
});




// * Route untuk register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Cek apakah email dan password diberikan
  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi' });
  }

  // Mendaftarkan pengguna baru dengan Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    return res.status(400).json({ error: 'Gagal mendaftarkan pengguna: ' + error.message });
  }

  // Buat token JWT untuk autentikasi
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  // Simpan token dalam HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 1000, // Cookie berlaku selama 1 jam
  });

  res.status(201).json({ message: 'Registrasi berhasil. Silakan cek email untuk verifikasi.' });
});

// * Route untuk login
// router.post('/', async (req, res) => {
//   const { email, password } = req.body;

//   // Autentikasi pengguna dengan Supabase
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password
//   });

//   if (error || !data.user) {
//     return res.status(401).json({ error: 'Email atau password salah' });
//   }

//   // if (!data.user.email_confirmed_at) {
//   //   return res.status(403).json({ error: 'Email belum diverifikasi. Silakan cek email Anda.' });
//   // }

//   // Buat token
//   const token = jwt.sign(
//     { id: data.user.id, email: data.user.email },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: '1h' } // Token berlaku selama 1 jam
//   );

//   // Simpan token dalam HttpOnly cookie
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'Strict',
//     maxAge: 60 * 60 * 1000, // Cookie berlaku selama 1 jam
//   });

//   res.json({ message: 'Login berhasil', id_user: data.user.id });
// });

// * Route untuk mengirim ulang email verifikasi
// router.post('/resend-verification', async (req, res) => {
//   const { email } = req.body;

//   const { error } = await supabase.auth.resendVerificationEmail({ email });

//   if (error) {
//     return res.status(400).json({ error: 'Gagal mengirim email verifikasi: ' + error.message });
//   }

//   res.json({ message: 'Email verifikasi telah dikirim ulang.' });
// });



// * Route untuk logout
// router.post('/logout', (req, res) => {
//   // Hapus token dari cookie dengan menetapkan waktu kedaluwarsa menjadi waktu lampau
//   res.cookie('token', '', {
//     httpOnly: true,       // Tetap httpOnly untuk keamanan
//     secure: process.env.NODE_ENV === 'production', // Aktifkan secure di production
//     sameSite: 'Strict',   // Untuk mencegah CSRF
//     expires: new Date(0), // Set cookie kadaluarsa di masa lalu untuk menghapusnya
//   });
//   res.clearCookie('token');
//   res.clearCookie('refreshToken');
//   res.json({ message: 'Logout berhasil' });
// });

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.json({ message: 'Logout berhasil' });
});


module.exports = router;
