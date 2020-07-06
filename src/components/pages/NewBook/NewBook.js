import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './NewBook.scss';
import authData from '../../../helpers/data/authData';
import bookData from '../../../helpers/data/bookData';
import typeData from '../../../helpers/data/typeData';
import genreData from '../../../helpers/data/genreData';
import statusData from '../../../helpers/data/statusData';

class NewBook extends React.Component {
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
    genreName: 'Genre',
    statusName: 'Status',
    typeName: 'Type',
  }

  getData() {
    typeData.getTypes()
      .then((types) => {
        genreData.getGenres()
          .then((genres) => {
            statusData.getStatuses()
              .then((statuses) => {
                this.setState({
                  types,
                  genres,
                  statuses,
                });
              });
          });
      })
      .catch((err) => console.error('unable to get data for add: ', err));
  }

  componentDidMount() {
    this.getData();
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

  narratorChange = (e) => {
    e.preventDefault();
    this.setState({ bookNarrator: e.target.value });
  }

  saveBook = (e) => {
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
      bookNarrator,
    } = this.state;

    return (
      <div className="NewBook col-12">
        <h1 className="mt-3">Create A Book</h1>
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

export default NewBook;
