import React from 'react';

export const Review = ({ review }) => {
  return (
    <div className="review">
      <span className="name">{review.name}</span>
      <span className="date">{review.date}</span>
      <p className="content">{review.content}</p>
    </div>
  );
};
