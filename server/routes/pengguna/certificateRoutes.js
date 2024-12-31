const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from("certificate_courses")
      .select("*, courses(course_title)")
      .eq('id_user', userId);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id_course", async (req, res) => {
  const userId = req.user.id;
  const { id_course } = req.params;

  try {
    // Periksa apakah user sudah memiliki sertifikat untuk kursus ini
    const { data: existingData, error: checkError } = await supabase
      .from("certificate_courses")
      .select("*")
      .eq("id_user", userId)
      .eq("id_course", id_course);

    if (checkError) throw checkError;

    if (existingData && existingData.length > 0) {
      return res.status(400).json({ error: "Anda sudah memiliki sertifikat ini" });
    }

    // Jika belum ada data yang sama, lakukan insert
    const { data, error } = await supabase
      .from("certificate_courses")
      .insert([
        {
          id_course,
          id_user: userId,
        },
      ]);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post('/quiz/submit-quiz', async (req, res) => {
//   // Destructure the incoming data
//   const { moduleId, quizzes } = req.body;

//   // Validate the input
//   if (!moduleId || !Array.isArray(quizzes) || quizzes.length === 0) {
//     return res.status(400).json({ error: 'Invalid input format or missing quizzes data' });
//   }

//   // Parse moduleId to ensure it's an integer
//   const moduleIdInt = parseInt(moduleId, 10);

//   // Check if moduleId is a valid integer
//   if (isNaN(moduleIdInt)) {
//     return res.status(400).json({ error: 'Invalid moduleId format' });
//   }

//   try {
//     // Prepare an array to store the results and counters for correct and wrong answers
//     const results = [];
//     let correctAnswerCount = 0;
//     let wrongAnswerCount = 0;

//     // Loop through each quiz in the quizzes array
//     for (const quiz of quizzes) {
//       const { id_quiz, answers } = quiz;

//       // Validate the individual quiz data
//       if (!id_quiz || !answers) {
//         results.push({ id_quiz, error: 'Missing required fields for quiz' });
//         continue; // Skip to the next quiz
//       }

//       // Fetch the quiz from the database using the provided id_quiz and moduleId
//       const { data: quizData, error: fetchError } = await supabase
//         .from('quiz')
//         .select('*')
//         .eq('id_quiz', id_quiz)
//         .eq('id_modules', moduleIdInt) // Use the parsed integer for moduleId
//         .single();

//       if (fetchError || !quizData) {
//         results.push({ id_quiz, error: 'Error fetching quiz data or quiz not found' });
//         continue; // Skip to the next quiz
//       }

//       // Check if the selected answer is correct
//       const correctAnswer = quizData.true_answer;
//       const isCorrect = answers === correctAnswer;

//       // Update counters for correct and wrong answers
//       if (isCorrect) {
//         correctAnswerCount++;
//       } else {
//         wrongAnswerCount++;
//       }

//       // Push the result for this quiz into the results array
//       results.push({
//         id_quiz,
//         correct: isCorrect,
//         correct_answer: correctAnswer,
//       });
//     }

//     // Calculate total answers
//     const totalAnswers = correctAnswerCount + wrongAnswerCount;

//     // Return the response with the results and summary
//     return res.json({
//       id_modules: moduleIdInt,
//       correct_answer: correctAnswerCount,
//       wrong_answer: wrongAnswerCount,
//       total_question: totalAnswers,
//       results,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while submitting the quiz' });
//   }
// });


router.post('/quiz/submit-quiz', async (req, res) => {
  const { moduleId, quizzes } = req.body;

  // Validasi input
  if (!moduleId || !Array.isArray(quizzes) || quizzes.length === 0) {
    return res.status(400).json({ error: 'Format input tidak valid atau data kuis tidak ada' });
  }

  const moduleIdInt = parseInt(moduleId, 10);

  if (isNaN(moduleIdInt)) {
    return res.status(400).json({ error: 'Format moduleId tidak valid' });
  }

  try {
    const results = [];
    let correctAnswerCount = 0;
    let wrongAnswerCount = 0;

    for (const quiz of quizzes) {
      const { id_quiz, answers } = quiz;
      console.log("Module ID:", moduleIdInt);
      console.log("Quiz ID:", id_quiz);
      console.log("Jawaban dari frontend:", answers);
      
      if (!id_quiz || !answers) {
        results.push({ id_quiz, error: 'Field yang dibutuhkan untuk kuis tidak ada' });
        continue;
      }

      // Menampilkan log query yang dikirimkan
      console.log("Mencari data kuis untuk:", { id_quiz, moduleIdInt });

      const { data: quizData, error: fetchError } = await supabase
        .from('quiz')
        .select('*')
        .eq('id_quiz', id_quiz)
        .eq('id_modules', moduleIdInt); // Mengambil data kuis berdasarkan id_quiz dan moduleId

      console.log("Data kuis yang diambil:", quizData);  // Log hasil dari query

      if (fetchError || !quizData || quizData.length === 0) {
        console.log("Tidak ada data kuis ditemukan untuk id_quiz:", id_quiz, "moduleId:", moduleIdInt);
        results.push({ id_quiz, error: 'Error mengambil data kuis atau kuis tidak ditemukan' });
        continue;
      }

      const correctAnswer = quizData[0].true_answer; // Jika ada lebih dari satu baris, ambil yang pertama
      console.log("Jawaban benar dari database:", correctAnswer); // Log jawaban benar dari database

      // Pastikan jawaban dibandingkan dengan tipe yang sama (string)
      const isCorrect = String(answers) === String(correctAnswer);
      console.log("Apakah jawabannya benar?", isCorrect); // Log hasil perbandingan

      if (isCorrect) {
        correctAnswerCount++;
      } else {
        wrongAnswerCount++;
      }

      results.push({
        id_quiz,
        correct: isCorrect,
        correct_answer: correctAnswer,
      });
    }

    const totalAnswers = correctAnswerCount + wrongAnswerCount;

    // Update tabel `user_opened_modules` setelah kuis selesai
    const { error: updateError } = await supabase
      .from('user_opened_modules')
      .update({
        correct_answers: correctAnswerCount,
        wrong_answers: wrongAnswerCount,
        total_questions: totalAnswers,
        submit_quiz_date: new Date(),
      })
      .eq('id_modules', moduleIdInt);

    if (updateError) {
      console.error('Error saat update tabel users_opened_modules:', updateError);
      return res.status(500).json({ error: 'Gagal mengupdate tabel users_opened_modules' });
    }

    // Mengirimkan respons dengan hasil dan ringkasan
    return res.json({
      id_modules: moduleIdInt,
      correct_answers: correctAnswerCount,
      wrong_answers: wrongAnswerCount,
      total_questions: totalAnswers,
      results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengirimkan kuis' });
  }
});


// ! Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tasks/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// ! Inisialisasi uplod middleware
const upload = multer({ storage: storage });

router.post("/upload/task", upload.single("taskFile"), async (req, res) => {
  const userId = req.user.id;
  const { moduleId, kursusId } = req.body;;

  try {
    // Periksa apakah user sudah memiliki sertifikat untuk kursus ini
    const { data: existingData, error: checkError } = await supabase
      .from("upload_task_user")
      .select("*")
      .eq("id_user", userId)
      .eq("id_modules", moduleId);

    if (checkError) throw checkError;

    if (existingData && existingData.length > 0) {
      // Hapus file yang sudah diunggah
      if (req.file) {
        const filePath = path.resolve("../server/uploads/tasks/", req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }

      return res.status(400).json({ error: "Anda sudah upload difile ini" });
    }

    const taskFilePath = req.file ? `/uploads/tasks/${req.file.filename}` : null;

    const { data, error } = await supabase
      .from("upload_task_user")
      .insert([
        {
          id_course: kursusId,
          id_modules: moduleId,
          id_user: userId,
          file_task: taskFilePath,
        },
      ]);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    // Hapus file jika terjadi kesalahan
    if (req.file) {
      const filePath = path.resolve("../server/uploads/tasks/", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
