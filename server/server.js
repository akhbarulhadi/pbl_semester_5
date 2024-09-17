const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authMiddleware = require('./middleware/authMiddleware');
const authRouter = require('./routes/authRouter');
const productRoutes = require('./routes/productRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const purchasedCoursesRoutes = require('./routes/purchasedCoursesRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');

const app = express();
const port = 5000;

// Middleware untuk parsing JSON dan Cookie
app.use(express.json());
app.use(cookieParser()); // Tambahkan ini untuk memparsing cookies

app.use('/api/auth', authRouter); 
app.use('/api/products', authMiddleware, productRoutes);
app.use('/api/courses', authMiddleware, coursesRoutes);
app.use('/api/course-purchased', authMiddleware, purchasedCoursesRoutes);
app.use("/api/transactions", transactionsRoutes);

app.get('/api', (req, res) => {
    res.send('Express Connected!');
});

app.get('/api/about', (req, res) => {
    res.send('About Page');
});

app.use("*", (req, res) => {
    res.status(404).send("Halaman tidak ditemukan");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}/api`);
});
