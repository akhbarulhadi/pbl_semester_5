import React from 'react';
import './styles/marquee.css'; // Mengarah ke folder styles dari folder components

const AutoScrolling = () => {
  return (
    <div className="marquee-wrapper">
      {/* Baris pertama */}
      <div className="marquee-row marquee-row-1">
        <div className="marquee-item">Apple</div>
        <div className="marquee-item">Mac</div>
        <div className="marquee-item">iPad</div>
      </div>
      {/* Baris kedua */}
      <div className="marquee-row marquee-row-2">
        <div className="marquee-item">Apple</div>
        <div className="marquee-item">Mac</div>
        <div className="marquee-item">iPad</div>
      </div>
    </div>
  );
};

export default AutoScrolling;
