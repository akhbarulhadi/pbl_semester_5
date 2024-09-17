import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id_course } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    const getToken = () => {
      const match = document.cookie.match(/token=([^;]*)/);
      return match ? match[1] : null;
    };

    const token = getToken();

    fetch(`/api/courses/${id_course}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error(error));
  }, [id_course]);

  return (
    <div>
      <h1>Detail Kursus</h1>
      <h2>{course.course_title}</h2>
      <p>{course.course_description}</p>
    </div>
  );
};

export default CourseDetail;
