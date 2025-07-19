import React from 'react';

export default function ReviewCard({ review }) {
  return (
    <div style={{
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    }}>
      <h4 style={{ margin: '0 0 5px 0' }}>{review.title}</h4>
      <p style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>⭐ {review.rating} / 5</p>
      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{review.review}</p>
    </div>
  );
}
