import React, { Component } from 'react';
import { Button } from 'reactstrap'
import './navbar.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import Logo from '../images/CollectAble-Logo.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, } from 'reactstrap';
  library.add(faHome);


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
      alert("There was a problem logging out. Please try again.")
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand id="nav-header" href="/collectionlist">CollectAble</NavbarBrand>
          <img id="logo" alt="Collectable Logo" src={Logo} />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink id="home-btn" href="/collectionlist"><Button>Home</Button></NavLink>
              </NavItem>
              <NavItem id="log-out-btn">
                <Button onClick={this.handleLogout}>Log Out</Button>
              </NavItem>
          </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}