import * as types from '../actions/types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_BOOKS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_BOOKS_SUCCESS:
      return {
        books: action.books,
      };
    default:
      return state;
  }
};

export default reducer;
