import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

import GamesSearchScroll from './carousels/GamesSearchScroll';
import './GameList.css';
import AuthContext from '../store/auth-context';
import AddBookmarkGame from './carousels/AddBookmarkGame';
import { storeBookmark, selectUserKey } from '../features/user/userSlice';
import Footer from './Footer';

const GameListGenre = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const userKey = useSelector(selectUserKey);
  const [genreId, setGenreId] = useState('');
  const urlPath = window.location.pathname;
  const url = `https://42z5n298h4.execute-api.us-west-2.amazonaws.com/production/v4/games`;

  const searchAllGames = useCallback(() => {
    setIsLoading(true);
    axios({
      url: url,
      method: 'POST',
      headers: {
        'x-api-key': process.env.REACT_APP_AWS_API_DEFAULT_API_KEY,
      },
      data: `fields summary, cover.image_id, genres.name, name, total_rating; sort first_release_date desc; where first_release_date !=null &cover.image_id != null & total_rating >= 75; limit 48;`,
    })
      .then(resp => {
        setGames(resp.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [url]);

  const searchGenre = useCallback(() => {
    setIsLoading(true);
    axios({
      url: url,
      method: 'POST',
      headers: {
        'x-api-key': process.env.REACT_APP_AWS_API_DEFAULT_API_KEY,
      },
      data: `fields summary, cover.image_id, genres.name, name, total_rating; sort first_release_date desc; where genres=${genreId} & cover.image_id != null & total_rating >= 75 & first_release_date !=null; limit 48;`,
    })
      .then(resp => {
        setGames(resp.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [genreId, url]);

  useEffect(() => {
    const index = urlPath.lastIndexOf('/');
    const id = urlPath.slice(index + 1, urlPath.length);
    id !== 'all' ? setGenreId(id) : searchAllGames();
  }, [urlPath, searchAllGames]);

  useEffect(() => {
    if (genreId) searchGenre();
  }, [genreId, searchGenre]);

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
    if (!isSignedIn)
      return toast('Sign in!', {
        duration: 2000,
        icon: (
          <ion-icon
            style={{ fontSize: '2.5rem' }}
            name="person-circle-outline"
          ></ion-icon>
        ),
      });

    const gameExists = await checkGameExists(game.id);

    if (gameExists) {
      toast.error('Already saved!', {
        duration: 1000,
      });
    }

    if (!gameExists) {
      dispatch(
        storeBookmark({
          key: userKey,
          game: game,
        })
      );
      return toast.success('Saved', {
        duration: 1000,
      });
    }
  };

  return (
    <div className="GameList">
      <GamesSearchScroll
        isLoading={isLoading}
        handleBookmarkClick={handleBookmarkClick}
        bookmarkComponent={AddBookmarkGame}
        search={''}
        games={games}
      />
      {!isLoading && <Footer />}
    </div>
  );
};

export default GameListGenre;
