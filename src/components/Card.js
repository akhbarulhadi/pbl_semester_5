import React from 'react';

const Card = ({ href, imageSrc, category, title, author, readTime, videoSrc }) => {
  return (
    <div className="card bg-white rounded-lg shadow-md overflow-hidden p-4">
      <a href={href} className="block">
        <div className="relative w-full h-48"> {/* Menetapkan tinggi tetap untuk video */}
          {videoSrc ? (
            <iframe
              src={videoSrc}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          ) : (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-lg" />
          )}
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500">{category}</p>
          <p className="text-gray-500">{author}</p>
          <p className="text-gray-500">{readTime}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;
