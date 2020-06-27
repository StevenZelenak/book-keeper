import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import fbConnection from '../helpers/data/connections';

import BookContainer from '../components/pages/BookContainer/BookContainer';
import EditBook from '../components/pages/EditBook/EditBook';
import NewBook from '../components/pages/NewBook/NewBook';
import Auth from '../components/pages/Auth/Auth';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/library', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={ this.state.authed }/>
              <Switch>
                <PrivateRoute path='/library' component={BookContainer} authed={this.state.authed}/>
                <PrivateRoute path='/newbook' component={NewBook} authed={this.state.authed}/>
                <PrivateRoute path='/edit/:bookId' component={EditBook} authed={this.state.authed}/>
                <PublicRoute path='/auth' component={Auth} authed={this.state.authed}/>
                <Redirect from="*" to="/home" />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
