import React, { useState } from 'react';

export default function RatingStars({ value = 0, onChange }) {
  const [hovered, setHovered] = useState(0);

  const handleClick = (rating) => {
  if (onChange) {
    onChange(rating);
  }
};

  return (
    <div style={{ display: 'flex', gap: '5px', fontSize: '24px', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            color: (hovered || value) >= star ? '#FFD700' : '#ccc',
            transition: 'color 0.2s',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

