import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Game.css';
import { selectAppToken } from '../../features/admin/appTokenSlice';

const Game = () => {
  const token = useSelector(selectAppToken);
  const [gameId, setGameId] = useState('');
  const urlPath = window.location.pathname;
  console.log(gameId);
  const getGameId = () => {
    const index = urlPath.lastIndexOf('/');
    const gameId = urlPath.slice(index + 1, urlPath.length);
    setGameId(gameId);
  };

  useEffect(() => {
    getGameId();
  }, [urlPath]);

  useEffect(() => {
    if (gameId) getGameData();
  }, [gameId]);

  const getGameData = async () => {
    const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;

    try {
      const resp = await axios({
        url: url,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: `fields summary, cover.image_id, genres.name, name, total_rating; where id = ${gameId} & genres.name != null & cover.image_id != null; limit 48;`,
      });

      const { data } = await resp;
      console.log(data);
    } catch {
      throw 'Something went wrong';
    }
  };

  return (
    <div className="Game">
      <h1>Game</h1>
    </div>
  );
};

export default Game;
