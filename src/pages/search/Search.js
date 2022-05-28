import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../../components/Header/Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../loading/Loading';
import './Seach.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      hasDiseble: true,
      hasLoading: false,
      habilitInput: false,
      name: '',
      albumArtist: [],
    };
    this.handleChageInput = this.handleChageInput.bind(this);
    this.onCountClick = this.onCountClick.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  handleChageInput({ target }) {
    const name = target.value;

    this.setState({
      artist: name,
    }, () => this.onCountClick());
  }

  onCountClick() {
    const { artist } = this.state;
    if (artist.length < 2) {
      this.setState({ hasDiseble: true });
    } else {
      this.setState({ hasDiseble: false });
    }
  }

  async onClickButton() {
    const { artist } = this.state;
    const name = artist;
    this.setState({ artist: '', name, hasLoading: true });
    const albumList = await searchAlbumsAPI(artist);
    console.log(albumList);
    this.setState({ hasLoading: false, albumArtist: albumList });
  }

  render() {
    const { hasDiseble,
      nameArtist, hasLoading, habilitInput,
      name, albumArtist } = this.state;
    return (
      <div data-testid="page-search">

        <Header />
        <h1 className="titleSeach">search</h1>
        {hasLoading ? <Loading />
          : (
            <div className="form">
              <Form className="form-login d-grid gap-2 formAll">
                <Form.Group className="mb-3 " controlId="formBasicName">
                  <Form.Label htmlFor="artistInput">

                    <Form.Control
                      className="input-control"
                      data-testid="search-artist-input"
                      type="text"
                      name="artistInput"
                      value={ nameArtist }
                      disabled={ habilitInput }
                      onChange={ this.handleChageInput }
                    />
                  </Form.Label>
                </Form.Group>
                <Button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ hasDiseble }
                  onClick={ this.onClickButton }
                  size="lg"
                  className="buttonPesquisa"
                >
                  Pesquisa
                </Button>
              </Form>
              {albumArtist.length <= 0
                ? (
                  <span
                    className="warning"
                  >
                    Nenhum álbum foi encontrado
                    {' '}
                  </span>
                )
                : (
                  <>
                    <h1>
                      {`Resultado de álbuns de: ${name}`}
                    </h1>
                    <div className="container-fotos">

                      {albumArtist.map((artist, index) => (
                        <ul className="cardsfotos " key={ index }>
                          <li>
                            <img
                              className="cardImg "
                              src={ artist.artworkUrl100 }
                              alt={ artist.artistName }
                            />
                          </li>

                          <li>{artist.collectionName}</li>
                          <li>{artist.artistName}</li>
                          <li>
                            <Link
                              className="btn btn-primary buttonAlbum "
                              data-testid={ `link-to-album-${artist.collectionId}` }
                              to={ `/album/${artist.collectionId}` }
                            >
                              Album
                            </Link>

                          </li>

                        </ul>))}
                    </div>

                  </>)}
            </div>)}
      </div>);
  }
}
export default Search;
