import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
loginClickEvent = (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

render() {
  return (
    <div className="Auth d-flex align-items-center justify-content-center flex-column">
      <h1>Welcome to Book Keeper</h1>
      <h3>Where books are forever</h3>
      <button className="btn btn-primary" onClick={this.loginClickEvent}>Google Login</button>
    </div>
  );
}
}

export default Auth;
