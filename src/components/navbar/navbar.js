import React, { Component } from 'react';
import { Button } from 'reactstrap'
import './navbar.css'
import Logo from '../images/CollectAble-Logo.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, } from 'reactstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    if(localStorage.getItem("user")){
      localStorage.removeItem("user");
      window.location.reload();
    } else if (sessionStorage.getItem("user")){
      sessionStorage.removeItem("user");
      window.location.reload();
    } else {
      alert("There was a problem logging out.")
    }
  }

  // add log out functionality to navlink
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/collectionlist">CollectAble</NavbarBrand>
          <img id="logo" alt="Collectable Logo" src={Logo} />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/settings/">Settings</NavLink>
              </NavItem>
              <NavItem>
                <Button onClick={this.handleLogout}>Log Out</Button>
              </NavItem>
          </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}