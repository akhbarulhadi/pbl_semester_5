import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CoursePayment = () => {
  const { id_course } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(`/api/courses/${id_course}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error(error));
  }, [id_course]);

  const handlePayment = () => {
    const id_user = 3; // Ganti dengan ID pengguna yang sesuai
    console.log(id_user, id_course); // Tambahkan log ini untuk memeriksa nilai id_user dan id_course

    fetch(`/api/transactions/pay-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user, id_course }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to the payment page from Midtrans
        window.location.href = data.redirect_url; // `redirect_url` is the URL returned from Midtrans
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Pembayaran Kursus</h1>
      <h2>{course.course_title}</h2>
      <p>{course.course_description}</p>
      <button onClick={handlePayment}>Bayar Sekarang</button>
    </div>
  );
};

export default CoursePayment;
