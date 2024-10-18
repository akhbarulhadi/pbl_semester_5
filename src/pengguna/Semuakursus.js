import React from 'react';
import { Link } from 'react-router-dom'; // Pastikan untuk mengimpor Link

const SemuaKursus = () => {
  // Data kursus untuk demonstrasi
  const courseData = [
    {
      id: 1,
      title: "Kursus Dasar React",
      description: "Pelajari cara membuat aplikasi web interaktif menggunakan React.",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+React",
      author: "John Doe", // Tambahkan author jika diperlukan
      readTime: "2 jam" // Tambahkan readTime jika diperlukan
    },
    {
      id: 2,
      title: "Kursus Web Development",
      description: "Pelajari cara membuat situs web yang responsif dan menarik.",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+Web+Development",
      author: "Jane Smith",
      readTime: "3 jam"
    },
    {
      id: 3,
      title: "Kursus Data Science",
      description: "Pelajari analisis data dan machine learning untuk pemula.",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+Data+Science",
      author: "Michael Brown",
      readTime: "4 jam"
    },
    {
      id: 4,
      title: "Kursus Desain Grafis",
      description: "Menguasai alat dan teknik desain grafis modern.",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+Desain+Grafis",
      author: "Emily Davis",
      readTime: "5 jam"
    },
    {
      id: 5,
      title: "Kursus Mobile App Development",
      description: "Pelajari cara membuat aplikasi mobile untuk iOS dan Android.",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+Mobile+App+Development",
      author: "William Johnson",
      readTime: "6 jam"
    },
    {
      id: 6,
      title: "Kursus Digital Marketing",
      description: "Strategi dan teknik untuk pemasaran online yang efektif.",
      imageSrc: "https://via.placeholder.com/600x400?text=Kursus+Digital+Marketing",
      author: "Olivia Lee",
      readTime: "4 jam"
    },
  ];

  const filteredCardData = courseData; // Definisikan filteredCardData jika diperlukan

  return (
    <div className="flex">
      {/* Konten Utama */}
        <div className="w-full px-4 py-16 md:px-8 md:py-20 mt-8">
          <div className="mb-12">
            <p className="text-2xl font-bold font-poppins text-[#6ee7b7]">#Belajar dari ahlinya</p>
            <h1 className="text-5xl font-bold font-poppins text-[#030712] mb-4">Modul Pelatihan</h1>
            <p className="text-xl text-[#3f3f46] font-poppins">
              Temukan berbagai modul pelatihan yang dirancang untuk <br />meningkatkan keterampilan Anda di berbagai bidang.
              Jelajahi koleksi kami <br /> dan pilih yang paling sesuai dengan kebutuhan Anda.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <main className="flex-1">
              <div className="mx-auto grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCardData.map((card, index) => (
                  <Link to={`/pengguna/Pembelian/${card.id}`} key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <img src={card.imageSrc} alt={card.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                    <p className="text-gray-700 mb-4">{card.description}</p>
                    <p className="text-gray-500 mb-2">{card.author}</p>
                    <p className="text-gray-500 mb-4">{card.readTime}</p>
                  </Link>
                ))}
              </div>
            </main>
          </div>

        </div>
    </div>
  );
};

export default SemuaKursus;
