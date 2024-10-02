// src/components/Card.js

import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ href, imageSrc, category, title, author, readTime, isSelected }) => {
  return (
    <Link to={href} className="block">
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${isSelected ? 'border-4 border-blue-500' : ''}`}>
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-sm text-gray-500">{category}</p>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{author}</p>
          <p className="text-gray-500">{readTime}</p>
        </div>
      </div>
    </Link>
  );
};


export default Card;
