import { setSearchTerm, fetchBooks } from './actions';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './types';

describe('BookListContainer related actions', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  it('Sets the search keyboard', () => {
    const term = 'a';
    const expected = {
      type: types.SET_SEARCH_TERM,
      term,
    };
    const action = setSearchTerm(term);
    expect(action).toEqual(expected);
  });

  it('fetch data successfully', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books },
    ];
    const store = mockStore({ books: [] });
    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetch data with error', () => {
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ message: 'Something went wrong' })
      );
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_FAILED, err: 'Something went wrong' },
    ];
    const store = mockStore({ books: [] });
    return store.dispatch(fetchBooks('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('searches data with term', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' },
    ];

    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const store = mockStore({ books: [] });
    return store.dispatch(fetchBooks('domain')).then((res) => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/books?q=domain'
      );
    });
  });
});
