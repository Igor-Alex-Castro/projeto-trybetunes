import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUser } from '../../services/userAPI';
import Loading from '../loading/Loading';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      photoPerfil: '',
      fotoPerfil: '',
      descricao: '',
      hasHabilit: true,
      loading: false,
    };
    this.onHeandleChange = this.onHeandleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onHeandleChange({ target }) {
    const { value, name } = target;
    console.log(name);
    this.setState({
      [name]: value,
    }, () => this.onCountClick());
  }

  onCountClick() {
    const { nome } = this.state;
    const MAX = 3;
    if (nome.length < MAX) {
      this.setState((prevStation) => ({ ...prevStation, hasHabilit: true }));
    } else {
      this.setState((prevStation) => ({ ...prevStation, hasHabilit: false }));
    }
  }

  async onClick() {
    const { nome, email, photoPerfil, descricao } = this.state;
    const { history } = this.props;
    this.setState((prevStation) => ({ ...prevStation, loading: true }));
    await createUser({ name: nome, email, image: photoPerfil, description: descricao });
    history.push('/search');
  }

  render() {
    const { nome, hasHabilit, loading, email, photoPerfil, descricao } = this.state;
    return (

      <div data-testid="page-login" className="CompoentLogin">

        {!loading ? (
          <Form className="form-login d-grid gap-2">
            <Form.Group className="mb-3 " controlId="formBasicName">
              <Form.Label htmlFor="nome" className="input-label">
                Nome:
                <Form.Control
                  type="text"
                  name="nome"
                  className="input-control"
                  id="nome"
                  placeholder="Nome completo"
                  data-testid="login-name-input"
                  value={ nome }
                  onChange={ this.onHeandleChange }
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="email" className="input-label">
                Email:
                <Form.Control
                  className="input-control"
                  type="email"
                  id="email"
                  name="email"
                  value={ email }
                  placeholder="exemplo@gmail.com"
                  onChange={ this.onHeandleChange }
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhotoPerfil">
              <Form.Label htmlFor="photoPerfil" className="input-label">
                Foto Perfil:
                <Form.Control
                  className="input-control"
                  type="text"
                  id="photoPerfil"
                  name="photoPerfil"
                  value={ photoPerfil }
                  placeholder="https://www.minhafoto.com"
                  onChange={ this.onHeandleChange }

                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label htmlFor="descricao" className="input-label">
                Descricão:
                <Form.Control
                  className="input-control"
                  as="textarea"
                  id="descricao"
                  name="descricao"
                  value={ descricao }
                  placeholder="Ex: qual estilo de música você mais ouve"
                  style={ { height: 100 } }
                  onChange={ this.onHeandleChange }
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-grid gap-2" controlId="formBasicButton">
              <Button
                disabled={ hasHabilit }
                id="submit"
                type="submit"
                variant="primary"
                data-testid="login-submit-button"
                onClick={ this.onClick }
                className="buttonLogin"
                size="lg"
              >
                ENTRAR
              </Button>
            </Form.Group>
          </Form>
        ) : <Loading />}
      </div>

    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Login;
