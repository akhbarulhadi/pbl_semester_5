import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Card } from 'flowbite-react';

function Product() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch products.');
      });
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
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div>
      {/* Card Component */}
      <div className="my-8 flex justify-center">
        
      </div>
    </div>
  );
}

export default Product;
