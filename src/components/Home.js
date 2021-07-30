import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import './Home.css';
import GamesHorizontalScroll from './games/GamesHorizontalScroll';
import {
  selectAppToken,
  addLoadingState,
} from '../features/admin/appTokenSlice';
import LoadingPage from './LoadingPage';
import AuthContext from '../store/auth-context';
import { getUserData, storeBookmark } from '../features/users/userSlice';
import { auth } from '../firebase';
import { selectUserKey } from '../features/users/userSlice';
import AddBookmarkGame from './games/AddBookmarkGame';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [popularGames, setPopularGames] = useState([]);
  const [anticipatedGames, setAnticipatedGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSignedIn = authCtx.isSignedIn;
  const token = useSelector(selectAppToken);
  const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const userKey = useSelector(selectUserKey);

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let releaseDate = Math.round(new Date(year - 1, month, day).getTime() / 1000);

  let currentDate = Math.round(new Date().getTime() / 1000);

  // Helper Functions
  const getUserIdFirebase = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setUserId(user.uid);
      } else {
        // User is signed out
        setUserId(null);
      }
    });
  };

  useEffect(() => {
    dispatch(addLoadingState(isLoading));
  });

  useEffect(() => {
    getUserIdFirebase();
  });

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserData(userId));
  }, [dispatch, userId]);

  const getAllGamesRequest = async () => {
    setIsLoading(true);

    try {
      // POPULAR GAMES
      const respPopularGames = await axios({
        url: url,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: 'fields summary, cover.image_id, genres.name, name, total_rating; sort first_release_date desc; where platforms =(6, 48, 49, 130) & rating_count > 75 & genres.name != null & cover.image_id != null; limit 48;',
      });

      const { data: popularGames } = await respPopularGames;
      setPopularGames(popularGames);

      const respAnticipatedGames = await axios({
        url: 'https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/release_dates/',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: `fields game.summary, game.cover.image_id, game.genres.name, game.name, game.total_rating; where date > ${currentDate} & game.hypes > 10 & game.genres.name != null & game.cover.image_id != null & game.platforms =(6, 48, 49, 130); sort date desc; limit 16;`,
      });

      const { data: anticipatedGamesIGDB } = await respAnticipatedGames;
      let anticipatedGamesArr = [];
      for (const key of anticipatedGamesIGDB) {
        anticipatedGamesArr.push(key.game);
      }

      setAnticipatedGames(anticipatedGamesArr);

      // // RECENTLY RELEASED GAMES
      const respRecentGames = await axios({
        url: 'https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/release_dates/',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: `fields game.summary, game.cover.image_id, game.genres.name, game.name, game.total_rating; where date < ${currentDate} & game.genres.name != null & game.cover.image_id != null & game.platforms =(6, 48, 49, 130); sort date desc; limit 16;`,
      });

      const { data: recentGamesIGDB } = await respRecentGames;
      let recentGamesArr = [];

      for (const key of recentGamesIGDB) {
        recentGamesArr.push(key.game);
      }

      setRecentGames(recentGamesArr);
    } catch (err) {
      throw Error(err.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (token) getAllGamesRequest();
  }, [token]);

  // DRY: Repeat code in GameList.js
  const checkGameExists = async gameId => {
    let gameExists = false;

    try {
      const resp = await axios.get(
        `https://game-save-default-rtdb.firebaseio.com/users/${userKey}/savedGames.json`
      );

      const { data: savedGames } = await resp;

      for (const game in savedGames) {
        if (savedGames[game].id === gameId) {
          gameExists = true;
        }
      }

      if (gameExists) {
        gameExists = false;
        return true;
      }

      if (!gameExists) {
        return false;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // DRY: Repeat code in GameList.js
  const handleBookmarkClick = async game => {
    if (!isSignedIn) return alert('Sign in to save!');

    const gameExists = await checkGameExists(game.id);

    if (gameExists) {
      alert('Already saved!');
    }

    if (!gameExists) {
      dispatch(
        storeBookmark({
          key: userKey,
          game: game,
        })
      );
      return alert('saved!');
    }
  };

  return (
    <div className="Home">
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <GamesHorizontalScroll
          title={'Popular Games'}
          dots={false}
          infinite={true}
          bookmarkComponent={AddBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={popularGames}
        />
      )}

      {!isLoading && (
        <GamesHorizontalScroll
          title={'Most Anticipated'}
          dots={false}
          infinite={true}
          bookmarkComponent={AddBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={anticipatedGames}
        />
      )}

      {!isLoading && (
        <GamesHorizontalScroll
          title={'Recent Releases'}
          dots={false}
          infinite={true}
          bookmarkComponent={AddBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={recentGames}
        />
      )}
    </div>
  );
};

export default Home;
