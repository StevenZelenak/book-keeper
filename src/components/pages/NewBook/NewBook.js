import React from 'react';
import './NewBook.scss';
import authData from '../../../helpers/data/authData';
import bookData from '../../../helpers/data/bookData';

// "uid": "u7WEk9MPFIR5cpNM1GlGEjORafE2",
//   "imageUrl": "",
//   "name": "Children of Time",
//   "author": "Adrian Tchaikovsky",
//   "typeId": "type1",
//   "genreId": "genre12",
//   "statusId": "status2",
//   "isFavorite": true,
//   "narrator": ""

class NewStuff extends React.Component {
  state = {
    bookName: '',
    bookImage: '',
    bookAuthor: '',
    bookType: '',
    bookGenre: '',
    bookStatus: '',
    bookFavorite: false,
    bookNarrator: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ bookName: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ bookImage: e.target.value });
  }

  authorChange = (e) => {
    e.preventDefault();
    this.setState({ bookAuthor: e.target.value });
  }

  typeChange = (e) => {
    e.preventDefault();
    this.setState({ bookType: e.target.value });
  }

  genreChange = (e) => {
    e.preventDefault();
    this.setState({ bookGenre: e.target.value });
  }

  statusChange = (e) => {
    e.preventDefault();
    this.setState({ bookStatus: e.target.value });
  }

  favoriteChange = (e) => {
    this.setState({ bookFavorite: e.target.checked });
  }

  narratorChange = (e) => {
    e.preventDefault();
    this.setState({ bookNarrator: e.target.value });
  }

  saveItem = (e) => {
    e.preventDefault();
    const {
      bookName,
      bookImage,
      bookAuthor,
      bookType,
      bookGenre,
      bookStatus,
      bookFavorite,
      bookNarrator,
    } = this.state;
    const newBook = {
      uid: authData.getUid(),
      imageUrl: bookImage,
      name: bookName,
      author: bookAuthor,
      typeId: bookType,
      genreId: bookGenre,
      statusId: bookStatus,
      isFavorite: bookFavorite,
      narrator: bookNarrator,
    };
    bookData.postBook(newBook)
      .then(() => this.props.history.push('/library'))
      .catch((err) => console.error('unable to save book:', err));
  }

  render() {
    const {
      bookName,
      bookImage,
      bookAuthor,
      bookType,
      bookGenre,
      bookStatus,
      bookFavorite,
      bookNarrator,
    } = this.state;

    return (
      <div className="NewScat col-12">
        <h1>New Book</h1>
        <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="book-name">Name</label>
            <input
              type="text"
              className="form-control"
              id="book-name"
              value={bookName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-image">Image</label>
            <input
              type="text"
              className="form-control"
              id="book-image"
              value={bookImage}
              onChange={this.imageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-author">Author</label>
            <input
              type="text"
              className="form-control"
              id="book-author"
              value={bookAuthor}
              onChange={this.authorChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-narrator">Narrator</label>
            <input
              type="text"
              className="form-control"
              id="book-narrator"
              value={bookNarrator}
              onChange={this.narratorChange}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="book-favorite"
              checked={bookFavorite}
              onChange={this.favoriteChange}
              />
            <label className="form-check-label" htmlFor="scat-wasFulfilling">Favorite</label>
          </div>
          <div className="form-group" >
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Genre
              </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" value='genre1' type="button" onClick={this.genreChange}>Action</button>
                  <button class="dropdown-item" value='genre2' type="button" onClick={this.genreChange}>Adventure</button>
                </div>
              </div>
          </div>
          <button className="btn btn-primary" onClick={this.saveItem}>Save Item</button>
        </form>
      </div>
    );
  }
}

export default NewStuff;
