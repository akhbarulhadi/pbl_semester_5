const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();
const accessControl = require('../../middleware/accessControl');

const router = express.Router();

// ! Buat client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", accessControl('Admin'), async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("teacher_withdrawal")
      .select("*")
      .order("status", { ascending: true })
      .order("created_at", { ascending: false })
      .eq('status', 'Pending');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/pengajuan-dana", accessControl('Admin'), async (req, res) => {
  try {
    const { data: withdarwals, error: withdarwalError } = await supabase
      .from("teacher_withdrawal")
      .select("*")
      // .order("status", { ascending: true })
      .order("created_at", { ascending: false })
      .in("status", ["Paid", "Cancelled"]);

      if (withdarwalError) throw withdarwalError;

      const userIds = withdarwals.map(withdarwal => withdarwal.id_user_teacher);
  
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id_user, name')
        .in('id_user', userIds);
  
      if (usersError) throw usersError;


      const mergedData = withdarwals.map(withdarwal => {
        const user = users.find(user => user.id_user === withdarwal.id_user_teacher);
        return {
          id_withdraw: withdarwal.id_withdraw,
          status: withdarwal.status,
          updated_at: withdarwal.updated_at,
          user_name: withdarwal.user_name,
          amount: withdarwal.amount ? withdarwal.amount : 0,
          bank_name: withdarwal.bank_name,
          bank_account_number: withdarwal.bank_account_number,
          bank_account_holder_name: withdarwal.bank_account_holder_name,
          user_name: user ? user.name : 'Nama tidak ditemukan'
        };
      });

      const limitedData = mergedData;

      res.status(200).json(limitedData);
      
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// !untuk meruba status nya dan mengurangi saldo
router.put('/:id_withdraw', async (req, res) => {
  const { id_withdraw } = req.params;
  const { status } = req.body;

  if (!['Cancelled', 'Paid', 'Pending'].includes(status)) {
    return res.status(400).json({ error: 'Status tidak valid' });
  }

  try {
    // Step 1: Get the withdrawal details
    const { data: withdrawal, error: withdrawalError } = await supabase
      .from('teacher_withdrawal')
      .select('id_user_teacher, amount')
      .eq('id_withdraw', id_withdraw)
      .single();

    if (withdrawalError || !withdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }

    // Step 2: Update the status in teacher_withdrawal
    const { error: updateError } = await supabase
      .from('teacher_withdrawal')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id_withdraw', id_withdraw);

    if (updateError) {
      console.error('Update error:', updateError);
      throw updateError;
    }

    // Step 3: If status is "Paid", update the teacher's balance
    if (status === 'Paid') {
      const { id_user_teacher, amount } = withdrawal;

      // Step 4: Get the current balance
      const { data: balanceData, error: balanceError } = await supabase
        .from('teacher_balance')
        .select('balance')
        .eq('id_user_teacher', id_user_teacher)
        .single();

      if (balanceError || !balanceData) {
        return res.status(404).json({ error: 'Balance not found' });
      }

      const currentBalance = balanceData.balance;

      // Step 5: Calculate the new balance
      const newBalance = currentBalance - amount;

      // Step 6: Update the teacher's balance
      const { error: updateBalanceError } = await supabase
        .from('teacher_balance')
        .update({
          balance: newBalance,
          updated_at: new Date().toISOString()
        })
        .eq('id_user_teacher', id_user_teacher);

      if (updateBalanceError) {
        console.error('Balance update error:', updateBalanceError);
        throw updateBalanceError;
      }
    }

    res.status(200).json({ message: 'Status penarikan berhasil diubah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengubah status penarikan.' });
  }
});

router.get("/dashboard/pengajuan-dana", accessControl('Admin'), async (req, res) => {
  try {
    const { data: withdarwals, error: withdarwalError } = await supabase
      .from("teacher_withdrawal")
      .select("*")
      // .order("status", { ascending: true })
      .order("created_at", { ascending: false })
      .eq('status', 'Pending');

      if (withdarwalError) throw withdarwalError;

      const userIds = withdarwals.map(withdarwal => withdarwal.id_user_teacher);
  
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id_user, name')
        .in('id_user', userIds);
  
      if (usersError) throw usersError;


      const mergedData = withdarwals.map(withdarwal => {
        const user = users.find(user => user.id_user === withdarwal.id_user_teacher);
        return {
          id_withdraw: withdarwal.id_withdraw,
          status: withdarwal.status,
          user_name: withdarwal.user_name,
          amount: withdarwal.amount ? withdarwal.amount : 0,
          bank_name: withdarwal.bank_name,
          bank_account_number: withdarwal.bank_account_number,
          bank_account_holder_name: withdarwal.bank_account_holder_name,
          user_name: user ? user.name : 'Nama tidak ditemukan'
        };
      });

      const limitedData = mergedData.slice(0, 5);

      res.status(200).json(limitedData);
      
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post("/", async (req, res) => {
//   const userId = req.user.id;
//   const { amount, bank_name, bank_account_holder_name, bank_account_number } = req.body;

//   try {
//     // Ambil saldo pengajar
//     const { data: teacherBalance, error: teacherBalanceError } = await supabase
//       .from('teacher_balance')
//       .select('balance')
//       .eq('id_user_teacher', userId)
//       .single(); // asumsi satu catatan per pengguna

//     if (teacherBalanceError) {
//       return res.status(400).json({ error: teacherBalanceError.message });
//     }

//     const balance = teacherBalance.balance; // Ekstrak saldo dari respons

//     // Cek jika jumlah penarikan melebihi saldo
//     if (amount > balance) {
//       return res.status(400).json({ error: "Jumlah penarikan melebihi saldo yang tersedia." });
//     }

//     // Masukkan permintaan penarikan jika saldo mencukupi
//     const { data, error } = await supabase
//       .from("teacher_withdrawal")
//       .insert([{
//         id_user_teacher: userId,
//         amount, 
//         bank_name, 
//         bank_account_holder_name, 
//         bank_account_number, 
//         status: "Pending",
//       }]);

//     if (error) {
//       console.log("Error memasukkan data:", error.message); // Catat error
//       throw error;
//     }

//     console.log("Data berhasil dimasukkan:", data); // Catat keberhasilan
//     res.status(201).json(data);
//   } catch (error) {
//     console.log("Kesalahan dalam blok catch:", error.message); // Catat error dalam blok catch
//     res.status(500).json({ error: error.message });
//   }
// });



module.exports = router;
