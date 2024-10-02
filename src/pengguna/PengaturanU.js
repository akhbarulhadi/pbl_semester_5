import React, { useState } from 'react';

const PengaturanU = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kataSandi: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika untuk menyimpan perubahan pengaturan
    console.log('Data yang disimpan:', formData);
  };

  return (
    <section className="relative mt-20 bg-gradient-to-r from-blue-100 to-white w-full">
    <div className="container mx-auto p-4 md:ml-72 pt-16">
      <h1 className="text-3xl font-bold mb-4">Pengaturan Akun</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium" htmlFor="nama">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan email Anda"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium" htmlFor="kataSandi">
            Kata Sandi
          </label>
          <input
            type="password"
            id="kataSandi"
            name="kataSandi"
            value={formData.kataSandi}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan kata sandi baru"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
    </section>
    
  );
};

export default PengaturanU;
