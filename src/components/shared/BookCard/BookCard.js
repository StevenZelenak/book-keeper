import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BookCard.scss';

class BookCard extends React.Component {
  render() {
    const { book } = this.props;
    const editBook = `/edit/${book.id}`;
    return (
      <div className="BookCard col-3 mb-4">
        <div id={book.id} className="card">
          <img className="card-img-top img-responsive" src={book.imgUrl} alt=""/>
            <div className="card-body">
              <h5 className="card-title">{book.name}</h5>
              <p className="card-text">{book.author}</p>
              <p className="card-text">{this.props.type}</p>
              <p className="card-text">{this.props.genre}</p>
              <p className="card-text">{this.props.status}</p>
              <p className="card-text">{book.narrator}</p>
              <Link className="btn btn-warning" to={editBook}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
