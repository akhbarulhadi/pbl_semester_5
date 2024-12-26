import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const KursusDetail = () => {
  const { id_course } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [showSpoiler, setShowSpoiler] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/api/pengguna/courses/willpay/${id_course}`);
        setCourse(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id_course]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  if (error)
    return <div className="text-center mt-8 text-xl text-red-500">{error}</div>;
  if (!course)
    return (
      <div className="text-center mt-8 text-xl text-red-500">
        Kelas tidak ditemukan.
      </div>
    );

  const handlePayment = () => {
    const token = getToken();
    fetch(`/api/pengguna/transactions/pay-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_course }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.redirect_url;
      })
      .catch((error) => console.error(error));
  };

  const getToken = () => {
    const match = document.cookie.match(/(^|;)\s*token\s*=\s*([^;]+)/);
    return match ? match[2] : null;
  };

  const handleJoinCourse = () => {
    const token = getToken();
    fetch(`/api/pengguna/transactions/join-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_course }),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.href = `/pengguna/kursus/${id_course}`;
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
     {/* Kursus Section */}
     <section className="relative w-full px-4 py-16 md:px-8 md:py-20 bg-[#E6EFDF]">
        <div className="container mx-auto px-4 mt-9 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Gambar Kursus */}
            <div className="relative">
              <img
                src={`/api/${course.image_url}`}
                alt={course.course_title}
                className="w-full h-80 object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-opacity duration-300 hover:opacity-0"></div>
            </div>
            {/* Detail Kursus */}
            <div className="text-black">
              <h1 className="text-5xl font-extrabold mb-2 leading-tight">
                {course.course_title}
              </h1>

              {/* Menampilkan jumlah peserta dengan tampilan menarik */}
              <div className="flex items-center space-x-2 mb-4">
                {/* Badge untuk jumlah peserta */}
                <div className="flex items-center bg-green-200 text-gray-700 font-medium px-4 py-2 rounded-full shadow-md transform hover:scale-110 transition duration-300">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4 4 4 0 00-4 4v2m6-6a6 6 0 016 6m-6-6a6 6 0 00-6 6" />
                  </svg>
                  <span>{course.total_users} peserta</span>
                </div>
              </div>

              {/* Bagian Harga & Tombol Gabung Sejajar */}
              <div className="flex items-center mb-8 space-x-4 mt-8">
                {/* Menampilkan harga seperti tombol */}
                <div
                  style={{ borderRadius: '10px' }}
                  className="bg-white text-[#84D68E] font-bold px-10 py-4 shadow-lg flex items-center justify-center transition hover:bg-gray-200"
                >
                  {course.paid === false ? 'Gratis' : `Rp ${course.price}`}
                </div>

                {/* Tombol untuk mendaftar atau membeli */}
                <button
                  style={{ borderRadius: '10px' }}
                  className="bg-[#84D68E] text-white font-bold px-10 py-4 shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-110"
                  onClick={() =>
                    course.paid ? handlePayment() : handleJoinCourse()
                  }
                >
                  {course.paid ? 'Bayar Sekarang' : 'Gabung Kelas'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Deskripsi Kelas (2/3 lebar layar) */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Deskripsi Kelas</h2>
              <p className="text-lg text-gray-700 mb-6">{course.course_description}</p>
            </div>

            {/* Tahapan Pelatihan (1/3 lebar layar) */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tahapan Pelatihan</h3>
              <button
                onClick={() => setShowSpoiler(!showSpoiler)}
                className="text-blue-600 hover:underline mb-4"
              >
                {showSpoiler ? 'Sembunyikan Tahapan' : 'Lihat Tahapan Pelatihan'}
              </button>
              {showSpoiler && (
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-start bg-gray-100 p-4 rounded-lg shadow-md">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full text-xl font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                      <h4 className="text-lg font-semibold text-gray-800">{module.header}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Keuntungan Kelas (2/3 lebar layar) */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Keuntungan</h3>
              <ul className="list-none space-y-4">
              {course.benefit_course.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-green-500 flex-shrink-0 mr-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-lg">{benefit.benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mentor (1/3 lebar layar) */}
            <div className="md:col-span-1">
              <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-lg">
                <img
                  src={`/api/${course.mentor?.photo}`}
                  alt={course.mentor?.name || 'Mentor'}
                  className="w-24 h-24 rounded-full object-cover mr-6"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{course.user?.name || 'Nama Mentor Tidak Tersedia'}</h4>
                  <p className="text-gray-600 mb-2">{course.mentor?.description || 'Deskripsi Mentor Tidak Tersedia'}</p>
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < course.mentor?.rating ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={`w-5 h-5 ${i < course.mentor?.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KursusDetail;
