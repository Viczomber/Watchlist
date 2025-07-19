import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CardItem({ 
  to, 
  imageSrc, 
  title, 
  year = 'N/A', 
  rating = 'N/A' 
}) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: hovered ? '0 4px 10px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    transform: hovered ? 'scale(1.03)' : 'none',
    cursor: 'pointer',
  };

  const imgStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '6px',
    padding: '10px',
  };

  const infoStyle = {
    fontSize: '12px',
    color: '#666',
    marginBottom: '6px',
  };

  return (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={cardStyle}>
        <img src={imageSrc} alt={title} style={imgStyle} />
        <div>
          <div style={titleStyle}>{title}</div>
          <div style={infoStyle}>📅 {year}</div>
          <div style={infoStyle}>⭐ {rating}</div>
        </div>
      </div>
    </Link>
  );
}
