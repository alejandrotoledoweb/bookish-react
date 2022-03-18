import React from 'react';
import { useParams } from 'react-router-dom';
import { useRemoteService } from './hooks/Hooks';
import BookDetail from './BookDetail';

const BookDetailContainer = () => {
  const params = useParams();
  const { data } = useRemoteService(
    `http://localhost:8080/books/${params.id}`,
    []
  );
  return <BookDetail book={data} />;
};

export default BookDetailContainer;
