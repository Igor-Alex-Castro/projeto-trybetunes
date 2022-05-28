import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';

import Loading from '../../pages/loading/Loading';
import { getUser } from '../../services/userAPI';
import './Header.css';
import NavLink from '../NavLink/NavLink';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const ususario = await getUser();
    console.log(ususario.name);
    this.setState({
      loading: false,
      name: ususario.name,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          <Navbar collapseOnSelect expand="lg" className="backgrung-nav">
            <Container>
              <Navbar.Brand href="/">TrybeTunes</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <NavLink />

            </Container>
          </Navbar>
        </header>
        {
          loading ? <Loading />
            : (
              <h1 className="titleName" data-testid="header-user-name">
                {name}
              </h1>
            )
        }
      </div>
    );
  }
}
export default Header;
