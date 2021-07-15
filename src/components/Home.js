import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Slider from 'react-slick';

import './Home.css';
import GamesHorizontalScroll from './games/GamesHorizontalScroll';
import { selectAppToken } from '../features/admin/appTokenSlice';

const Home = () => {
  const [popularGames, setPopularGames] = useState([]);

  const token = useSelector(selectAppToken);

  const getPopularGamesRequest = () => {
    const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;

    axios({
      url: url,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: 'fields cover.image_id, genres.name, name, total_rating; where platforms =(6, 48, 49, 130) & rating_count > 75 & first_release_date > 1577921959; limit 30;',
    })
      .then(resp => {
        console.log(resp.data);
        setPopularGames(resp.data);
      })
      .catch(err => {
        // alert(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) getPopularGamesRequest();
  }, [token]);

  return (
    <div className="">
      <GamesHorizontalScroll popularGames={popularGames} />
    </div>
  );
};

export default Home;
