import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailKelas = () => {
  const { id_course } = useParams(); // Mengambil ID kursus dari URL
  const [course, setCourse] = useState(null); // State untuk menyimpan data kursus
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Status error

  useEffect(() => {
    // Mengambil data kursus dari backend
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/api/pengajar/courses/${id_course}`); // Ganti dengan URL backend
        setCourse(response.data); // Menyimpan data kursus
      } catch (err) {
        setError(err.response?.data?.error || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id_course]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center mt-8 text-xl text-red-500">{error}</div>;
  if (!course) return <div className="text-center mt-8 text-xl text-red-500">Kelas tidak ditemukan.</div>;

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto">
      {/* Header Title */}
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800">Detail Kelas</h2>

      {/* Nama Kelas */}
      <h1 className="text-3xl font-medium text-gray-900 mb-6">{course.course_title}</h1>

      {/* Informasi Kelas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Deskripsi Kelas:</strong> {course.course_description}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Harga:</strong> Rp {course.price.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Status Kelas:</strong> {course.status_course}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Tipe Kelas:</strong> {course.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Penyelesaian & Progress Bar */}
      {/* Hanya ditampilkan jika ada status penyelesaian yang relevan */}
      {/* {course.status_course === "Pending" && (
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Progress Kelas</h3>
          <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `50%` }}></div>
          </div>
          <p className="text-medium text-gray-600">50% Selesai</p>
        </div>
      )} */}

      {/* Informasi Lainnya */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-medium font-medium text-green-600">
            Dibuat pada: {new Date(course.created_at).toLocaleDateString()}
          </p>
        </div>
        {course.updated_at && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-medium font-medium text-blue-600">
              Terakhir diperbarui: {new Date(course.updated_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailKelas;
