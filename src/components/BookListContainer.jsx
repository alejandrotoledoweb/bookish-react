import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import { useRemoteService } from './hooks/Hooks';
import SearchBox from './SearchBox';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions/actions';

const BookListContainer = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const { data, loading, error, setUrl } = useRemoteService(
    'http://localhost:8080/books',
    []
  );

  const onSearch = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(actions.fetchBooks(term));
  }, [term, dispatch]);

  return (
    <>
      <SearchBox term={term} onSearch={onSearch} />
      <BookList books={data} loading={loading} error={error} />
    </>
  );
};
export default BookListContainer;
