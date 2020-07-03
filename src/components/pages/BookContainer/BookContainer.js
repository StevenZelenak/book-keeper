import React from 'react';

import './BookContainer.scss';

import BookCard from '../../shared/BookCard/BookCard';
import authData from '../../../helpers/data/authData';
import bookData from '../../../helpers/data/bookData';
import typeData from '../../../helpers/data/typeData';
import genreData from '../../../helpers/data/genreData';
import statusData from '../../../helpers/data/statusData';
import Filter from '../../shared/Filter/Filter';

class BookContainer extends React.Component {
  state = {
    books: [],
    types: [],
    genres: [],
    statuses: [],
    showComponentFilter: false,
    startFilter: false,
  }

  getBooks = () => {
    const uid = authData.getUid();
    let booksArr = [];
    let typesArr = [];
    let genresArr = [];
    let statusesArr = [];
    bookData.getBooksByUid(uid)
      .then((books) => {
        booksArr = books;
        typeData.getTypes()
          .then((types) => {
            typesArr = types;
            genreData.getGenres()
              .then((genres) => {
                genresArr = genres;
                statusData.getStatuses()
                  .then((statuses) => {
                    statusesArr = statuses;
                    this.setState({
                      books: booksArr,
                      types: typesArr,
                      genres: genresArr,
                      statuses: statusesArr,
                    });
                  });
              });
          });
      })
      .catch((err) => console.error('could not get books', err));
  }

  componentDidMount() {
    this.getBooks();
  }

  removeBook = (bookId) => {
    bookData.deleteBook(bookId)
      .then(() => this.getBooks())
      .catch((err) => console.error('unable to delete book: ', err));
  }

  updateFavorite = (bookId, favoriteValue) => {
    const newFavValue = !favoriteValue;
    bookData.patchBook(bookId, newFavValue)
      .then(() => this.getBooks())
      .catch((err) => console.error('unable to patch favorite', err));
  }

  enableFilter = () => {
    this.setState({ showComponentFilter: true });
  }

  disableFilter = () => {
    this.setState({ showComponentFilter: false });
  }

  filterFav = () => {
    this.setState({ startFilter: true });
  }

  resetFilter = () => {
    this.setState({ startFilter: false });
  }

  render() {
    const {
      books,
      types,
      genres,
      statuses,
    } = this.state;
    const buildBookCards = books.map((book) => (
           <BookCard key={book.id} book={book}
           type={types.map((type) => (type.id === book.typeId ? type.name : false))}
           genre={genres.map((genre) => (genre.id === book.genreId ? genre.name : false))}
           status={statuses.map((status) => (status.id === book.statusId ? status.name : false))}
           removeBook={this.removeBook}
           updateFavorite={this.updateFavorite}
           />
    ));
    const buildBookCardsFavorites = books.map((book) => (
      book.isFavorite ? <BookCard key={book.id} book={book}
      type={types.map((type) => (type.id === book.typeId ? type.name : false))}
      genre={genres.map((genre) => (genre.id === book.genreId ? genre.name : false))}
      status={statuses.map((status) => (status.id === book.statusId ? status.name : false))}
      removeBook={this.removeBook}
      updateFavorite={this.updateFavorite}
      /> : ''
    ));

    if (this.componentDidMount) {
      return (
      <div className="BookContainer">
        <div className="filter-div">
      { this.state.showComponentFilter ? <Filter resetFilter={ this.resetFilter } filterFav={this.filterFav} disableFilter={this.disableFilter}/> : <button className="btn btn-primary mt-3" onClick={this.enableFilter}>Filter</button> }
        </div>
      <div className="d-flex flex-wrap mt-5">
          { this.state.startFilter ? buildBookCardsFavorites : buildBookCards }
        </div>
      </div>
      );
    }
    return '';
  }
}

export default BookContainer;
