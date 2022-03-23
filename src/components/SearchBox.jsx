import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';

const SearchBox = ({ term, onSearch }) => {
  return (
    <TextField
      label="Search"
      value={term}
      data-test="search"
      onChange={onSearch}
      margin="normal"
      variant="outlined"
    />
  );
};

export default SearchBox;
