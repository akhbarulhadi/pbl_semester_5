const express = require('express');
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

// Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL; // ! ini api project url supabase
const supabaseKey = process.env.SUPABASE_KEY; // ! ini api anon public supabase
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id_course", { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { course_title, course_description } = req.body;

  try {
    const { data, error } = await supabase
      .from("courses")
      .insert([{ course_title, course_description }]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id_course", async (req, res) => {
  const { id_course } = req.params;
  const { course_title, course_description } = req.body;

  try {
    const { data, error } = await supabase
      .from("courses")
      .update({ course_title, course_description })
      .eq("id_course", id_course);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id_course", async (req, res) => {
  const { id_course } = req.params;

  try {
    const { data, error } = await supabase
      .from("courses")
      .delete()
      .eq("id_course", id_course);

    if (error) throw error;
    res.status(200).json({ message: "Data berhasil dihapus", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id_course", async (req, res) => {
  const { id_course } = req.params;

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id_course", id_course)
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
