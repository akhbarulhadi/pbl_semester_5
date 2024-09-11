import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import About from './pages/About';
import FormProduct from './pages/formProduct';
import Courses from './pages/Courses';
import CoursePayment from './pages/coursePayment';
import CourseDetail from './pages/courseDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/payment/:id_course" element={<CoursePayment/>} />
        <Route path="/details/:id_course" element={<CourseDetail/>} />
        <Route path="/about" element={<About />} />
        <Route path="/addproduct" element={<FormProduct />} />
        <Route path="/addproduct/:id_product" element={<FormProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
