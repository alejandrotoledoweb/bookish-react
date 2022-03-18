import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetailContainer = () => {
  const params = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    console.log({ params: params.id });
    const fetchBook = async () => {
      const book = await axios.get(`http://localhost:8080/books/${params.id}`);
      setBook(book.data);
    };
    fetchBook();
  }, [params.id]);
  return <h2 className="book-title">{book.name}</h2>;
};

export default BookDetailContainer;
