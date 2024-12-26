import React, { useEffect, useState } from 'react';

const PengaturanU = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kataSandi: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          credentials: 'include', // penting jika menggunakan cookie untuk autentikasi
        });

        if (!response.ok) {
          throw new Error('Error: ' + response.statusText);
        }

        const data = await response.json();
        setProfileData(data);
        // Isi formData dengan profileData
        setFormData({
          nama: data.name || '',
          email: data.email || '',
          kataSandi: '', // Kata sandi kosong karena tidak boleh langsung diisi
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 pl-64">
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
  );
};

export default PengaturanU;
