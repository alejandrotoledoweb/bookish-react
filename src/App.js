import { Typography } from '@material-ui/core';
import BookListContainer from './components/BookListContainer';
import { Routes, Route } from 'react-router-dom';
import BookDetailContainer from './components/BookDetailContainer';

const App = () => {
  return (
    <div className="App">
      <Typography variant="h2" component="h2" data-test="heading">
        Bookish
      </Typography>
      <BookListContainer />
      <Routes>
        <Route exact path="/books" element={<BookListContainer />} />
        <Route path="/books/:id" element={<BookDetailContainer />} />
      </Routes>
    </div>
  );
};
export default App;
