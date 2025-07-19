import React, { useState } from 'react';

export default function ReviewBox({ onSave }) {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      onSave(review);
      setReview('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="4"
        cols="40"
        placeholder="Escribe tu reseña aquí..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={{ padding: '8px', borderRadius: '8px', width: '100%' }}
      />
      <button
        type="submit"
        style={{
          marginTop: '8px',
          padding: '6px 12px',
          backgroundColor: '#61dafb',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Guardar reseña
      </button>
    </form>
  );
}
