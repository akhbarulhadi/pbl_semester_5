import React, { useState } from 'react';
import Card from '../components/Card';
import Navbar from './NavbarU'; // Pastikan import navbar sesuai dengan nama file yang benar


const SemuaKursus = () => {
  const [activeFilter, setActiveFilter] = useState({
    category: null,
    sort: null,
    type: null,
  });

  const cardData = [
    {
      id: 1, // Tambahkan ID
      href: "https://example.com/1",
      imageSrc: "https://via.placeholder.com/600x400",
      videoSrc: null,
      category: "Category 1",
      title: "Judul 1",
      author: "Penulis 1",
      readTime: "5 menit",
    },
    {
      id: 2, // Tambahkan ID
      href: "https://example.com/2",
      imageSrc: "https://via.placeholder.com/600x400",
      videoSrc: "https://www.youtube.com/embed/Xob0RRBGVOg?si=XrLB0BAFXdnC1yd2",
      category: "Category 2",
      title: "Judul 2",
      author: "Penulis 2",
      readTime: "6 menit",
    },
    // Tambahkan ID pada objek lainnya
    {
      id: 3,
      href: "https://example.com/3",
      imageSrc: "https://via.placeholder.com/600x400",
      videoSrc: null,
      category: "Category 3",
      title: "Judul 3",
      author: "Penulis 3",
      readTime: "4 menit",
    },
    // ... Lanjutkan untuk semua objek di cardData
  ];

  const categoryLabels = {
    "Category 1": "Teknologi",
    "Category 2": "Bisnis",
    "Category 3": "Desain",
    "Category 4": "Pengembangan Pribadi",
  };

  const handleCheckboxChange = (type, value) => {
    setActiveFilter(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  const filteredCardData = cardData.filter(card => 
    (activeFilter.category === null || card.category === activeFilter.category)
  );

  return (
    <div className="flex">
      {/* Konten Utama */}
      <section className="relative mt-20 bg-gradient-to-r from-purple-100 to-blue-200 w-full min-h-screen">
      <div className="w-full px-4 py-16 md:px-8 md:py-20">
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
                    <Card
                      key={index}
                      href={`/dashboard/pengguna/kursus/${card.id}`} // Ganti href dengan ID kursus
                      imageSrc={card.imageSrc}
                      category={categoryLabels[card.category] || card.category}
                      title={card.title}
                      author={card.author}
                      readTime={card.readTime}
                      videoSrc={card.videoSrc}
                      className="transition-transform transform hover:scale-105"
                    />
                  ))}
                </div>
              </main>
            </div>
          </div>
        </section>
    </div>
  );
};

export default SemuaKursus;
