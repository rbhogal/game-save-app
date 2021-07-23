import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Slider from 'react-slick';

import './Home.css';
import GamesHorizontalScroll from './games/GamesHorizontalScroll';
import { selectAppToken } from '../features/admin/appTokenSlice';
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
  const [bookmarkedGames, setBookmarkedGames] = useState([]);

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

  const getPopularGamesRequest = () => {
    setIsLoading(true);
    axios({
      url: url,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: 'fields summary, cover.image_id, genres.name, name, total_rating; where platforms =(6, 48, 49, 130) & rating_count > 75 & first_release_date > 1577921959; limit 30;',
    })
      .then(resp => {
        setPopularGames(resp.data);
        setIsLoading(false);
      })
      .catch(err => {
        // alert(err.message);
        console.log(err);
      });
  };

  const getAnticipatedGamesRequest = () => {
    setIsLoading(true);
    axios({
      url: url,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: 'fields summary, cover.image_id, genres.name, name, total_rating; where platforms =(6, 48, 49, 130); sort hypes asc; limit 16;',
    })
      .then(resp => {
        setAnticipatedGames(resp.data);
        setIsLoading(false);
      })
      .catch(err => {
        // alert(err.message);
        console.log(err);
      });
  };

  const getRecentReleasedGamesRequest = () => {};

  useEffect(() => {
    if (token) getPopularGamesRequest();
    if (token) getAnticipatedGamesRequest();
  }, [token]);

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

  const handleBookmarkClick = async game => {
    if (!isSignedIn) return alert('Sign in to save!');

    // 1). UseEffect run through the saved games by making a get inside of
    //     userSlice. If game.id matches the id inside, return boolean to state.
    //     call it checkGameExists maybe...

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
      <div className="category">
        <h1>Popular Games</h1> &nbsp;
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <GamesHorizontalScroll
        bookmarkComponent={AddBookmarkGame}
        handleBookmarkClick={handleBookmarkClick}
        games={popularGames}
      />
      <div className="category">
        <h1>Most Anticipated</h1> &nbsp;
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <GamesHorizontalScroll
        bookmarkComponent={AddBookmarkGame}
        handleBookmarkClick={handleBookmarkClick}
        games={anticipatedGames}
      />
      <div className="category">
        <h1>Recently Released</h1> &nbsp;
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <GamesHorizontalScroll
        bookmarkComponent={AddBookmarkGame}
        handleBookmarkClick={handleBookmarkClick}
        games={popularGames}
      />
    </div>
  );
};

export default Home;
