import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import BookContainer from '../components/pages/BookContainer/BookContainer';
import EditBook from '../components/pages/EditBook/EditBook';
import Homepage from '../components/pages/Homepage/Homepage';
import NewBook from '../components/pages/NewBook/NewBook';
import Auth from '../components/pages/Auth/Auth';
import BookCard from '../components/shared/BookCard/BookCard';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import fbConnection from '../helpers/data/connections';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

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
