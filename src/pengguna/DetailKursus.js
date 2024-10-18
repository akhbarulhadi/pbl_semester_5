  import React, { useState } from 'react';
  import { useParams } from 'react-router-dom';

  const SidebarDetailKursus = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const { id } = useParams();

    const kursusData = [
      {
        id: 1,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ];

    const kursus = kursusData.find((k) => k.id === parseInt(id));

    return (
      <section className="relative mt-20 w-full min-h-screen h-full">
        <div className="flex h-screen mt-24">
          {/* Sidebar */}
          <div className="w-64 bg-gray-200 fixed shadow-lg transition-colors duration-300 rounded-lg">
            <div className="p-4 flex items-center justify-between border-b border-gray-300">
              <h2 className="text-gray-800 font-semibold text-xl">Persiapan Kelas</h2>
            </div>

            <div className="p-4">
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition duration-300 ${isAccordionOpen ? 'bg-gray-300' : ''}`}
                      onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                      aria-expanded={isAccordionOpen}
                    >
                      <h6 className="text-lg font-semibold">Trailer Kelas</h6>
                      <span className={`transform transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </h2>
                  <div className={`accordion-body ${isAccordionOpen ? 'block' : 'hidden'}`}>
                    <button
                      onClick={() => {}}
                      className="block p-3 text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      Lihat Trailer Kelas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Konten Detail Kursus */}
          <div className="ml-64 p-6 flex-grow">
          {kursus ? (
          <div className="shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <p className="text-gray-600 mb-4">{kursus.deskripsi}</p>
            <iframe
              src={kursus.videoUrl}
              title={kursus.judul}
              className="w-full h-96 rounded-xl mb-6 shadow-lg" // Menggunakan kelas kustom
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
   
   
        ) : (
          <p className="text-red-500 text-lg font-semibold">Kursus tidak ditemukan.</p>
        )}
      </div>
        </div>
      </section>
    );
  };

  export default SidebarDetailKursus;
