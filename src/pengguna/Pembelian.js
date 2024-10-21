import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaChalkboardTeacher, FaClipboardList, FaInfoCircle } from 'react-icons/fa';
import axios from "axios";

const PurchasePage = () => {
  const { id_course } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100; // Adjust based on your header height
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    scrollToSection(tab);
  };

  const extractYoutubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/api/pengguna/courses/willpay/${id_course}`);
        setCourse(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id_course]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
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

  const getToken = () => {
    const match = document.cookie.match(/(^|;)\s*token\s*=\s*([^;]+)/);
    return match ? match[2] : null;
  };

  const handlePayment = () => {
    const token = getToken();

    fetch(`/api/pengguna/transactions/pay-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id_course }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.redirect_url;
      })
      .catch((error) => console.error(error));
  };

  const handleJoinCourse = () => {
    const token = getToken();

    fetch(`/api/pengguna/transactions/join-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ id_course }), 
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the details page instead of Midtrans Snap
        window.location.href = `/pengguna/kursus/${id_course}`;
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen mt-12 p-8">
      <div className="max-w-7xl mx-auto mt-10 bg-gray-200 shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center p-8 relative">
          <h1 className="text-5xl font-extrabold">{course.course_title}</h1>
          <p className="text-xl mt-2 opacity-90">Diajarkan oleh: {course.user.name}</p>
        </div>

        {course ? (
          <div className="p-8 md:flex gap-8">
            {/* Video Kelas */}
            <div className="md:w-2/3 mb-8 md:mb-0 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              {course.trailer_video_youtube ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYoutubeVideoId(course.trailer_video_youtube)}`}
                  title={course.course_title}
                  className="w-full h-[400px] rounded-lg shadow-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-300 rounded-lg">
                  <p className="text-gray-600">Tidak ada trailer tersedia.</p>
                </div>
              )}
            </div>

            {/* Kartu Informasi */}
            <div className="md:w-1/3 bg-gradient-to-b from-gray-400 to-white p-6 rounded-lg shadow-xl flex flex-col justify-between">
              <h2 className="text-4xl font-bold text-blue-600 mb-4">{course.course_title}</h2>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-600" /> {course.user.name}
              </h3>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              <p className="text-3xl font-semibold text-green-600"><strong>Harga:</strong> {course.paid === false 
                ? "Gratis" 
                : course.price 
                  ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(course.price)
                  : ""}</p>
              <button
                onClick={() => scrollToSection("pricing")}
                className="bg-blue-500 text-white py-3 mt-6 w-full rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105"
              >
                Gabung Kelas
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-red-500 text-2xl">Kursus tidak ditemukan.</p>
          </div>
        )}
      </div>

      {/* Bagian Tabs */}
      {course && (
        <div className="max-w-7xl mx-auto mt-16">
          <div className="text-center">
            <ul className="flex justify-center items-center space-x-4 mb-8 overflow-x-auto">
              <li>
                <button 
                  onClick={() => handleTabClick("about")} 
                  className={`text-gray-700 px-4 py-2 font-semibold transition transform hover:scale-105 ${activeTab === "about" ? "border-b-4 border-blue-600" : ""}`}>
                  <FaInfoCircle className="inline-block mr-1" /> About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabClick("modules")} 
                  className={`text-gray-700 px-4 py-2 font-semibold transition transform hover:scale-105 ${activeTab === "modules" ? "border-b-4 border-blue-600" : ""}`}>
                  <FaClipboardList className="inline-block mr-1" /> Modul
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabClick("reviews")} 
                  className={`text-gray-700 px-4 py-2 font-semibold transition transform hover:scale-105 ${activeTab === "reviews" ? "border-b-4 border-blue-600" : ""}`}>
                  <FaStar className="inline-block mr-1" /> Reviews
                </button>
              </li>
            </ul>

            {/* Bagian Konten */}
            <div className="text-center">
              <div id="about" className="mb-16 opacity-90 transition-opacity duration-500">
                <h4 className="text-2xl font-semibold text-gray-800">Tentang Kursus</h4>
                <p className="text-lg text-gray-600 mb-4">{course.course_description}</p>
                <p className="text-lg text-gray-600 mb-4">{course.benefit}</p>
              </div>

              <div id="modules" className="mb-16 opacity-90 transition-opacity duration-500">
                <h4 className="text-2xl font-semibold text-gray-800">Daftar Modul</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {course.modules && course.modules.map((module, index) => (
                    <div key={index} className="col-lg-6 col-12 item-kp">
                      <div className="icon-box">
                        <img
                          src="https://buildwithangga.com/themes/front/images/ic_check_blue.svg"
                          className="icon"
                          alt="icon_check"
                        />
                        <p className="value text-lg">{module.header}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="reviews" className="mb-16 opacity-90 transition-opacity duration-500">
                <h4 className="text-2xl font-semibold text-gray-800">Ulasan</h4>
                <div className="flex flex-col space-y-4">
                  {course.reviews && course.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-200 border p-4 rounded-lg shadow-sm transform transition hover:scale-105">
                      <h5 className="font-semibold text-xl">{review.name}</h5>
                      <p className="text-yellow-500 text-lg">Rating: {review.rating} ⭐</p>
                      <p className="text-gray-600 text-lg">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {course && (
        <div id="pricing" className="flex justify-center items-center mt-12">
          <div className="bg-gray-200 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-center">
              <img
                src="https://buildwithangga.com/themes/front/images/ic_review.svg"
                className="w-16 h-16"
                alt="icon_check"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mt-4">Selamanya</h2>
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mt-2">{course.price}</h2>
            <button className="bg-blue-500 text-white py-3 mt-6 w-full rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105"
              onClick={() => (course.paid ? handlePayment() : handleJoinCourse())}>
              {course.paid ? "Bayar Sekarang" : "Gabung Kelas"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasePage;
