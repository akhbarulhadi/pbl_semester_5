import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CoursePayment = () => {
  const { id_course } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(`/api/courses/willpay/${id_course}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error(error));
  }, [id_course]);

  const getToken = () => {
    const match = document.cookie.match(/(^|;)\s*token\s*=\s*([^;]+)/);
    return match ? match[2] : null;
  };  

  const handlePayment = () => {
    const token = getToken();

    fetch(`/api/transactions/pay-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id_course }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.redirect_url; // `redirect_url` is the URL returned from Midtrans
      })
      .catch((error) => console.error(error));
  };

  const handleJoinCourse = () => {
    const token = getToken();

    fetch(`/api/transactions/join-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ id_course }), 
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the details page instead of Midtrans Snap
        window.location.href = `/details/${id_course}`;
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Pembayaran Kursus</h1>
      <h2>{course.course_title}</h2>
      <p>{course.course_description}</p>
      <p>
        {course.paid === false 
          ? "Gratis" 
          : course.price 
          ? `Rp ${course.price}` 
          : ""}
      </p>
      {course.paid !== undefined && (
        <button onClick={() => (course.paid ? handlePayment() : handleJoinCourse())}>
          {course.paid ? "Bayar Sekarang" : "Gabung Kursus"}
        </button>
      )}
    </div>
  );
};

export default CoursePayment;
