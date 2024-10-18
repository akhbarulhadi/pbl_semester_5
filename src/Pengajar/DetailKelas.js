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

  const modules = [
    {
      id: 1,
      title: "Modul 1: Pengenalan",
      videoLink:
        "https://www.youtube.com/embed/KJ23NK7O2yk?si=nfKX1hPbDRscALb_",
    },
    {
      id: 2,
      title: "Modul 2: Konsep Dasar",
      videoLink: "https://www.youtube.com/embed/EXAMPLE2",
    },
    {
      id: 3,
      title: "Modul 3: Praktik",
      videoLink: "https://www.youtube.com/embed/EXAMPLE3",
    },
  ];

  const handleModuleClick = (videoLink) => {
    setSelectedVideo(videoLink);
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      {/* Kartu Detail Kelas */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
              <iframe
                className="rounded-lg shadow-lg"
                width="100%"
                height="315"
                src=  "https://www.youtube.com/embed/KJ23NK7O2yk?si=nfKX1hPbDRscALb_"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {course.course_title}
          </h5>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Harga:</strong> Rp {course.price ? course.price.toLocaleString() : "Gratis"}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Status Kelas:</strong> {course.status_course}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Tipe Kelas:</strong> {course.online ? "Online" : "Offline"}
          </p>
          {selectedVideo && (
            <div className="flex justify-center mb-4">
              <iframe
                className="rounded-lg shadow-lg"
                width="100%"
                height="315"
                src={selectedVideo}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <h3 className="text-xl font-semibold mb-4">Daftar Modul</h3>
          <ul className="list-disc pl-5 mb-4">
            {modules.map((module) => (
              <li key={module.id} className="mb-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleModuleClick(module.videoLink)}
                >
                  {module.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Informasi Dibuat dan Terakhir Diperbarui */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <p className="text-medium font-medium text-green-600">
          Dibuat pada: {new Date(course.created_at).toLocaleDateString()}
        </p>
        {course.updated_at ? (
  <p className="text-medium font-medium text-blue-600">
    Terakhir diperbarui: {new Date(course.updated_at).toLocaleDateString()}
  </p>
) : (
  <p className="text-medium text-gray-500">Belum ada pembaruan.</p>
)}

      </div>
    </div>
  );
};

export default DetailKelas;
