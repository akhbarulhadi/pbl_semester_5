const express = require('express');
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("table_product")
      .select("*")
      .order("id_product", { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { nama_product, quantity } = req.body;

  try {
    const { data, error } = await supabase
      .from("table_product")
      .insert([{ nama_product, quantity }]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id_product", async (req, res) => {
  const { id_product } = req.params;
  const { nama_product, quantity } = req.body;

  try {
    const { data, error } = await supabase
      .from("table_product")
      .update({ nama_product, quantity })
      .eq("id_product", id_product);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id_product", async (req, res) => {
  const { id_product } = req.params;

  try {
    const { data, error } = await supabase
      .from("table_product")
      .delete()
      .eq("id_product", id_product);

    if (error) throw error;
    res.status(200).json({ message: "Data berhasil dihapus", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id_product", async (req, res) => {
  const { id_product } = req.params;

  try {
    const { data, error } = await supabase
      .from("table_product")
      .select("*")
      .eq("id_product", id_product)
      .single();

    if (error) throw error;

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
