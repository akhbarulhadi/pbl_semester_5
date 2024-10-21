import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SidebarDetailKursus = () => {
  const [kursusData, setKursusData] = useState(null);
  const [activeVideo, setActiveVideo] = useState({ url: null, header: '' });
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const { id_course } = useParams();
  const [updatedModules, setUpdatedModules] = useState([]);

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

        // Fetch updated module data after opening a module
        const updatedResponse = await fetch(`/api/pengguna/courses/${id_course}`);
        const updatedData = await updatedResponse.json();
        setUpdatedModules(updatedData.modules);
      }
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <section className="relative mt-20 w-full min-h-screen h-full">
      <div className="flex h-screen mt-24">
        <div className="w-64 bg-gray-200 fixed shadow-lg transition-colors duration-300 rounded-lg">
          <div className="p-4 flex items-center justify-between border-b border-gray-300">
            <h2 className="text-gray-800 font-semibold text-xl">Modul Pelatihan</h2>
          </div>

          <div className="p-4">
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition duration-300`}
                    onClick={() => {
                      const videoId = extractYoutubeVideoId(kursusData?.trailer_video_youtube);
                      const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
                      setActiveVideo({ url: videoUrl, header: 'Trailer Kelas' });
                    }}
                    aria-expanded={activeVideo.url === `https://www.youtube.com/embed/${extractYoutubeVideoId(kursusData?.trailer_video_youtube)}`}
                  >
                    <h6 className="text-lg font-semibold">Trailer Kelas</h6>
                    <span className={`transform transition-transform duration-300 ${activeVideo.url === `https://www.youtube.com/embed/${extractYoutubeVideoId(kursusData?.trailer_video_youtube)}` ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                </h2>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition duration-300`}
                    onClick={() => setIsModulesOpen(!isModulesOpen)}
                    aria-expanded={isModulesOpen}
                  >
                    <h6 className="text-lg font-semibold">Daftar Modul Video</h6>
                    <span className={`transform transition-transform duration-300 ${isModulesOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                </h2>

                {isModulesOpen && (
                  <div className="pl-4">
                    {updatedModules && updatedModules.map((module, index) => (
                      <button
                        key={module.id_modules}
                        className={`w-full text-left p-2 rounded-lg flex justify-between items-center transition duration-300 hover:bg-gray-300`}
                        onClick={() => handleModuleClick(module)}
                        style={{
                          cursor: index === 0 || updatedModules[index - 1].isOpened ? 'pointer' : 'not-allowed',
                          marginBottom: '10px',
                          color: module.isOpened ? 'green' : (index === 0 || updatedModules[index - 1].isOpened ? 'gray' : 'red'),
                        }}
                        disabled={index > 0 && !updatedModules[index - 1].isOpened}
                      >
                        <h6 className="text-lg font-semibold">{module.header}</h6>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ml-64 p-6 flex-grow">
          {kursusData ? (
            <>
              <h3 className="text-gray-800 font-semibold text-2xl mb-2">{kursusData.course_title}</h3>
              <p className="text-gray-600 mb-4">{kursusData.course_description}</p>
              <div className="shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <h3 className="text-gray-800 font-semibold text-2xl mb-2">{activeVideo.header}</h3>
                {activeVideo.url && (
                  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={activeVideo.url}
                      title="Video Kelas"
                      className="absolute top-0 left-0 w-full h-full rounded-xl mb-6 shadow-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-red-500 text-lg font-semibold">Kursus tidak ditemukan.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SidebarDetailKursus;
