import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SidebarDetailKursus = () => {
  const { id_course } = useParams();
  const [kursusData, setKursusData] = useState(null);
  const [activeVideo, setActiveVideo] = useState({ url: null, header: '' });
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [updatedModules, setUpdatedModules] = useState([]);
  const [hasCompletedCourse, setHasCompletedCourse] = useState(false); // state to track completion

  const extractYoutubeVideoId = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchKursusData = async () => {
      try {
        const response = await fetch(`/api/pengguna/courses/${id_course}`);
        const data = await response.json();
        setKursusData(data);
        setUpdatedModules(data.modules);

        // Check if course is completed
        const token = document.cookie.match(/token=([^;]*)/)?.[1];
        const completionResponse = await fetch(`/api/user/courses/${id_course}/completion`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const completionData = await completionResponse.json();
        setHasCompletedCourse(completionData.has_completed);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchKursusData();
  }, [id_course]);

  const handleModuleClick = async (module) => {
    const videoId = extractYoutubeVideoId(module.link_video_youtube);
    const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    setActiveVideo(activeVideo.url === videoUrl ? { url: null, header: '' } : { url: videoUrl, header: module.header });

    const token = document.cookie.match(/token=([^;]*)/)?.[1];

    try {
      const response = await fetch(`/api/pengguna/courses/${id_course}/open-module/${module.id_modules}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message);

        const updatedResponse = await fetch(`/api/pengguna/courses/${id_course}`);
        const updatedData = await updatedResponse.json();
        setUpdatedModules(updatedData.modules);
      }
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <div className="bg-gray-50 mt-9 min-h-screen font-poppins">
      {kursusData ? (
        <div className="">
          {/* Bagian Atas: Informasi Kursus */}
          <div className="">
          <section className="relative w-full px-4 py-16 md:px-8 md:py-20 bg-[#E6EFDF]">
            <div className="flex items-start">
              <img
                src={`/api/${kursusData.image_url}`}
                alt={kursusData.course_title}
                className="w-90 h-64 object-cover rounded-lg mr-8"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{kursusData.course_title}</h1>
                <p className="text-gray-600 mb-6">{kursusData.course_description}</p>
                <div className="flex items-center justify-between">
                  {/* Jumlah Peserta */}
                  <p className="text-gray-700">
                    <span className="font-semibold">Peserta:</span>{' '}
                    {Array.isArray(kursusData.joined_users) ? kursusData.joined_users.length : 0} orang
                  </p>
                  {/* Tanggal Mulai */}
                  <p className="text-gray-700">
                    <span className="font-semibold">Tanggal Mulai:</span>{' '}
                    {kursusData.start_date
                      ? new Date(kursusData.start_date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'Belum tersedia'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Forum Diskusi */}
            <button
              onClick={() => window.location.href = '/forum-diskusi'}
              className="absolute bottom-4 right-4 bg-[#84D68E] text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Forum Diskusi
            </button>
          </section>
        </div>         

          {/* Bagian Konten: Video dan Tahapan */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {/* Sidebar Modul */}
            <div className="lg:col-span-1 bg-white shadow-lg rounded-lg p-6 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tahapan Latihan</h2>
              <div>
                <button
                  onClick={() => {
                    const videoId = extractYoutubeVideoId(kursusData.trailer_video_youtube);
                    const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
                    setActiveVideo({ url: videoUrl, header: 'Trailer Kelas' });
                  }}
                  className="w-full text-left py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 mb-3"
                >
                  Trailer Kelas
                </button>
                {updatedModules.map((module, index) => (
                  <button
                    key={module.id_modules}
                    onClick={() => handleModuleClick(module)}
                    className={`w-full text-left py-3 px-4 rounded-lg ${
                      module.isOpened ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
                    } mb-3`}
                    disabled={index > 0 && !updatedModules[index - 1].isOpened}
                  >
                    {module.header}
                  </button>
                ))}
              </div>
            </div>

            {/* Konten Video */}
            <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
              {activeVideo.url ? (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeVideo.header}</h3>
                  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={activeVideo.url}
                      title="Video Player"
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-lg">Pilih modul untuk mulai belajar.</p>
              )}
            </div>
          </div>

          {/* Tombol Sertifikat */}
          <div className="mt-6 text-center">
            {hasCompletedCourse ? (
              <a
                href={`/api/pengguna/courses/${id_course}/certificate`}
                className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Lihat Sertifikat
              </a>
            ) : (
              <>
                <a
                  href="#"
                  className="py-3 px-6 bg-gray-400 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
                >
                  Selesaikan Pelatihan untuk Mendapatkan Sertifikat
                </a>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 text-xl font-bold py-20">Kursus tidak ditemukan.</p>
      )}
    </div>
  );
};

export default SidebarDetailKursus;
