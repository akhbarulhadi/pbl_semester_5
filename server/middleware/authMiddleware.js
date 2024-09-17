const jwt = require('jsonwebtoken');

// Middleware untuk memeriksa token di cookies
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log('Decoded Token:', decoded); // Cek isi decoded token
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = authMiddleware;
