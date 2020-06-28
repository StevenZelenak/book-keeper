import React from 'react';

// React bootstrap files
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

// personal css file
import './EditBook.scss';

// Date files
import authData from '../../../helpers/data/authData';
import bookData from '../../../helpers/data/bookData';
import genreData from '../../../helpers/data/genreData';
import typeData from '../../../helpers/data/typeData';
import statusData from '../../../helpers/data/statusData';

class EditBook extends React.Component {
  state = {
    genres: [],
    statuses: [],
    types: [],
    bookName: '',
    bookImage: '',
    bookAuthor: '',
    bookType: '',
    bookGenre: '',
    bookStatus: '',
    bookFavorite: false,
    bookNarrator: '',
    genreName: '',
    statusName: '',
    typeName: '',
  }

  getSingleBook() {
    const { bookId } = this.props.match.params;
    bookData.getSingleBook(bookId)
      .then((response) => {
        const book = response.data;
        typeData.getTypes()
          .then((types) => {
            genreData.getGenres()
              .then((genres) => {
                statusData.getStatuses()
                  .then((statuses) => {
                    const getGenreName = genres.map((genre) => (genre.id === book.genreId ? genre.name : false));
                    const getStatusName = statuses.map((status) => (status.id === book.statusId ? status.name : false));
                    const getTypeName = types.map((type) => (type.id === book.typeId ? type.name : false));
                    this.setState({
                      bookName: book.name,
                      bookImage: book.imageUrl,
                      bookAuthor: book.author,
                      bookType: book.typeId,
                      bookGenre: book.genreId,
                      bookStatus: book.statusId,
                      bookFavorite: false,
                      bookNarrator: book.narrator,
                      types,
                      genres,
                      statuses,
                      genreName: getGenreName,
                      statusName: getStatusName,
                      typeName: getTypeName,
                    });
                  });
              });
          });
      })
      .catch((err) => console.error('unable to get book to edit: ', err));
  }

  componentDidMount() {
    this.getSingleBook();
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
        <h1>Editing Book {this.state.bookName}</h1>
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
            <Button variant="success">{ this.state.genreName }</Button>
              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {this.state.genres.map((genre) => <Dropdown.Item id={ genre.id } eventKey={ genre.name } onClick={this.genreChange} onSelect={ (e) => { this.setState({ genreName: e }); }}>{ genre.name }</Dropdown.Item>)}
                </Dropdown.Menu>
          </Dropdown>
          </div>
          <div className="form-group mx-3" >
          <Dropdown as={ButtonGroup}>
            <Button variant="success">{ this.state.typeName }</Button>
              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {this.state.types.map((type) => <Dropdown.Item id={ type.id } eventKey={ type.name } onClick={this.typeChange} onSelect={ (e) => { this.setState({ typeName: e }); }}>{ type.name }</Dropdown.Item>)}
                </Dropdown.Menu>
          </Dropdown>
          </div>
          <div className="form-group mx-3" >
          <Dropdown as={ButtonGroup}>
            <Button variant="success">{ this.state.statusName }</Button>
              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {this.state.statuses.map((status) => <Dropdown.Item id={ status.id } eventKey={ status.name } onClick={this.statusChange} onSelect={ (e) => { this.setState({ statusName: e }); }}>{ status.name }</Dropdown.Item>)}
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
