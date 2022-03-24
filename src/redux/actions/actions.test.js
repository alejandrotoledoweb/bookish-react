import * as actions from './actions';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './types';
// import { store as myStore } from '../store';

describe('BookListContainer related actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  it('Sets the search keyboard', () => {
    const term = '';
    const expected = {
      type: types.SET_SEARCH_TERM,
      term,
    };
    const store = mockStore({ books: [] });
    const state = store.getState();
    return store.dispatch(actions.setSearchTerm(term));
    expect(state.term).toEqual(expected.term);
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
    return store.dispatch(actions.fetchBooks()).then(() => {
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
    return store.dispatch(actions.fetchBooks('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Searches data with term', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' },
    ];

    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const store = mockStore({ term: 'domain' });

    return store.dispatch(actions.fetchBooks()).then(() => {
      const state = store.getState();
      const newTerm = state.term;
      expect(newTerm).toEqual('domain');
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/books?q=domain'
      );
    });
  });

  it('Performs a search', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const store = mockStore({ books: [], term: 'domain' });
    store.dispatch(actions.setSearchTerm('domain'));
    return store.dispatch(actions.fetchBooks()).then(() => {
      const state = store.getState();
      expect(state.term).toEqual('domain');
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/books?q=domain'
      );
    });
  });
});
