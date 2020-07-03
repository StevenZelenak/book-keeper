import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class Filter extends React.Component {
  state = {
    bookFavorite: false,
    reset: false,
  }

  favoriteChange = (e) => {
    this.setState({ bookFavorite: e.target.checked });
    this.setState({ reset: false });
  }

  resetChange = (e) => {
    this.setState({ reset: e.target.checked });
    this.setState({ bookFavorite: false });
  }

  FilterFavOn = () => {
    if (this.state.bookFavorite) {
      this.props.filterFav();
      this.props.disableFilter();
    } else if (this.state.reset) {
      this.props.resetFilter();
      this.props.disableFilter();
    }
    this.props.disableFilter();
  }

  render() {
    return (
      <div className="border-bottom border-dark">
      <h2 className="mt-3">Filter Options</h2>
      <h6>*Select what you would like to filter by*</h6>
      <div className="form-group d-flex row mt-4 justify-content-center">
      <FormGroup tag="fieldset">
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" checked={this.state.reset} onChange={this.resetChange}/>{' '}
            Reset
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" checked={this.state.bookFavorite} onChange={this.favoriteChange}/>{' '}
            Favorites
          </Label>
        </FormGroup>
        </FormGroup>
          </div>
      <button className="btn btn-success mb-5" onClick={this.FilterFavOn}>Submit Filter</button>
      </div>
    );
  }
}

export default Filter;
