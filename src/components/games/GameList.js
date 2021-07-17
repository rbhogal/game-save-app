import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { selectAppToken } from '../../features/admin/appTokenSlice';
import GamesMultipleRowsScroll from './GamesMultipleRowsScroll';
import './GameList.css';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectAppToken);

  // Pull search from redux

  useEffect(() => {
    if (token) searchGames();
  }, [token]);

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
      data: `search"call of duty"; fields summary, cover.image_id, genres.name, name, total_rating; where platforms = (6, 48, 49, 130); limit 48;`,
    })
      .then(resp => {
        setGames(resp.data);
        console.log(resp.data);
        setIsLoading(false);
      })
      .catch(err => {
        // alert(err.message);
        console.log(err);
      });
  };

  return (
    <div className="GameList">
      <GamesMultipleRowsScroll games={games} />
    </div>
  );
};

export default GameList;
