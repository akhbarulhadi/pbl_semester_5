import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const FormIncome = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi nomor rekening
    const accountNumberPattern = /^\d{10,16}$/; // Nomor rekening harus terdiri dari 10 hingga 16 angka
    if (!accountNumberPattern.test(accountNumber)) {
      alert("Nomor rekening tidak valid. Harap masukkan nomor rekening yang benar (10-16 digit).");
      return;
    }
  
    const formData = {
      amount,
      bank_name: bankName,
      bank_account_holder_name: accountHolderName,
      bank_account_number: accountNumber,
      status: "Pending",
    };
  
    const confirm = window.confirm("Apakah anda yakin ingin memasukkan data nya!, Direkomendasikan untuk melihat ulang!");
    if (!confirm) return;
  
    try {
      const response = await fetch("/api/pengajar/withdrawal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        if (data.error === "Jumlah penarikan melebihi saldo yang tersedia.") {
          alert(data.error);
        }
      } else {
        console.log("Success:", data);
        alert("Berhasil!");
        navigate('/pengajar/dashboard-pengajar');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative z-10 mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <p className="text-4xl text-gray-900 font-extralight dark:text-white">Form Penarikan Duit</p>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="amount"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Total duit yang mau Di Ambil
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="bank_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nama Bank
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          value={accountHolderName}
          onChange={(e) => setAccountHolderName(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="account_holder_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nama Pemilik Rekening Bank
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="tel"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="account_number"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          No Rekening Bank
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default FormIncome;
