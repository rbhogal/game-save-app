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

const LoadingDots = lazy(() => import('./components/LoadingDots'));
const GameList = lazy(() => import('./components/GameList'));
const Game = lazy(() => import('./components/game/Game'));
const SavedGames = lazy(() => import('./components/SavedGames'));
const GameListGenre = lazy(() => import('./components/GameListGenre'));

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
      .then()
      .catch(err => {
        alert(err.message);
      });
  };

  const getAppToken = useCallback(async () => {
    // GET APP TOKEN
    // Get New Token If it Expires & dispatch token to redux
    try {
      // Get token's expiration time from firebase
      const respFirebase = await axios.get(
        'https://game-save-default-rtdb.firebaseio.com/admin.json'
      );
      const { data: dataFirebase } = respFirebase;

      const expiresIn = dataFirebase.expiresIn; // in seconds
      const token = dataFirebase.token;

      setRemainingDuration(calcRemainingTime(expiresIn));

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
  }, [dispatch]);

  useEffect(() => {
    // Now handled by AWS Stack
    getAppToken();
  }, [getAppToken]);

  useEffect(() => {
    setTimeout(getNewToken, remainingDuration);
  }, [remainingDuration]);

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
