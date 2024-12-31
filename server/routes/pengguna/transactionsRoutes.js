const express = require('express');
const router = express.Router();
const snap = require('../../midtrans'); // Midtrans configuration
const { createClient } = require("@supabase/supabase-js");
const authMiddleware = require('../../middleware/authMiddleware'); // Import middleware autentikasi
require('dotenv').config();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint untuk memulai pembayaran
router.post("/pay-course", authMiddleware, async (req, res) => {
    const { id_course } = req.body;
    const id_user = req.user.id;

    console.log('Request Body:', req.body);

    try {
        const { data: course, error: courseError } = await supabase
            .from("courses")
            .select("*")
            .eq("id_course", id_course)
            .single();

        if (courseError || !course) throw new Error("Kursus tidak ditemukan");
        const courseOwnerId = course.id_user; // ! id_user sebagai pemilik kursus (owner) diambil dari tabel courses

        const { data: publicUser, error: publicUserError } = await supabase
            .from("users")
            .select("name")
            .eq("id_user", id_user)
            .single();

        if (publicUserError || !publicUser) throw new Error("Pengguna tidak ditemukan di public.users");

        // Ambil detail pengguna auth users
        const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(id_user);

        console.log('User Data:', user);
        console.log('User Error:', userError);
        if (userError || !user) throw new Error("Pengguna tidak ditemukan auth users");

        // Buat data transaksi untuk Midtrans
        const transaction = {
            transaction_details: {
                order_id: `course-${id_course}-${Date.now()}`,
                gross_amount: course.price,
            },
            customer_details: {
                first_name: publicUser.name,
                email: user.email,
            },
            item_details: [
                {
                    id: course.id_course.toString(),
                    price: course.price,
                    quantity: 1,
                    name: course.course_title,
                    owner_id: courseOwnerId,
                },
            ],
            // Custom field untuk menambahkan informasi pemilik kursus jika diperlukan
            custom_field1: `Pemilik kursus: (ID: ${courseOwnerId})`,
        };

        // Buat transaksi di Midtrans
        const midtransResponse = await snap.createTransaction(transaction);

        console.log('Midtrans Response:', midtransResponse);

        if (!midtransResponse || !midtransResponse.redirect_url) {
            throw new Error('Midtrans response tidak valid atau redirect_url tidak ditemukan');
        }

        // Simpan transaksi di tabel `user_payment_courses` dengan status `pending`
        const { data: paymentData, error: paymentError } = await supabase
            .from("user_payment_courses")
            .insert([
                {
                    id_user: id_user,
                    id_course: id_course,
                    price: course.price,
                    id_user_teacher: courseOwnerId,
                    payment_status: 'pending',
                    transaction_id: transaction.transaction_details.order_id,
                    snap_token: midtransResponse.token,
                    snap_redirect_url: midtransResponse.redirect_url
                },
            ]);

        if (paymentError) throw paymentError;

        res.status(201).json({
            message: "Transaksi berhasil dibuat",
            redirect_url: midtransResponse.redirect_url,
            snap_token: midtransResponse.token,
        });
    } catch (error) {
        console.error('Error dalam proses pembayaran:', error);
        res.status(500).json({ error: error.message });
    }
});

// ! ini notifikasi midtrans sekarang
// router.post("/midtrans-notification", async (req, res) => {
//   const { order_id, transaction_status, payment_type } = req.body;

//   try {
//       // Update status pembayaran berdasarkan notifikasi Midtrans
//       let payment_status = 'pending';
//       if (transaction_status === 'settlement' || transaction_status === 'capture') {
//           payment_status = 'paid';
//       } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
//           payment_status = 'failed';
//       }

//       // Update status pembayaran di database
//       const { data: paymentData, error: paymentError } = await supabase
//           .from("user_payment_courses")
//           .update({ payment_status, payment_method: payment_type, payment_date: new Date() })
//           .eq("transaction_id", order_id);

//       if (paymentError) throw paymentError;

//       // Jika pembayaran berhasil, tambahkan data ke tabel join_courses
//       if (payment_status === 'paid') {
//           // Ambil detail kursus dan pengguna berdasarkan order_id
//           const { data: paymentRecord, error: paymentRecordError } = await supabase
//               .from("user_payment_courses")
//               .select("id_user, id_course")
//               .eq("transaction_id", order_id)
//               .single();

//           if (paymentRecordError || !paymentRecord) throw new Error("Detail transaksi tidak ditemukan");

//           const { id_user, id_course } = paymentRecord;

//           const { data: joinData, error: joinError } = await supabase
//               .from("join_courses")
//               .insert([{
//                   id_user: id_user,
//                   id_course: id_course,
//               }]);

//           if (joinError) throw joinError;
//       }

//       res.status(200).json({ 
//           message: "Notifikasi diterima", 
//           data: paymentData,
//           status: payment_status,
//       });
//   } catch (error) {
//       console.error('Error dalam Midtrans Notification:', error.message);
//       res.status(500).json({ error: error.message });
//   }
// });

router.post("/midtrans-notification", async (req, res) => {
    const { order_id, transaction_status, payment_type } = req.body;

    try {
        let payment_status = 'pending';
        if (transaction_status === 'settlement' || transaction_status === 'capture') {
            payment_status = 'paid';
        } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
            payment_status = 'failed';
        }

        // // Cek dan tandai transaksi sebagai diproses
        // const { data: isProcessedRecord } = await supabase
        //     .from("user_payment_courses")
        //     .select("is_processed")
        //     .eq("transaction_id", order_id)
        //     .single();

        // if (isProcessedRecord && isProcessedRecord.is_processed) {
        //     return res.status(200).json({ message: "Transaksi sudah diproses sebelumnya" });
        // }

        await supabase
            .from("user_payment_courses")
            .update({ payment_status, payment_method: payment_type, payment_date: new Date() })
            .eq("transaction_id", order_id);

        if (payment_status === 'paid') {
            const { data: paymentRecord } = await supabase
                .from("user_payment_courses")
                .select("id_user, id_course, price, id_user_teacher")
                .eq("transaction_id", order_id)
                .limit(1)
                .maybeSingle();

            const { id_user, id_course, price, id_user_teacher } = paymentRecord;

            const { data: existingJoinCourse } = await supabase
                .from("join_courses")
                .select("id")
                .eq("id_user", id_user)
                .eq("id_course", id_course)
                .single();

            if (!existingJoinCourse) {
                await supabase
                    .from("join_courses")
                    .insert([{ id_user: id_user, id_course: id_course }]);
            }

            const { data: balanceRecord } = await supabase
                .from("teacher_balance")
                .select("id, balance")
                .eq("id_user_teacher", id_user_teacher)
                .limit(1)
                .maybeSingle();

            let newBalance = price;
            if (balanceRecord) {
                newBalance += balanceRecord.balance;
                await supabase
                    .from("teacher_balance")
                    .update({ balance: newBalance, updated_at: new Date() })
                    .eq("id", balanceRecord.id);
            } else {
                await supabase
                    .from("teacher_balance")
                    .insert([{ id_user_teacher, balance: newBalance, created_at: new Date(), updated_at: new Date() }]);
            }
        }

        res.status(200).json({ message: "Notifikasi diterima", status: payment_status });
    } catch (error) {
        console.error('Error dalam Midtrans Notification:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// router.post("/midtrans-notification", async (req, res) => {
//     const { order_id, transaction_status, payment_type } = req.body;

//     try {
//         // Update status pembayaran berdasarkan notifikasi Midtrans
//         let payment_status = 'pending';
//         if (transaction_status === 'settlement' || transaction_status === 'capture') {
//             payment_status = 'paid';
//         } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
//             payment_status = 'failed';
//         }

//         // Update status pembayaran di database
//         const { data: paymentData, error: paymentError } = await supabase
//             .from("user_payment_courses")
//             .update({ payment_status, payment_method: payment_type, payment_date: new Date() })
//             .eq("transaction_id", order_id);

//         if (paymentError) throw paymentError;

//         // Jika pembayaran berhasil, tambahkan data ke tabel join_courses
//         if (payment_status === 'paid') {
//             // Ambil detail kursus dan pengguna berdasarkan order_id
//             const { data: paymentRecord, error: paymentRecordError } = await supabase
//                 .from("user_payment_courses")
//                 .select("id_user, id_course, price, id_user_teacher") // Get id_user_teacher as well
//                 .eq("transaction_id", order_id)
//                 .single();

//             if (paymentRecordError || !paymentRecord) throw new Error("Detail transaksi tidak ditemukan");

//             const { id_user, id_course, price, id_user_teacher } = paymentRecord;

//             // Insert to join_courses
//             const { data: joinData, error: joinError } = await supabase
//                 .from("join_courses")
//                 .insert([{ id_user: id_user, id_course: id_course }]);

//             if (joinError) throw joinError;

//             // Update or insert into teacher_balance
//             // Check if the teacher's balance already exists
//             const { data: balanceRecord, error: balanceError } = await supabase
//                 .from("teacher_balance")
//                 .select("id, balance")
//                 .eq("id_user_teacher", id_user_teacher)
//                 .single();

//             let newBalance = price; // Start with the price from the payment

//             if (balanceError) throw balanceError;

//             // If a balance record exists, update it
//             if (balanceRecord) {
//                 newBalance += balanceRecord.balance; // Add to existing balance
//                 const { error: updateBalanceError } = await supabase
//                     .from("teacher_balance")
//                     .update({ balance: newBalance, updated_at: new Date() })
//                     .eq("id", balanceRecord.id);
                
//                 if (updateBalanceError) throw updateBalanceError;
//             } else {
//                 // If no record exists, create a new one
//                 const { error: insertBalanceError } = await supabase
//                     .from("teacher_balance")
//                     .insert([{
//                         id_user_teacher,
//                         created_at: new Date(),
//                         balance: newBalance,
//                         updated_at: new Date()
//                     }]);

//                 if (insertBalanceError) throw insertBalanceError;
//             }
//         }

//         res.status(200).json({ 
//             message: "Notifikasi diterima", 
//             data: paymentData,
//             status: payment_status,
//         });
//     } catch (error) {
//         console.error('Error dalam Midtrans Notification:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// });


// ! ini unutk testing notifikasi midtrans sebelumnya
// router.post("/midtrans-notification", async (req, res) => {
//   const { order_id, transaction_status, payment_type } = req.body;

//   try {
//     // Log metode pembayaran yang diterima dari notifikasi Midtrans
//     // console.log('Midtrans Notification - Payment Method:', payment_type);
//     // console.log('Midtrans Notification - Full Body:', req.body); // Log seluruh isi notifikasi Midtrans
    
//     // Update status pembayaran berdasarkan notifikasi Midtrans
//     let payment_status = 'pending';
//     if (transaction_status === 'settlement' || transaction_status === 'capture') {
//       payment_status = 'paid';
//     } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
//       payment_status = 'failed';
//     }

//     // Update status pembayaran di database
//     const { data, error } = await supabase
//       .from("user_payment_courses")
//       .update({ payment_status, payment_method: payment_type, payment_date: new Date() })
//       .eq("transaction_id", order_id);

//     if (error) throw error;

//     res.status(200).json({ 
//       message: "Notifikasi diterima", 
//       data,
//       status: payment_status,
//       // redirect_url: "http://localhost:3000/courses" 
//     });
//   } catch (error) {
//     console.error('Error dalam Midtrans Notification:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });


router.post("/join-course", authMiddleware, async (req, res) => {
    const { id_course } = req.body;
    const id_user = req.user.id; // Ambil id_user dari token

    try {
        const { data, error } = await supabase
            .from("join_courses")
            .insert([
                {
                    id_user: id_user,
                    id_course: id_course,
                },
            ]);

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
