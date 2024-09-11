const express = require('express');
require('dotenv').config();

const app = express();
const port = 5000;

const productRoutes = require('./routes/productRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api/products', productRoutes); // Gunakan rute produk
app.use('/api/courses', coursesRoutes);
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
