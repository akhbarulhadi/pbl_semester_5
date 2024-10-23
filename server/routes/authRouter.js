const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const useragent = require('express-useragent'); // Import express-useragent
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware autentikasi

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const multer = require('multer');


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




// * Route untuk register (dulu)
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   // Cek apakah email dan password diberikan
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email dan password wajib diisi' });
//   }

//   // Mendaftarkan pengguna baru dengan Supabase
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error || !data.user) {
//     return res.status(400).json({ error: 'Gagal mendaftarkan pengguna: ' + error.message });
//   }

//   // Buat token JWT untuk autentikasi
//   const token = jwt.sign(
//     { id: data.user.id, email: data.user.email },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: '1h' }
//   );

//   // Simpan token dalam HttpOnly cookie
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'Strict',
//     maxAge: 60 * 60 * 1000, // Cookie berlaku selama 1 jam
//   });

//   res.status(201).json({ message: 'Registrasi berhasil. Silakan cek email untuk verifikasi.' });
// });



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

// * Route untuk register
router.post('/signup', upload.single('foto_pengajar'), async (req, res) => { // Ganti nama file dengan 'foto_pengajar'
  console.log("Body Request:", req.body); // Log body request untuk debugging

  const { nama, email, password, role, no_telepon } = req.body;
  const imageUrl = req.file ? `/uploads/user/${req.file.filename}` : null; // URL file yang di-upload

  if (!email || !password || !nama) {
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
        name: nama,
        role: role || 'Student',
        no_telp: no_telepon,
        foto: imageUrl // Simpan URL gambar
      }]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(200).json({
      message: 'User berhasil ditambahkan',
      data: {
        id_user: data.user.id,
        name: nama,
        role: role || 'Student',
        no_telp: no_telepon,
        foto: imageUrl
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
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

router.get('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    // Query untuk mengambil data dari tabel public.users
    const { data: publicUser, error: publicUsersError } = await supabase
      .from('users')
      .select('name, created_at, role, id_user, no_telp, foto')
      .eq('id_user', userId)
      .single(); // Menggunakan single karena kita hanya mengambil satu user berdasarkan id_user

    if (publicUsersError) {
      return res.status(400).json({ error: 'Error fetching public users: ' + publicUsersError.message });
    }

    // Query untuk mengambil data dari auth.users menggunakan Supabase Admin API
    const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();

    if (authUsersError) {
      return res.status(400).json({ error: 'Error fetching auth users: ' + authUsersError.message });
    }

    // Cari user yang sesuai di authUsers berdasarkan id_user
    const authUser = authUsers.users.find(au => au.id === publicUser.id_user);

    // Gabungkan data dari publicUser dan authUser
    const mergedData = {
      ...publicUser,
      email: authUser ? authUser.email : null,
      last_sign_in_at: authUser ? authUser.last_sign_in_at : null,
    };

    return res.status(200).json(mergedData); // Kembalikan data user yang sudah digabung
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

module.exports = router;
