import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import './NavLink.css';
import { Link } from 'react-router-dom';

class NavLink extends React.Component {
  render() {
    return (
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="AllLinks">

          <Link
            data-testid="link-to-search"
            className="navLiks"
            to="/search"
          >
            Search

          </Link>

          <Link
            className="navLiks"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites

          </Link>

          <Link
            className="navLiks"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile

          </Link>

        </Nav>
      </Navbar.Collapse>

    );
  }
}
export default NavLink;
