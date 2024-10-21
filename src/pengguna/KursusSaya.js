import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';

const KursusSaya = () => {
  const [courses, setCourses] = useState([]); // State to hold courses
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch joined courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await fetch('/api/pengguna/courses', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          // If token expired, refresh token
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshResponse.ok) {
            // Retry fetching courses after refreshing the token
            response = await fetch('/api/pengguna/courses', {
              method: 'GET',
              credentials: 'include',
            });
          } else {
            throw new Error('Refresh token failed');
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on the search term
  const filteredCourses = courses.filter(course =>
    course.course_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-3">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#030712] mb-2">Kursus Saya</h1>
          <p className="text-lg text-[#3f3f46]">
            Upgrade terus ilmu dan pengalaman <br />
            terbaru kamu di bidang teknologi
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari kursus..."
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Courses List */}
        <div className="mt-8 mx-auto p-2">
          {filteredCourses.length > 0 ? (
            <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map(course => (
                <li key={course.id_course} className="bg-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <img src={course.image || 'https://via.placeholder.com/400x200'} alt={course.course_title} className="w-full h-32 rounded-lg mb-2 object-cover" />
                  <Link to={`/pengguna/kursus/${course.id_course}`} className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-600 mb-1 flex items-center">
                      <FaBookOpen className="mr-1" />
                      {course.course_title}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm">{course.course_description}</p>
                    <p className="text-gray-600 mb-2 text-sm">{course.online ? "Online" : "Offline"}</p>
                    
                    {/* Hanya tampilkan progress jika kursus online */}
                    {course.online && (
                      <>
                        <div className="relative bg-gray-200 rounded-full h-2 mb-1 overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{course.progress || 0}% selesai</span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Belum ada kursus"
                className="mx-auto mb-2 w-20 h-20 object-cover"
              />
              <p className="text-gray-500 text-lg">Anda belum mengikuti kursus.</p>
            </div>
          )}
        </div>

        {/* Additional Navigation Button */}
        <div className="mt-4 text-center">
          <Link to="/pengguna/semua-kursus">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Lihat Semua Kursus
            </button>
          </Link>
        </div>
      </div>
  );
};

export default KursusSaya;
