import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import Navbar from './components/header/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home from './components/Home';
import GameList from './components/games/GameList';
import Game from './components/games/Game';
import SavedGames from './components/games/SavedGames';
import GameListGenre from './components/games/GameListGenre';
import AuthContext from './store/auth-context';
import { addAppToken, selectIsLoading } from './features/admin/appTokenSlice';

function App() {
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const getAppToken = async () => {
    // Helper Function
    const calcRemainingTime = expirationTime => {
      // expirationTime is in seconds, getTime is in ms. Convert it also to ms.

      const currTime = new Date().getTime();
      // const adjExpirationTime = new Date(expirationTime).getTime();
      const adjExpirationTime = new Date(
        new Date().getTime() + expirationTime * 1000
      );

      const remainingDuration = adjExpirationTime - currTime;

      return remainingDuration;
    };

    // Helper function
    const getNewToken = async () => {
      // Get token from Twitch
      const respTwitch = await axios.post(
        `https://id.twitch.tv/oauth2/token`,
        null,
        {
          params: {
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            grant_type: 'client_credentials',
          },
        }
      );
      const { data } = respTwitch;

      // Store token and expiration time to firebase
      axios
        .put('https://game-save-default-rtdb.firebaseio.com/admin.json', {
          expiresIn: data.expires_in,
          token: data.access_token,
        })
        .then(console.log(data.access_token))
        .catch(err => {
          alert(err.message);
        });
    };

    // GET APP TOKEN
    // Get New Token If it Expires & dispatch token to redux
    try {
      // Get token's expiration time from firebase
      const respFirebase = await axios.get(
        'https://game-save-default-rtdb.firebaseio.com/admin.json'
      );
      const { data: dataFirebase } = respFirebase;

      const expirationTime = dataFirebase.expiresIn;
      const token = dataFirebase.token;

      const remainingDuration = calcRemainingTime(expirationTime);

      // Gets new token when token expires
      setTimeout(getNewToken, remainingDuration);

      //dispatch token to store
      dispatch(
        addAppToken({
          token: token,
        })
      );
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getAppToken();
  }, []);

  return (
    <div className="App">
      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
      />
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
    </div>
  );
}

export default App;
