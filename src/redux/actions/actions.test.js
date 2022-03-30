import * as actions from './actions';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './types';

describe('BookListContainer related actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  it('Sets the search keyboard', () => {
    const term = 'a';
    const expected = {
      type: types.SET_SEARCH_TERM,
      term,
    };
    // const store = mockStore({ books: [] });
    // const state = store.getState();
    // return store.dispatch(actions.setSearchTerm(term));
    // expect(state).toEqual(expected);
    const action = actions.setSearchTerm(term);
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

  it('Saves a review for a book', () => {
    const review = {
      name: 'Juntao Qiu',
      content: 'Excellent work!!',
    };

    axios.post = jest.fn().mockImplementation(() => Promise.resolve({}));
    const store = mockStore({ books: [], term: '' });
    const id = 1;
    return store.dispatch(actions.saveReview(id, review)).then(
      () => expect(axios.post).toHaveBeenCalledTimes(1)
      // expect(axios.post).toHaveBeenNthCalledWith(
      //   'http://localhost:8080/books/1',
      //   review
      // )
    );
  });
});
