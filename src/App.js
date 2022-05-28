import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Search from './pages/search/Search';
import Album from './pages/album/Album';
import Favorites from './pages/favorito/Favorites';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profileEdit/ProfileEdit';
import NotFound from './pages/notFound/NotFound';
import './App.css';

class App extends React.Component {
  render() {
    return (

      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
