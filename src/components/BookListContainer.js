import React from 'react';
import BookList from './BookList';
import { useRemoteService } from './hooks/Hooks';

const BookListContainer = () => {
  const { data, loading, error } = useRemoteService([]);

  return <BookList books={data} loading={loading} error={error} />;
};
export default BookListContainer;
