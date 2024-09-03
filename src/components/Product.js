import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Product() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api/products").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, []);

  const handleDelete = async (id_product) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${id_product}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Filter out the deleted data from the state
      setBackendData(backendData.filter(product => product.id_product !== id_product));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <Link to="/about">
        <button>Go to About Page</button>
      </Link>
      <h1>Product List</h1>
      <Link to="/addproduct">
        <button>Add Product</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {backendData.map((product) => (
            <tr key={product.id_product}>
              <td>{product.id_product}</td>
              <td>{product.nama_product}</td>
              <td>{product.quantity}</td>
              <td>
                <Link to={`/addproduct/${product.id_product}`}>
                    <button>Edit Product</button>
                </Link>
                <button onClick={() => handleDelete(product.id_product)}>Delete Product</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
