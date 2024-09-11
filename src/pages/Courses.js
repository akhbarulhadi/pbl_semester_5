import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses') // API dari backend
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Daftar Kursus</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            <h2>{course.course_title}</h2>
            <p>{course.course_description}</p>
            <Link to={`/payment/${course.id_course}`}>Bayar Kursus</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
