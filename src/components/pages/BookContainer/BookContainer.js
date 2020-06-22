import React from 'react';

import './BookContainer.scss';

import BookCard from '../../shared/BookCard/BookCard';
import authData from '../../../helpers/data/authData';
import bookData from '../../../helpers/data/bookData';

class BookContainer extends React.Component {
  state = {
    books: [],
  }

  getBooks = () => {
    const uid = authData.getUid();
    bookData.getBooksByUid(uid)
      .then((books) => this.setState({ books }))
      .catch((err) => console.error('could not get books', err));
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    const { books } = this.state;
    const buildBookCards = books.map((book) => (
        <BookCard key={book.id} book={book} />
    ));
    return (
      <div className="MyStuff">
      <h1>Library</h1>
      <div className="d-flex flex-wrap">
          {buildBookCards}
        </div>
      </div>
    );
  }
}

export default BookContainer;
