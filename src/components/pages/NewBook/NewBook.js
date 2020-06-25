import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './NewBook.scss';
import authData from '../../../helpers/data/authData';
import bookData from '../../../helpers/data/bookData';

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
    this.setState({ bookType: e.target.id });
  }

  genreChange = (e) => {
    e.preventDefault();
    this.setState({ bookGenre: e.target.id });
  }

  statusChange = (e) => {
    e.preventDefault();
    this.setState({ bookStatus: e.target.id });
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
          <div className="d-flex row justify-content-center">
          <div className="form-group mx-3" >
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Genre
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item id="genre1" onClick={this.genreChange}>Action</Dropdown.Item>
                <Dropdown.Item id="genre2" onClick={this.genreChange}>Adventure</Dropdown.Item>
                <Dropdown.Item id="genre3" onClick={this.genreChange}>Comedy</Dropdown.Item>
                <Dropdown.Item id="genre4" onClick={this.genreChange}>Crime</Dropdown.Item>
                <Dropdown.Item id="genre5" onClick={this.genreChange}>Drama</Dropdown.Item>
                <Dropdown.Item id="genre6" onClick={this.genreChange}>Fantasy</Dropdown.Item>
                <Dropdown.Item id="genre7" onClick={this.genreChange}>Horror</Dropdown.Item>
                <Dropdown.Item id="genre8" onClick={this.genreChange}>Romance</Dropdown.Item>
                <Dropdown.Item id="genre9" onClick={this.genreChange}>Political</Dropdown.Item>
                <Dropdown.Item id="genre10" onClick={this.genreChange}>Historical</Dropdown.Item>
                <Dropdown.Item id="genre11" onClick={this.genreChange}>Mystery</Dropdown.Item>
                <Dropdown.Item id="genre12" onClick={this.genreChange}>Science Fiction</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="form-group mx-3" >
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item id="type1" onClick={this.typeChange}>Audio</Dropdown.Item>
                <Dropdown.Item id="type2" onClick={this.typeChange}>Digital</Dropdown.Item>
                <Dropdown.Item id="type3" onClick={this.typeChange}>Physical</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="form-group mx-3" >
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Status
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item id="status1" onClick={this.statusChange}>Reading</Dropdown.Item>
                <Dropdown.Item id="status2" onClick={this.statusChange}>Finished</Dropdown.Item>
                <Dropdown.Item id="status3" onClick={this.statusChange}>Wishlist</Dropdown.Item>
                <Dropdown.Item id="status4" onClick={this.statusChange}>n/a</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          </div>
          <div className="d-flex row justify-content-center mt-3">
          <button className="btn btn-primary" onClick={this.saveItem}>Save Item</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewStuff;
