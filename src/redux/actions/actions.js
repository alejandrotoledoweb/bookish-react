import axios from 'axios';

export const setSearchTerm = (term) => {
  return { type: 'SET_SEARCH_TERM', term };
};

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_BOOKS_PENDING' });
    return axios.get(`http://localhost:8080/books`).then((res) => {
      dispatch({ type: 'FETCH_BOOKS_SUCCESS', books: res.data });
    });
  };
};
