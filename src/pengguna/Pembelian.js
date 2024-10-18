import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaStar, FaChalkboardTeacher, FaClipboardList, FaInfoCircle } from 'react-icons/fa';

const PurchasePage = () => {
  const { id } = useParams();

  // Data kursus untuk demonstrasi
  const courseData = [
    {
      id: 1,
      title: "Kursus Dasar React",
      author: "John Doe",
      description: "Pelajari cara membuat aplikasi web interaktif menggunakan React.",
      price: "Rp 320.000",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+React",
      modules: [
        "Pengenalan React",
        "Komponen dan Props",
        "State dan Lifecycle",
        "Routing dengan React Router",
        "Pengelolaan State dengan Redux"
      ],
      reviews: [
        { name: "Budi", rating: 5, comment: "Materi sangat jelas dan mudah dipahami!" },
        { name: "Siti", rating: 4, comment: "Pengalaman belajar yang menyenangkan." },
        { name: "Andi", rating: 5, comment: "Sangat membantu untuk memahami React." }
      ]
    },
    {
      id: 2,
      title: "Kursus Dasar React",
      author: "John Doe",
      description: "Pelajari cara membuat aplikasi web interaktif menggunakan React.",
      price: "Rp 320.000",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+React",
      modules: [
        "Pengenalan React",
        "Komponen dan Props",
        "State dan Lifecycle",
        "Routing dengan React Router",
        "Pengelolaan State dengan Redux"
      ],
      reviews: [
        { name: "Budi", rating: 5, comment: "Materi sangat jelas dan mudah dipahami!" },
        { name: "Siti", rating: 4, comment: "Pengalaman belajar yang menyenangkan." },
        { name: "Andi", rating: 5, comment: "Sangat membantu untuk memahami React." }
      ]
    },
    {
      id: 3,
      title: "Kursus Dasar React",
      author: "John Doe",
      description: "Pelajari cara membuat aplikasi web interaktif menggunakan React.",
      price: "Rp 320.000",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+React",
      modules: [
        "Pengenalan React",
        "Komponen dan Props",
        "State dan Lifecycle",
        "Routing dengan React Router",
        "Pengelolaan State dengan Redux"
      ],
      reviews: [
        { name: "Budi", rating: 5, comment: "Materi sangat jelas dan mudah dipahami!" },
        { name: "Siti", rating: 4, comment: "Pengalaman belajar yang menyenangkan." },
        { name: "Andi", rating: 5, comment: "Sangat membantu untuk memahami React." }
      ]
    },
    {
      id: 4,
      title: "Kursus Dasar React",
      author: "John Doe",
      description: "Pelajari cara membuat aplikasi web interaktif menggunakan React.",
      price: "Rp 320.000",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+React",
      modules: [
        "Pengenalan React",
        "Komponen dan Props",
        "State dan Lifecycle",
        "Routing dengan React Router",
        "Pengelolaan State dengan Redux"
      ],
      reviews: [
        { name: "Budi", rating: 5, comment: "Materi sangat jelas dan mudah dipahami!" },
        { name: "Siti", rating: 4, comment: "Pengalaman belajar yang menyenangkan." },
        { name: "Andi", rating: 5, comment: "Sangat membantu untuk memahami React." }
      ]
    },
    {
      id: 5,
      title: "Kursus Dasar React",
      author: "John Doe",
      description: "Pelajari cara membuat aplikasi web interaktif menggunakan React.",
      price: "Rp 320.000",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+React",
      modules: [
        "Pengenalan React",
        "Komponen dan Props",
        "State dan Lifecycle",
        "Routing dengan React Router",
        "Pengelolaan State dengan Redux"
      ],
      reviews: [
        { name: "Budi", rating: 5, comment: "Materi sangat jelas dan mudah dipahami!" },
        { name: "Siti", rating: 4, comment: "Pengalaman belajar yang menyenangkan." },
        { name: "Andi", rating: 5, comment: "Sangat membantu untuk memahami React." }
      ]
    },
    {
      id: 6,
      title: "Kursus mendekati anak sma 4",
      author: "Tiyo",
      description: "Pelajari cara membuat aplikasi web interaktif menggunakan React.",
      price: "Rp 50.000.000",
      videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+React",
      modules: [
        "Pengenalan React",
        "Komponen dan Props",
        "State dan Lifecycle",
        "Routing dengan React Router",
        "Pengelolaan State dengan Redux"
      ],
      reviews: [
        { name: "Budi", rating: 5, comment: "Materi sangat jelas dan mudah dipahami!" },
        { name: "Siti", rating: 4, comment: "Pengalaman belajar yang menyenangkan." },
        { name: "Andi", rating: 5, comment: "Sangat membantu untuk memahami React." }
      ]
    },
    // Data kursus lainnya...
  ];

  const course = courseData.find((c) => c.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("about");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100; // Sesuaikan dengan tinggi header
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

 
  

  return (
    <div className="min-h-screen mt-12 p-8">
      <div className="max-w-7xl mx-auto mt-10 bg-gray-200 shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center p-8 relative">
          <h1 className="text-5xl font-extrabold">{course ? `Kelas ${course.title}` : "Kelas Tidak Ditemukan"}</h1>
          <p className="text-xl mt-2 opacity-90">{course ? `Diajarkan oleh: ${course.author}` : "Informasi kelas tidak tersedia"}</p>
        </div>

        {course ? (
          <div className="p-8 md:flex gap-8">
            {/* Video Kelas */}
            <div className="md:w-2/3 mb-8 md:mb-0 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <iframe
                src={course.videoSrc}
                title={course.title}
                className="w-full h-[400px] rounded-lg shadow-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Kartu Informasi */}
            <div className="md:w-1/3 bg-gradient-to-b from-gray-400 to-white p-6 rounded-lg shadow-xl flex flex-col justify-between">
              <h2 className="text-4xl font-bold text-blue-600 mb-4">{course.title}</h2>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-600" /> {course.author}
              </h3>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              <p className="text-3xl font-semibold text-green-600"><strong>Harga:</strong> {course.price}</p>
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
                <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              </div>

              <div id="modules" className="mb-16 opacity-90 transition-opacity duration-500">
                <h4 className="text-2xl font-semibold text-gray-800">Daftar Modul</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {course.modules.map((module, index) => (
                    <div key={index} className="col-lg-6 col-12 item-kp">
                      <div className="icon-box">
                        <img
                          src="https://buildwithangga.com/themes/front/images/ic_check_blue.svg"
                          className="icon"
                          alt="icon_check"
                        />
                        <p className="value text-lg">{module}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="reviews" className="mb-16 opacity-90 transition-opacity duration-500">
                <h4 className="text-2xl font-semibold text-gray-800">Ulasan</h4>
                <div className="flex flex-col space-y-4">
                  {course.reviews.map((review, index) => (
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
      <Link
        to={`/pengguna/detailpembelian/${course.id}`} // Ubah navigasi ke link
        state={{ course }} // Kirim state kursus
        className="bg-blue-600 text-white mt-4 py-3 w-full rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 text-center block"
      >
        Gabung Kelas
      </Link>
    </div>
  </div>
)}

    </div>
  );
};

export default PurchasePage;
