import axios from 'axios';
import * as actions from '../redux/actions/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import BookDetailContainer from './BookDetailContainer';
import store from '../redux/store';
import toBeInTheDocument from '@testing-library/jest-dom';

describe('BookDetailContainer', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const renderWithProvider = (component) => {
    return {
      ...render(
        <Provider store={store}>
          {' '}
          <Router initialEntries={['/books/2']}>{component}</Router>{' '}
        </Provider>
      ),
    };
  };

  it('Fetch book by id', () => {
    const book = { id: 1, name: 'Refactoring' };
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));

    const store = mockStore({ books: [], term: '' });
    return store.dispatch(actions.fetchABook(1)).then(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books/1');
    });
  });

  it('renders', async () => {
    // jest.mock('react-router-dom', () => ({
    //   ...jest.requireActual('react-router-dom'),
    //   useParams: () => ({
    //     id: 2,
    //   }),
    // }));
    // const mock = new MockAdapter(axios);
    // mock.onGet(`http://localhost:8080/books/${useParams.id}`).reply(200, {
    //   name: 'Acceptance tests driven development with React',
    //   id: 2,
    //   description:
    //     'Describes the acceptance test for the developers using React',
    // });
    const books = {
      id: 2,
      name: 'Acceptance tests driven development with React',
      description:
        'Describes the acceptance test for the developers using React',
    };
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const { findByText } = renderWithProvider(<BookDetailContainer />);
    const book = await findByText(
      'Acceptance tests driven development with React'
    );
    expect(book).toBeInTheDocument();
  });
});
