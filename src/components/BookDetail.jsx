import React, { useState, useEffect } from 'react';

const BookDetail = ({ book }) => {
  const [limit] = useState(300);
  const [showMore, setShowMore] = useState(true);
  const [showLess, setShowLess] = useState(false);

  const handleShowText = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
    setShowLess(!showLess);
  };
  const getDescriptionFor = (book) => {
    return book.description ? (
      book.description.length > limit && showMore ? (
        <>{book.description.substring(0, limit) + '...'} </>
      ) : (
        book.description
      )
    ) : (
      book.name
    );
  };

  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">{getDescriptionFor(book)}</p>
      {showMore && (
        <a href="#" className="show-more" onClick={handleShowText}>
          Show More
        </a>
      )}
      {showLess && (
        <a href="#" className="show-more" onClick={handleShowText}>
          Show Less
        </a>
      )}
    </div>
  );
};

export default BookDetail;
