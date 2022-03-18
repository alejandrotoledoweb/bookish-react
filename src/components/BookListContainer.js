import React from 'react';
import BookList from './BookList';
import { useRemoteService } from './hooks/Hooks';

const BookListContainer = () => {
  const { data, loading, error } = useRemoteService(
    'http://localhost:8080/books',
    []
  );

  return <BookList books={data} loading={loading} error={error} />;
};
export default BookListContainer;
