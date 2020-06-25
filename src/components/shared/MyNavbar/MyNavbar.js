import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { NavLink as RRNavLink } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import PropTypes from 'prop-types';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavBar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to='/library'>Library</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to='/newbook'>Add Book</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.logoutClickEvent}>Logout</NavLink>
              </NavItem>
            </Nav>
        );
      }
      return (<Nav className="ml-auto" navbar></Nav>);
    };

    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Book Keeper</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
          { buildNavBar() }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
