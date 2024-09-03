const express = require('express')
const { createClient } = require("@supabase/supabase-js"); // Ubah dari import ke const
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json()); // Tambahkan ini

// Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL; // ! ini api project url supabase
const supabaseKey = process.env.SUPABASE_KEY; // ! ini api anon public supabase
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api', (req, res) => {
    res.send('Express Connected!');
});

app.get("/api/products", async (req, res) => {
  try {
    // Ambil data dari tabel
    const { data, error } = await supabase
      .from("table_product")
      .select("*")
      .order("id_product", { ascending: false }); // Mengurutkan dari yang terbaru

    if (error) {
      throw error;
    }

    // Kirim data sebagai respon
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
    const { nama_product, quantity } = req.body; // Sesuaikan dengan kolom yang ada di tabel
  
    try {
      const { data, error } = await supabase
        .from("table_product")
        .insert([{ nama_product, quantity }]); // Sesuaikan dengan struktur tabel
  
      if (error) throw error;
  
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.put("/api/products/:id_product", async (req, res) => {
    const { id_product } = req.params; // Ambil id_product dari URL
    const { nama_product, quantity } = req.body; // Data yang akan diperbarui

    try {
        const { data, error } = await supabase
            .from("table_product")
            .update({ nama_product, quantity }) // Data yang diperbarui
            .eq("id_product", id_product); // Kondisi untuk memperbarui data

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/products/:id_product", async (req, res) => {
    const { id_product } = req.params; // Ambil id_product dari URL

    try {
        const { data, error } = await supabase
            .from("table_product")
            .delete() // Perintah untuk menghapus data
            .eq("id_product", id_product); // Kondisi untuk menghapus data

        if (error) throw error;

        res.status(200).json({ message: "Data berhasil dihapus", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/products/:id_product", async (req, res) => {
    const { id_product } = req.params; // Ambil id_product dari parameter URL

    try {
        // Query ke Supabase untuk mengambil data berdasarkan id
        const { data, error } = await supabase
            .from("table_product")
            .select("*")
            .eq("id_product", id_product) // Filter berdasarkan id
            .single(); // Mengambil satu record

        if (error) throw error;

        if (data) {
            // Jika data ditemukan, kembalikan dengan status 200
            res.status(200).json(data);
        } else {
            // Jika data tidak ditemukan, kembalikan status 404
            res.status(404).json({ message: "Data tidak ditemukan" });
        }
    } catch (error) {
        // Tangani error dengan mengembalikan status 500
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/about', (req, res) => {
    res.send('About Page');
});


app.use("*", (req, res) => {
    // * bisa gini juga YA
    res.status(404).send("Halaman tidak ditemukan");

    // res.status(404);
    // res.send("Halaman tidak ditemukan");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}/api`);
});