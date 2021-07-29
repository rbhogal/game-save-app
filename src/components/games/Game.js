import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Game.css';
import { selectAppToken } from '../../features/admin/appTokenSlice';

const Game = () => {
  const token = useSelector(selectAppToken);
  const [gameId, setGameId] = useState('');
  const [gameData, setGameData] = useState([]);
  const urlPath = window.location.pathname;
  // const [isLoading, setIsLoading] = useState(true);
  const getGameId = () => {
    const index = urlPath.lastIndexOf('/');
    const gameId = urlPath.slice(index + 1, urlPath.length);
    setGameId(gameId);
  };

  const getGameData = async () => {
    console.log('i ran');
    console.log(gameId);

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
      setGameData(data[0]);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getGameId();
  }, []);

  useEffect(() => {
    if (gameId) getGameData();
  }, [gameId]);

  return (
    <div className="Game">
      {gameData.name}: &nbsp; <br />
      {gameData.summary}
    </div>
  );
};

export default Game;
