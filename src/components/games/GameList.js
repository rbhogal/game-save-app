import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectAppToken } from '../../features/admin/appTokenSlice';
import GamesSearchScroll from './GamesSearchScroll';
import './GameList.css';
import AuthContext from '../../store/auth-context';
import AddBookmarkGame from './AddBookmarkGame';
import { storeBookmark, selectUserKey } from '../../features/users/userSlice';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const token = useSelector(selectAppToken);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const authCtx = useContext(AuthContext);
  const newSearch = authCtx.search;
  const isSignedIn = authCtx.isSignedIn;
  const userKey = useSelector(selectUserKey);

  useEffect(() => {
    setSearch(newSearch);
  }, [newSearch]);

  const searchGames = () => {
    const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;

    setIsLoading(true);
    axios({
      url: url,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: `search"${search}"; fields summary, cover.image_id, genres.name, name, total_rating; where genres.name != null & cover.image_id != null; limit 48;`,
    })
      .then(resp => {
        setGames(resp.data);
      })
      .catch(err => {
        // alert(err.message);
        console.log(err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (token && search) searchGames();
    // setIsLoading(false);
  }, [token, search]);

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
    <div className="GameList">
      {!isLoading && (
        <GamesSearchScroll
          handleBookmarkClick={handleBookmarkClick}
          bookmarkComponent={AddBookmarkGame}
          search={search}
          games={games}
        />
      )}
      {/* {isLoading && <p>Loading...</p>} */}
    </div>
  );
};

export default GameList;
