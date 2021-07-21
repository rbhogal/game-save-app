import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Slider from 'react-slick';

import './Home.css';
import GamesHorizontalScroll from './games/GamesHorizontalScroll';
import { selectAppToken } from '../features/admin/appTokenSlice';
import LoadingPage from './LoadingPage';
import AuthContext from '../store/auth-context';

const Home = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [anticipatedGames, setAnticipatedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedGames, setBookmarkedGames] = useState([]);
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const token = useSelector(selectAppToken);
  const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;

  console.log(bookmarkedGames);

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

  const handleBookmarkClick = game => {
    // If logged in, store to database / If NOT logged in prompt user to login and return
    // console.log(e.target.id);

    if (!isSignedIn) return alert('Sign in to save!');

    if (isSignedIn) {
      // save game to bookmarked games
      const newBookmarkedGames = [...bookmarkedGames, game];
      setBookmarkedGames(newBookmarkedGames);
    }
  };

  return (
    <div className="Home">
      {isLoading && <LoadingPage />}
      <div className="category">
        <h1>Popular games</h1> &nbsp;
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <GamesHorizontalScroll
        handleBookmarkClick={handleBookmarkClick}
        games={popularGames}
      />
      <div className="category">
        <h1>Most Anticipated</h1> &nbsp;
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <GamesHorizontalScroll
        handleBookmarkClick={handleBookmarkClick}
        games={anticipatedGames}
      />
      <div className="category">
        <h1>Recently Released</h1> &nbsp;
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <GamesHorizontalScroll
        handleBookmarkClick={handleBookmarkClick}
        games={popularGames}
      />
    </div>
  );
};

export default Home;
