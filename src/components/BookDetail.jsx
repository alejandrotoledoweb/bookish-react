import React, { useState, useEffect } from 'react';

const BookDetail = ({ book }) => {
  const [limit] = useState(300);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);

  const handleShowText = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
    setShowLess(!showLess);
  };

  useEffect(() => {
    if (book?.description && book?.description.length > limit) {
      setShowMore(true);
    }
  }, [book, limit]);
  const getDescriptionFor = (book) => {
    return book?.description ? (
      book.description.length > limit && showMore ? (
        <>{book.description.substring(0, limit) + '...'} </>
      ) : (
        book.description
      )
    ) : (
      book?.name
    );
  };

  return (
    <div className="detail">
      <h2 className="book-title">{book?.name}</h2>
      <p className="book-description">{getDescriptionFor(book)}</p>
      {showMore && (
        <button className="show-more" onClick={handleShowText}>
          Show More
        </button>
      )}
      {showLess && (
        <button className="show-more" onClick={handleShowText}>
          Show Less
        </button>
      )}
    </div>
  );
};

export default BookDetail;
