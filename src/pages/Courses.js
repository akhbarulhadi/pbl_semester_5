import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  const handleLogout = () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Jika token disimpan di HttpOnly cookie
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Logout failed. Status: ${response.status}`);
        }
        // Lakukan aksi logout di frontend, misalnya redirect ke halaman login
        window.location.href = '/';
      })
      .catch((error) => console.error('Logout error:', error));
  };  

  return (
    <div>
      <h1>Daftar Kursus</h1>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {courses.map((course) => (
          <li key={course.id_course}>
            <h2>{course.course_title}</h2>
            <p>{course.course_description}</p>
            <p>{course.paid ? "Berbayar" : "Gratis"}</p>
            {course.joined_users.length === 0 ? (
              course.paid ? (
                <Link to={`/payment/${course.id_course}`}>Bayar Kursus</Link>
              ) : (
                <Link to={`/payment/${course.id_course}`}>Gabung Kursus</Link>
              )
            ) : (
              <Link to={`/details/${course.id_course}`}>Lihat Kursus</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
