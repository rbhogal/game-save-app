import React from 'react';
import Navbar from './components/header/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import Home from './components/Home';
import GameList from './components/games/GameList';
import Game from './components/games/Game';
import SavedGames from './components/games/SavedGames';

function App() {
  const isSignedIn = useSelector(state => state.users[0].isSignedIn);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        {isSignedIn && (
          <Route path="/savedgames" exact component={SavedGames} />
        )}
        <Route path="/gamelist" exact component={GameList} />
        <Route path="/gamelist/game" exact component={Game} />
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
