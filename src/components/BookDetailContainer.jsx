import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BookDetail from './BookDetail';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/actions';

const BookDetailContainer = () => {
  const params = useParams();
  // const { data } = useRemoteService(
  //   `http://localhost:8080/books/${params.id}`,
  //   []
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchABook(params.id));
  }, [params, dispatch]);

  const book = useSelector((state) => state.book);

  return <BookDetail book={book} />;
};

export default BookDetailContainer;
