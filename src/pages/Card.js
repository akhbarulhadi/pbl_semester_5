import React from 'react';

const Card = ({ href, imageSrc, videoSrc, category, title, author, readTime }) => {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {videoSrc ? (
          <video controls className="w-full h-auto rounded-lg">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={imageSrc} alt={title} className="w-full h-auto rounded-lg" />
        )}
        <div className="mt-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
          <p className="text-sm text-gray-500">Oleh {author}</p>
          <p className="text-sm text-gray-500">{readTime}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;
