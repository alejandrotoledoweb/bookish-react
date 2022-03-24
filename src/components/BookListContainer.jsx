import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import { useRemoteService } from './hooks/Hooks';
import SearchBox from './SearchBox';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions/actions';

const BookListContainer = () => {
  const [term, setTerm] = useState('');
  const { data, loading, error, setUrl } = useRemoteService(
    'http://localhost:8080/books',
    []
  );

  const onSearch = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    setUrl(`http://localhost:8080/books?q=${term}`);
  }, [term, setUrl]);

  return (
    <>
      <SearchBox term={term} onSearch={onSearch} />
      <BookList books={data} loading={loading} error={error} />
    </>
  );
};
export default BookListContainer;
