import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './EditBook.scss';
import authData from '../../../helpers/data/authData';
import bookData from '../../../helpers/data/bookData';
import genreData from '../../../helpers/data/genreData';

class EditBook extends React.Component {
  state = {
    bookName: '',
    bookImage: '',
    bookAuthor: '',
    bookType: '',
    bookGenre: '',
    bookStatus: '',
    bookFavorite: false,
    bookNarrator: '',
    genreTitleDropdown: '',
    btnTitle: 'Type',
    genreTitleEvent: 'Genre',
  }

  // genreTitleChange() {
  //   const { bookGenre } = this.state;
  //   genreData.getGenres()
  //     .then((genres) => {
  //       const titleName = genres.map((genre) => (genre.id === bookGenre ? genre.name : 'one'));
  //       const indexForName = titleName.findIndex((name) => name.length > 3);
  //       if (bookGenre.length <= 0) {
  //         this.setState({ genreTitleDropdown: 'Genre' });
  //       }
  //       this.setState({ genreTitleDropdown: titleName[indexForName] });
  //     })
  //     .catch((err) => console.error('Could not get genres in the edit dropdown', err));
  // }

  componentDidMount() {
    const { bookId } = this.props.match.params;
    bookData.getSingleBook(bookId)
      .then((response) => {
        const book = response.data;
        this.setState({
          bookName: book.name,
          bookImage: book.imageUrl,
          bookAuthor: book.author,
          bookType: book.typeId,
          bookGenre: book.genreId,
          bookStatus: book.statusId,
          bookFavorite: false,
          bookNarrator: book.narrator,
        });
      })
      .catch((err) => console.error('unable to get book to edit: ', err));
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

  saveBook = (e) => {
    const { bookId } = this.props.match.params;
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
    const updatedBook = {
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
    bookData.putBook(bookId, updatedBook)
      .then(() => this.props.history.push('/library'))
      .catch((err) => console.error('unable to save book:', err));
  }

  handleChange = (e) => {
    const val = e.target.id;
    this.setState({ btnTitle: val });
    console.error('btnTitle', this.state.btnTitle);
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
        <h1>Edit Book</h1>
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
            <label className="form-check-label" htmlFor="book-wasFulfilling">Favorite</label>
          </div>
          <div className="d-flex row justify-content-center">
          <div className="form-group mx-3" >
          <Dropdown as={ButtonGroup}>
          <Button variant="success">{ this.state.genreTitleEvent }</Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
              <Dropdown.Menu>
                {/* create a function that loop over and creates these line automatically */}
                <Dropdown.Item id="genre1" eventKey="Action" onClick={this.genreChange} onSelect={ (e) => { this.setState({ genreTitleEvent: e }); }}>Action</Dropdown.Item>
                <Dropdown.Item id="genre2" eventKey="Adventure" onClick={this.genreChange} onSelect={ (e) => { this.setState({ genreTitleEvent: e }); }}>Adventure</Dropdown.Item>
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
            <DropdownButton id="dropdown-basic-button" title={this.state.btnTitle}>
              <Dropdown.Item eventKey="1" id="type1" onSelect={this.handleChange} onClick={this.typeChange}>Audio</Dropdown.Item>
              <Dropdown.Item onSelect={this.handleChange} eventKey="2" id="type2" onClick={this.typeChange}>Digital</Dropdown.Item>
              <Dropdown.Item onSelect={this.handleChange} eventKey="3" id="type3" onClick={this.typeChange}>Physical</Dropdown.Item>
            </DropdownButton>
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
          <button className="btn btn-primary" onClick={this.saveBook}>Save Book</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditBook;
