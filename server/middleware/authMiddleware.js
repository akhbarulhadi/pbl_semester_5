const jwt = require('jsonwebtoken');

// ! Middleware untuk memeriksa token di cookies
// const authMiddleware = (req, res, next) => {
//   // console.log('Token diterima:', req.cookies.token);
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Pastikan token belum expired
//     if (Date.now() >= decoded.exp * 1000) {
//       return res.status(401).json({ message: 'Token telah kedaluwarsa' });
//     }

//     // Validasi IP dan User-Agent
//     // if (decoded.ip !== req.ip || decoded.userAgent !== req.get('User-Agent')) {
//     //   return res.status(403).json({ message: 'Akses tidak sah, IP atau User-Agent tidak sesuai' });
//     // }

//     req.user = decoded; // Simpan informasi pengguna di request
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token tidak valid' });
//   }
// };


// ! Middleware untuk memeriksa token di cookies (Mode Production)
// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     // console.log('Decoded Token:', decoded); // Cek isi decoded token
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };


// ! Middleware untuk memeriksa token di cookies (Bypass & Mode Development)
const authMiddleware = (req, res, next) => {
  // console.log('NODE_ENV:', process.env.NODE_ENV);
  // Bypass token jika dalam mode development
  if (process.env.NODE_ENV === 'development') {
    req.user = {
      // id: '53d151f8-bf87-45b4-b80f-70f65d8338d5',
      // email: 'grilong66@gmail.com',
      // name: 'grilong',
      // role: 'Student'
      // id: '5bfa3e67-888f-4a5e-8dc3-03cfa4763b60',
      // email: 'admin1@gmail.com',
      // name: 'admin1',
      // role: 'Admin'
      id: 'a0570ba0-1d2c-493b-96c6-3a61e252160f',
      email: 'guru1@gmail.com',
      name: 'guru1',
      role: 'Teacher'
    };
    return next();
  }

  // Periksa token di cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
