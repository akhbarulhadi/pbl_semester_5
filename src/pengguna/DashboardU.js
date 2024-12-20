import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await fetch('/api/pengguna/courses/semua-kursus', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshResponse.ok) {
            response = await fetch('/api/pengguna/courses/semua-kursus', {
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

  const groupedClasses = [
    {
      category: 'Iphone',
      classes: courses.filter((course) => course.category === 'Iphone'),
    },
    {
      category: 'Macbook',
      classes: courses.filter((course) => course.category === 'Macbook'),
    },
    {
      category: 'Imac',
      classes: courses.filter((course) => course.category === 'Imac'),
    },
    {
      category: 'Iwatch',
      classes: courses.filter((course) => course.category === 'Iwatch'),
    },
    {
      category: 'Ipad',
      classes: courses.filter((course) => course.category === 'Ipad'),
    },
    {
      category: 'Airpods',
      classes: courses.filter((course) => course.category === 'Airpods'),
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Jelajahi dan <span className="text-[#84D68E]">Tingkat</span> Skill Mu
      </h1>

      {groupedClasses.map((group, index) => (
        <div key={index} className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-18px font-semibold">{group.category}</h2>
            {group.classes.length > 4 && (
              <Link
                to={`/kursus/${group.category}`}
                className="bg-[#84D68E] text-white px-4 py-2 rounded-full"
              >
                Lihat Kursus Lainnya
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {group.classes.slice(0, 4).map((course) => (
              <div
                key={course.id_course}
                className="relative cursor-pointer shadow-lg border rounded-b-[22px] overflow-hidden"
                style={{
                  width: '271.98px',
                  height: '289.18px',
                  borderRadius: '0px 0px 22px 22px',
                }}
                onClick={() =>
                  window.location.href =
                    course.joined_users.length === 0
                      ? `/pengguna/KursusDetail/${course.id_course}`
                      : `/pengguna/kursus/${course.id_course}`
                }
              >
                <img
                  src={`/api/${course.image_url}`}
                  alt={course.course_title}
                  className="w-full h-48 object-cover"
                  style={{ opacity: '1' }}
                />
                <div className="p-4 bg-white">
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontSize: '12px' }}
                  >
                    {course.course_title}
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={{ fontSize: '12px' }}
                  >
                    {course.description}
                  </p>
                  <span
                    className="text-green-500 font-bold"
                    style={{ fontSize: '12px' }}
                  >
                    {course.paid === false
                      ? 'Gratis'
                      : course.joined_users.length === 0
                      ? `Rp ${course.price}`
                      : 'Sudah dibeli'}
                  </span>
                </div>
                {/* Bintang */}
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-white p-1 ">
                  {[1, 2, 3, 4, 5].map((star, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill={idx < course.rating ? 'gold' : 'gray'}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
