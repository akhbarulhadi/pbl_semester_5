import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import About from './components/About';
import FormProduct from './components/formProduct';

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
