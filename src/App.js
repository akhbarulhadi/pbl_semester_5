import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import About from './pages/About';
import FormProduct from './pages/formProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/addproduct" element={<FormProduct />} />
        <Route path="/addproduct/:id_product" element={<FormProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
