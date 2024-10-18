import React, { useState } from 'react';
import Card from '../components/Card';

const ModulPelatihan = () => {
  const [activeFilter, setActiveFilter] = useState({
    category: null,
    sort: null,
    level: null,
    type: null,
  });

  // Data kartu yang diperbarui dengan properti videoSrc
  const cardData = [
    {
      href: "https://example.com/1",
      imageSrc: "https://via.placeholder.com/600x400",
      videoSrc: null,
      category: "Category 1",
      title: "Judul 1",
      author: "Penulis 1",
      readTime: "5 menit",
      level: "pemula",
    },
    {
      href: "https://example.com/2",
      imageSrc: "https://via.placeholder.com/600x400",
      videoSrc: "https://www.youtube.com/embed/Xob0RRBGVOg?si=XrLB0BAFXdnC1yd2",
      category: "Category 2",
      title: "Judul 2",
      author: "Penulis 2",
      readTime: "6 menit",
      level: "menengah",
    },
    {
      href: "https://example.com/3",
      imageSrc: "https://via.placeholder.com/600x400",
      videoSrc: null,
      category: "Category 3",
      title: "Judul 3",
      author: "Penulis 3",
      readTime: "4 menit",
      level: "pemula",
    },
    // Tambahkan data kartu lainnya
  ];

  const categoryLabels = {
    "Category 1": "Teknologi",
    "Category 2": "Bisnis",
    "Category 3": "Desain",
    "Category 4": "Pengembangan",
    "Category 5": "Manajemen",
  };

  const handleCheckboxChange = (type, value) => {
    setActiveFilter(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const filteredCardData = cardData.filter(card => 
    (activeFilter.category === null || card.category === activeFilter.category) &&
    (activeFilter.level === null || card.level === activeFilter.level || card.level === 'semua_level')
  );

  return (
    <section className="relative mt-8 w-full">
      <div className="w-full px-4 py-16 md:px-8 md:py-20">
        {/* Teks di atas */}
        <div className="mb-12">
          <p className="text-2xl font-bold font-poppins text-[#6ee7b7]">#Belajar dari ahlinya</p>
          <h1 className="text-5xl font-bold font-poppins text-[#030712] mb-4">Modul Pelatihan</h1>
          <p className="text-xl text-[#3f3f46] font-poppins">
            Temukan berbagai modul pelatihan yang dirancang untuk <br />meningkatkan keterampilan Anda di berbagai bidang.
            Jelajahi koleksi kami <br /> dan pilih yang paling sesuai dengan kebutuhan Anda.
          </p>
        </div>

        {/* Container untuk Formulir Filter dan Kartu */}
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* Formulir Filter */}
          <aside className="flex-shrink-0 w-full md:w-1/5 bg-[#f0f9ff] p-4 rounded-lg">
            <form action="" method="get" id="filter-class" name="filter-class">
              {/* Opsi Level */}
              <div className="item-filter flex flex-col mb-6">
                <h3 className="head text-4xl font-bold font-poppins mb-4">Level</h3>
                {['pemula', 'menengah', 'semua_level'].map(option => (
                  <div className="child flex items-center mb-4" key={option}>
                    {/* Sembunyikan checkbox default */}
                    <input
                      type="checkbox"
                      name="level[]"
                      value={option}
                      id={`le${option.charAt(0).toUpperCase() + option.slice(1)}`}
                      checked={activeFilter.level === option}
                      onChange={() => handleCheckboxChange('level', option)}
                      className="hidden"
                    />
                    {/* Checkbox kustom */}
                    <div
                      className={`w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-md ${activeFilter.level === option ? 'bg-blue-500' : 'bg-white'} mr-3`}
                      onClick={() => handleCheckboxChange('level', option)}
                    >
                      {activeFilter.level === option && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <label htmlFor={`le${option.charAt(0).toUpperCase() + option.slice(1)}`} className="text-xl capitalize">
                      {option.charAt(0).toUpperCase() + option.slice(1).replace(/_/g, ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </aside>

          {/* Kartu */}
          <main className="flex-1">
            <div className="mx-auto grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCardData.map((card, index) => (
                <Card
                  key={index}
                  href={card.href}
                  imageSrc={card.imageSrc}
                  category={categoryLabels[card.category] || card.category}
                  title={card.title}
                  author={card.author}
                  readTime={card.readTime}
                  videoSrc={card.videoSrc}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ModulPelatihan;
