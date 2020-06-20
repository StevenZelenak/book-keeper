import React from 'react';
import './App.scss';

import BookContainer from '../components/pages/BookContainer/BookContainer';
import EditBook from '../components/pages/EditBook/EditBook';
import Homepage from '../components/pages/Homepage/Homepage';
import NewBook from '../components/pages/NewBook/NewBook';
import Auth from '../components/pages/Auth/Auth';
import BookCard from '../components/shared/BookCard/BookCard';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>INSIDE APP COMPONENT</h2>
        <BookContainer />
        <EditBook />
        <Homepage />
        <NewBook />
        <Auth />
        <BookCard />
        <MyNavbar />
      </div>
    );
  }
}

export default App;
