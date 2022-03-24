import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import { useRemoteService } from './hooks/Hooks';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/actions';
import bookListSelector from '../redux/selector/selector';

const BookListContainer = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  // const { data, loading, error, setUrl } = useRemoteService(
  //   'http://localhost:8080/books',
  //   []
  // );

  const onSearch = (e) => {
    dispatch(actions.setSearchTerm(e.target.value));
    dispatch(actions.fetchBooks());
  };

  const { books, loading, error } = useSelector(bookListSelector);
  // const onSearch = (e) => {
  //   setTerm(e.target.value);
  // };

  useEffect(() => {
    dispatch(actions.fetchBooks(term));
  }, [term, dispatch]);

  return (
    <>
      <SearchBox term={term} onSearch={onSearch} />
      <BookList books={books} loading={loading} error={error} />
    </>
  );
};
export default BookListContainer;
