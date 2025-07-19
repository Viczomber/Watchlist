import React from 'react';

export default function Card({ title, image, rating, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '180px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        margin: '10px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
      />
      <div style={{ padding: '10px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{title}</h3>
        <p style={{ margin: 0 }}>⭐ {rating} / 5</p>
      </div>
    </div>
  );
}
