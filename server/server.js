const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const useragent = require('express-useragent');
const geoip = require('geoip-lite');
const path = require('path');

const authMiddleware = require('./middleware/authMiddleware');
const authRouter = require('./routes/authRouter');
const productRoutes = require('./routes/productRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const purchasedCoursesRoutes = require('./routes/purchasedCoursesRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');

const coursesPengajarRoutes = require('./routes/pengajar/coursesRoutes');
const statistikAdminRoutes = require('./routes/admin/statistikRoutes');
const coursesPenggunaRoutes = require('./routes/pengguna/coursesRoutes');
const transactionsPenggunaRoutes = require('./routes/pengguna/transactionsRoutes');
const coursesAdminRoutes = require('./routes/admin/coursesRoutes');
const teacherAdminRoutes = require('./routes/admin/teacherRoutes');
const signupTeachersAdminRoutes = require('./routes/admin/signupTeachersRoutes');
const teacherWithdrawalRoutes = require('./routes/pengajar/withdrawRoutes');
const adminWithdrawalRoutes = require('./routes/admin/withdrawRoutes');

const app = express();
const fs = require('fs');

const port = 5000;

// Middleware untuk parsing JSON dan Cookie
app.use(express.json());
app.use(cookieParser()); // Tambahkan ini untuk memparsing cookies

app.use('/api/auth', authRouter); 
app.use('/api/products', authMiddleware, productRoutes);
app.use('/api/courses', authMiddleware, coursesRoutes);
app.use('/api/course-purchased', authMiddleware, purchasedCoursesRoutes);
app.use("/api/transactions", transactionsRoutes);

app.use('/api/pengajar/courses', authMiddleware, coursesPengajarRoutes);
app.use('/api/admin/statistik', authMiddleware, statistikAdminRoutes);
app.use('/api/pengguna/courses', authMiddleware, coursesPenggunaRoutes);
app.use('/api/pengguna/transactions', transactionsPenggunaRoutes);
app.use('/api/admin/courses', authMiddleware, coursesAdminRoutes);
app.use('/api/admin/teacher', authMiddleware, teacherAdminRoutes);
app.use('/api/admin/signup-teacher', signupTeachersAdminRoutes);
app.use('/api/pengajar/withdrawal', authMiddleware, teacherWithdrawalRoutes);
app.use('/api/admin/withdrawal', authMiddleware, adminWithdrawalRoutes);

app.use('/api/uploads/kelas', express.static(path.join(__dirname, 'uploads/kelas')));
app.use('/api/uploads/user', express.static(path.join(__dirname, 'uploads/user')));

app.use(useragent.express());

app.set('trust proxy', 1); // 1 untuk proxy tunggal seperti Nginx atau Heroku


app.get('/', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.ip;
    const referer = req.headers['referer'] || 'No referer';
    const language = req.headers['accept-language'];
    const cookies = req.headers['cookie'];
    const geo = geoip.lookup(userIp);

    // const log = `${new Date().toISOString()} - User IP: ${userIp}, Device: ${req.useragent.platform}, Browser: ${req.useragent.browser}\n`;
    const log = `${new Date().toISOString()} - User IP: ${userIp}, Referer: ${referer}, Preferred Language: ${language}, Cookies: ${cookies}, Location: ${geo ? `${geo.city}, ${geo.country}` : 'Location not found'}, Device: ${req.useragent.platform}, Browser: ${req.useragent.browser}\n`;

    fs.appendFile('access.log', log, (err) => {
        if (err) {
            console.error('Gagal menulis log:', err);
            return res.status(500).send('Internal Server Error');
        }
    });

    console.log(log);
    console.log('Referer:', referer);
    console.log('Preferred Language:', language);
    console.log('Cookies:', cookies);
    console.log('Location:', geo);


    res.send('Welcome to the landing page!');
});


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
