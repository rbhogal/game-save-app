import React, { useContext, useEffect } from 'react';
import Navbar from './components/header/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import GameList from './components/games/GameList';
import Game from './components/games/Game';
import SavedGames from './components/games/SavedGames';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;


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
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
