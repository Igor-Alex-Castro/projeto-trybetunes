import React from 'react';
import Header from '../../components/Header/Header';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../loading/Loading';
import './favorite.css';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listFav: [],
      isLoading: false,
    };
    this.atualizaSong = this.atualizaSong.bind(this);
  }

  async componentDidMount() {
    await this.atualizaSong();
  }

  async atualizaSong() {
    this.setState({ isLoading: true });
    const listFav = await getFavoriteSongs();
    this.setState({ isLoading: false, listFav });
  }

  render() {
    const { isLoading, listFav } = this.state;
    return (
      <div data-testid="page-favorites">
        <div>

          <Header />

          <section>
            { isLoading ? <Loading />
              : (
                <div className="CARDS">
                  {
                    listFav.map((music, index) => (
                      <MusicCard
                        key={ index }
                        trackName={ music.trackName }
                        previewUrl={ music.previewUrl }
                        trackId={ music.trackId }
                        id={ music }
                        favorito
                        atualizaSong={ this.atualizaSong }
                        isAlbum={ false }
                      />

                    ))
                  }
                </div>)}
          </section>

        </div>
      </div>
    );
  }
}
export default Favorites;
