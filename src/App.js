import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  lazy,
  Suspense,
} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import AuthContext from './store/auth-context';
import { addAppToken } from './features/admin/appTokenSlice';

import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import Game from './components/game/Game';
import LoadingDots from './components/LoadingDots';
import GameList from './components/GameList';
import GameListGenre from './components/GameListGenre';
import SavedGames from './components/SavedGames';

function App() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const dispatch = useDispatch();
  const [remainingDuration, setRemainingDuration] = useState(60000);

  // Helper Function
  const calcRemainingTime = expiresIn => {
    // expirationTime is in seconds, getTime is in ms. Convert it also to ms.

    const expirationTime = new Date(
      new Date().getTime() + expiresIn * 1000
    ).toISOString();
    const currTime = new Date().getTime();

    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currTime;
    return remainingDuration;
  };

  return (
    <div className="App">
      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
      />
      <Suspense fallback={LoadingDots}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />

          {isSignedIn && (
            <Route path="/savedgames" exact component={SavedGames} />
          )}
          <Route path="/gamelist/games" exact component={GameList} />
          <Route path="/gamelist/games/:game/:id" exact component={Game} />
          <Route
            path="/gamelist/genres/:genre/:id"
            exact
            component={GameListGenre}
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
