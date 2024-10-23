import React, { useState } from "react";

const FormPengajar = () => {
  const [namaPengajar, setNamaPengajar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Teacher');
  const [noTelepon, setNoTelepon] = useState('');
  const [fotoPengajar, setFotoPengajar] = useState(null); // Tambahkan state untuk file foto
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Buat objek FormData untuk menampung data dan file
    const formData = new FormData();
    formData.append('nama_pengajar', namaPengajar);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('no_telepon_pengajar', noTelepon);
    formData.append('foto_pengajar', fotoPengajar); // Tambahkan file foto

    try {
      const response = await fetch('/api/admin/signup-teacher/add-teacher', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat menambahkan pengajar');
      }

      setMessage(data.message);
      setNamaPengajar('');
      setEmail('');
      setPassword('');
      setRole('Teacher');
      setNoTelepon('');
      setFotoPengajar(null); // Reset state foto
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto relative z-10 mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800"
    >
      <p className="text-4xl text-gray-900 font-extralight dark:text-white">
        Form Tambah Pengajar
      </p>

      {/* Input for Name */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          value={namaPengajar}
          onChange={(e) => setNamaPengajar(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="nama_pengajar"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nama Lengkap Pengajar
        </label>
      </div>

      {/* Input for Email */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email_pengajar"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email Pengajar
        </label>
      </div>

      {/* Input for Password */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          minLength={12}
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>

      {/* Input for Phone Number */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          value={noTelepon}
          onChange={(e) => setNoTelepon(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="no_telepon_pengajar"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          No Telepon Pengajar
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Foto Pengajar
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={(e) => setFotoPengajar(e.target.files[0])}
        />
        <p
          class="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </form>
  );
};

export default FormPengajar;
