import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../redux/actions/actions';

const ReviewForm = ({ id }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  return (
    <form noValidate autoComplete="off">
      {' '}
      <TextField
        label="Name"
        name="name"
        margin="normal"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{' '}
      <TextField
        name="content"
        label="Content"
        margin="normal"
        variant="outlined"
        multiline
        maxRows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        onClick={() => dispatch(actions.saveReview(id, { name, content }))}
        variant="contained"
        color="primary"
        name="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default ReviewForm;
