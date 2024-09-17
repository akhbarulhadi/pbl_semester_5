// src/components/your-carousel-library.js
import React, { useRef } from 'react';
import Slider from 'react-slick'; // Pastikan react-slick sudah di-install
import 'slick-carousel/slick/slick.css'; // Import CSS untuk slick-carousel
import 'slick-carousel/slick/slick-theme.css'; // Import CSS untuk slick-theme

const Carousel = ({ children, transition }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: transition?.duration || 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Set to false to hide default arrows
  };

  return (
    <div className="relative">
      <Slider {...settings} ref={sliderRef}>
        {children}
      </Slider>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickPrev()}
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickNext()}
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
