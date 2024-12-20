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
    <div className="container mx-auto px-4 py-6">
      {/* Courses List */}
      <div className="mt-8">
        {/* Ubah grid ke 4 kolom */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <li
              key={course.id_course}
              className="shadow-lg border overflow-hidden flex flex-col relative"
              style={{
                width: '271.98px',
                height: '285.38px',
                borderRadius: '0px 0px 22px 22px',
                gap: '0px',
                opacity: 1,
              }}
            >
              <img
                src={course.image_url ? `/api/${course.image_url}` : 'https://via.placeholder.com/400x200'}
                alt={course.course_title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col bg-white">
                <Link to={`/pengguna/kursus/${course.id_course}`} className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors flex items-center mb-2">
                    <FaBookOpen className="mr-2 text-blue-500" />
                    {course.course_title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {course.course_description}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      course.online ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {course.online ? 'Online' : 'Offline'}
                  </p>
                </Link>
                {course.online && (
                  <div className="mt-4">
                    <div className="relative bg-gray-200 rounded-full h-2">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {course.progress || 0}% selesai
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KursusSaya;
