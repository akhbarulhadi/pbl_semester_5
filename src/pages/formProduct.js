import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function AddProduct() {
  const [namaProduct, setNamaProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const { id_product } = useParams(); // Mendapatkan id dari URL

  useEffect(() => {
    if (id_product) {
      // Fetch data yang akan di-edit
      fetch(`/api/products/${id_product}`)
        .then((response) => response.json())
        .then((product) => {
          setNamaProduct(product.nama_product);
          setQuantity(product.quantity);
        });
    }
  }, [id_product]);
  console.log(id_product);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      nama_product: namaProduct,
      quantity: quantity,
    };

    try {
      let response;
      if (id_product) {
        // Update data jika id ada
        response = await fetch(`/api/products/${id_product}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      } else {
        // Tambah data baru jika id tidak ada
        response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const data = await response.json();
      console.log('Product saved:', data);

      // Redirect ke halaman sebelumnya setelah menyimpan data
      navigate('/product');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>{id_product ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={namaProduct}
            onChange={(e) => setNamaProduct(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id_product ? 'Update Product' : 'Add Product'}</button>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default AddProduct;
