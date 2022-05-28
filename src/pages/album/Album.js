import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../../services/musicsAPI';
import Loading from '../loading/Loading';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      listCantor: [],
      listMusic: [],
      musicaFav: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({ isLoading: true });
    const music = await getMusics(id);
    const musicList = music.filter(({ kind }) => kind === 'song');
    let musicFav = await getFavoriteSongs();
    if (musicFav.length <= 0) {
      musicFav = [];
    }
    console.log(musicFav);
    this.setState({
      isLoading: false,
      listCantor: music[0],
      listMusic: musicList,
      musicaFav: musicFav });
  }

  render() {
    const { isLoading, listCantor, listMusic, musicaFav } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name" className="artist-name">{listCantor.artistName}</h2>
        <h3
          data-testid="album-name"
          className="album-name"
        >
          {listCantor.collectionName}

        </h3>
        <div className="album-cards">
          { isLoading ? <Loading />
            : (listMusic.map((music, index) => (
              <MusicCard
                trackName={ music.trackName }
                key={ index }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                id={ music }
                favorito={ musicaFav.some((musica) => musica.trackId === music.trackId) }
                isAlbum
                atualizaSong={ undefined }
              />
            )))}
        </div>
      </div>);
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
