import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/loading/Loading';
import './musicaCard.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFaforite: false,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.addFavoritos = this.addFavoritos.bind(this);
  }

  componentDidMount() {
    const { favorito } = this.props;
    if (favorito) {
      this.setState({
        isFaforite: true,
      });
    }
  }

  onChangeInput({ target }) {
    const { checked } = target;
    this.setState({
      isFaforite: checked,
    }, () => this.addFavoritos());
  }

  async addFavoritos(event) {
    const { isFaforite } = this.state;
    const { id, atualizaSong, isAlbum } = this.props;
    console.log(event);
    if (isFaforite) {
      this.setState({ isLoading: true });
      await addSong(id);
      this.setState({ isLoading: false });
    }
    if (!isFaforite) {
      this.setState({ isLoading: true });
      await removeSong(id);
      this.setState({ isLoading: false });
      if (!isAlbum) {
        await atualizaSong();
      }
    }
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isLoading, isFaforite } = this.state;
    return (
      <div className="musicas">
        { isLoading
          ? (<Loading />)
          : (

            <div className="musicasAdio">
              <p className="track-name">{trackName}</p>

              <audio
                data-testid="audio-component"
                src={ previewUrl }
                preload="auto"
                id="plyaer"
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ trackId } className="label-check-box">
                Favorita
                <input
                  type="checkbox"
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  className="check-box chk"
                  checked={ isFaforite }
                  atualizaSong={ this.atualizaSong }
                  onChange={ this.onChangeInput }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorito: PropTypes.bool.isRequired,
  id: PropTypes.shape().isRequired,
  atualizaSong: PropTypes.func.isRequired,
  isAlbum: PropTypes.bool.isRequired,
};
export default MusicCard;
