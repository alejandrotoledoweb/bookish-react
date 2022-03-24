import { createSelector } from 'reselect';

const bookListSelector = createSelector(
  [(state) => state.books, (state) => state.loading, (state) => state.error],
  (books, loading, error) => ({ books, loading, error })
);
export default bookListSelector;
