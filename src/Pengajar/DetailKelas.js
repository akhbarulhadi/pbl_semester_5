import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailKelas = () => {
  const { id_course } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/api/pengajar/courses/${id_course}`);
        setCourse(response.data);
        console.log(response.data); // Cek data yang diterima
      } catch (err) {
        setError(
          err.response?.data?.error || "Terjadi kesalahan saat mengambil data"
        );
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

  // Ambil data modul dari respons API
  const modules = course.modules; // Gunakan data modul yang diambil dari API

  const extractYoutubeVideoId = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleModuleClick = (videoLink) => {
    const videoId = extractYoutubeVideoId(videoLink);
    const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      {/* Kartu Detail Kelas */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          {extractYoutubeVideoId(course.course.trailer_video_youtube) ? (
            <iframe
              className="rounded-lg shadow-lg"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${extractYoutubeVideoId(course.course.trailer_video_youtube)}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-red-500 text-center">Video tidak tersedia</p>
          )}
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {course.course_title}
          </h5>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Harga:</strong> {course.course.paid === false 
                ? "Gratis" 
                : course.course.price 
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(course.course.price)
                : ""}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Status Kelas:</strong> {course.course.status_course}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Tipe Kelas:</strong> {course.course.online ? "Online" : "Offline"}
          </p>
          {selectedVideo && (
            <div className="flex justify-center mb-4">
              <iframe
                className="rounded-lg shadow-lg"
                width="100%"
                height="315"
                src={selectedVideo}
                title="Video Modul"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <h3 className="text-xl font-semibold mb-4">Daftar Modul</h3>
          <ul className="list-disc pl-5 mb-4">
            {modules.map((module) => (
              <li key={module.id_modules} className="mb-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleModuleClick(module.link_video_youtube)}
                >
                  {module.header}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Informasi Dibuat dan Terakhir Diperbarui */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <p className="text-medium font-medium text-green-600">
          Dibuat pada: {new Date(course.course.created_at).toLocaleDateString()}
        </p>
        {course.course.updated_at ? (
          <p className="text-medium font-medium text-blue-600">
            Terakhir diperbarui: {new Date(course.course.updated_at).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-medium text-gray-500">Belum ada pembaruan.</p>
        )}
      </div>
    </div>
  );
};

export default DetailKelas;
