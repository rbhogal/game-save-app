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
  const [isLoading, setIsLoading] = useState(true);

  const isSignedIn = authCtx.isSignedIn;
  const token = useSelector(selectAppToken);
  const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const userKey = useSelector(selectUserKey);

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

  const calcTimeTwoYears = () => {
    Date.now();
    /* 
    Knowns 
    ------------
    Current time (in ms) = Date.now()

    
    Unknowns
    -----------



    METHODS
    ---------
    Date.now() -- number of ms elapsed since January 1, 1970
    Date() -- number in ms since 1 January 1970 UTC

    Calculate Two Years Ago starting today (updates everyday)

    Current time - 2 Years (in ms?)

    Current time (in ms) = Date.now()

    2 years ago in ms = 

    Date.now() - ( Date.now() - Date(2 years) )


    every new day update
    const twoYearsAgo = 
 */
  };

  const getAllGamesRequest = async () => {
    setIsLoading(true);

    // POPULAR GAMES

    try {
      const respPopularGames = await axios({
        url: url,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: 'fields summary, cover.image_id, genres.name, name, total_rating; where platforms =(6, 48, 49, 130) & rating_count > 75 & first_release_date > 1577921959; limit 32;',
      });

      const { data: popularGames } = await respPopularGames;
      setPopularGames(popularGames);

      // // MOST ANTICIPATED GAMES
      const respAnticipatedGames = await axios({
        url: url,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: 'fields summary, cover.image_id, genres.name, name, total_rating; where genres.name != null & cover.image_id != null & platforms =(6, 48, 49, 130); sort hypes asc; limit 32;',
      });

      const { data: anticipatedGames } = await respAnticipatedGames;
      setAnticipatedGames(anticipatedGames);

      // // RECENTLY RELEASED GAMES
    } catch {
      throw Error('Something went wrong');
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
          bookmarkComponent={AddBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={popularGames}
        />
      )}

      {!isLoading && (
        <GamesHorizontalScroll
          title={'Most Anticipated'}
          dots={false}
          bookmarkComponent={AddBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={anticipatedGames}
        />
      )}

      {!isLoading && (
        <GamesHorizontalScroll
          title={'Recent Releases'}
          dots={false}
          bookmarkComponent={AddBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={popularGames}
        />
      )}
    </div>
  );
};

export default Home;
