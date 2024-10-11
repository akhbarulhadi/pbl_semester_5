import React from 'react';
import { useParams } from 'react-router-dom';

const MulaiKelas = () => {
  const { id } = useParams();

  return (
    <section className="relative mt-20 bg-gradient-to-r from-blue-100 to-white w-full min-h-screen">
    <div className="container md:ml-72 mx-auto mt-20">
      <h1 className="text-3xl font-bold">Mulai Kelas dengan ID: {id}</h1>
      {/* Tambahkan logika dan konten kelas di sini */}
    </div>   
    </section>
  );
};

export default MulaiKelas;
