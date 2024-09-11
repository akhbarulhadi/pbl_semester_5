import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id_course } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(`/api/courses/${id_course}`)
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
