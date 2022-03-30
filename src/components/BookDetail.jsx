import React, { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const BookDetail = ({ book }) => {
  const [limit] = useState(300);
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

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
      <form noValidate autoComplete="off">
        {' '}
        <TextField
          label="Name"
          name="name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{' '}
        <TextField
          name="content"
          label="Content"
          margin="normal"
          variant="outlined"
          multiline
          maxRows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" color="primary" name="submit">
          Submit
        </Button>
      </form>

      {book?.reviews && <ReviewList reviews={book.reviews} />}
    </div>
  );
};

export default BookDetail;
