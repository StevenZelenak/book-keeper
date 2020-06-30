import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BookCard.scss';

class BookCard extends React.Component {
  static propTypes = {
    removeBook: PropTypes.func.isRequired,
    updateFavorite: PropTypes.func.isRequired,
  }

  render() {
    const { book, removeBook, updateFavorite } = this.props;
    const editBook = `/edit/${book.id}`;
    return (
      <div className="BookCard col-sm-12 col-md-6 col-lg-3 mb-2">
        <div id={book.id} className="card">
          <div className="card-header">
            <div className="d-flex align-items-center">
            {book.isFavorite === true ? <button className="btn favorite-color mr-auto" onClick={() => updateFavorite(book.id, book.isFavorite)}><i className="fas fa-star"></i></button> : <button className="btn un-favorite-color mr-auto" onClick={() => updateFavorite(book.id, book.isFavorite)}><i className="fas fa-star"></i></button>}
              <Link className="btn edit-button mx-2" to={editBook}><i className="fas fa-pen"></i></Link>
              <button className="btn delete-button" onClick={() => removeBook(book.id)}><i className="fas fa-times"></i></button>
            </div>
          </div>
            <img className="card-img-top img-responsive" src={book.imageUrl} alt=""/>
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">By : {book.author}</p>
                <p className="card-text">{this.props.type} Edition</p>
                <p className="card-text">Genre : {this.props.genre}</p>
                <p className="card-text">Status : {this.props.status}</p>
                {
                  book.narrator.length > 0 ? <p className="card-text">Narrated By : {book.narrator}</p> : ''
                }
            </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
