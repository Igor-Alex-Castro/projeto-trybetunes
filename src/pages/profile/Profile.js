import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Header/Header';
import { getUser } from '../../services/userAPI';
import Loading from '../loading/Loading';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataUser: '',
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const dataUser = await getUser();
    this.setState({ isLoading: false, dataUser });
    console.log(dataUser);
  }

  render() {
    const { isLoading, dataUser } = this.state;
    return (
      <div data-testid="page-profile">

        <Header />

        <div className="content-profile">
          {isLoading ? <Loading />
            : (
              <div className="card-profile">
                <h1 className="dada-user-name">
                  { dataUser.name}
                </h1>
                <p className="data-user-email">{dataUser.email}</p>
                <div className="data-user-img">
                  <img
                    src={ dataUser.image }
                    alt={ dataUser.name }
                    data-testid="profile-image"
                    className="profile-image"
                  />
                </div>
                <h3 className="data-user-description">{dataUser.description}</h3>
                <Link
                  className="btn btn-primary buttonAlbum "
                  to="/profile/edit"
                >
                  Editar perfil

                </Link>
              </div>
            )}
        </div>
      </div>);
  }
}
export default Profile;
