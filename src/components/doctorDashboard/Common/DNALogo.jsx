import React from 'react';
import './DNALogo.css';
import logoImage from '../../../assets/DNA logo copy.jpg-Photoroom.png';

const DNALogo = ({ size = 40, className = "" }) => {
  return (
    <img 
      src={logoImage}
      alt="DNA Logo"
      className={`dna-logo-image ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        objectFit: 'contain'
      }}
    />
  );
};

export default DNALogo;
