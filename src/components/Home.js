import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import GamesHorizontalScroll from './games/GamesHorizontalScroll';

const Home = () => {
  const [popularGames, setPopularGames] = useState([
    {
      id: 109462,
      cover: {
        id: 103813,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co283p.jpg',
      },
      genres: [13],
      name: 'Animal Crossing: New Horizons',
      total_rating: 86.5764287247872,
    },
    {
      id: 119313,
      cover: {
        id: 113695,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co2fq7.jpg',
      },
      genres: [8, 14, 31, 32],
      name: 'Fall Guys: Ultimate Knockout',
      total_rating: 80.7468784863155,
    },
    {
      id: 21642,
      cover: {
        id: 87347,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co1veb.jpg',
      },
      genres: [13, 15, 32],
      name: 'Totally Accurate Battle Simulator',
      total_rating: 63.3327776652141,
    },
    {
      id: 1877,
      cover: {
        id: 122536,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co2mjs.jpg',
      },
      genres: [12],
      name: 'Cyberpunk 2077',
      total_rating: 75.81197071831465,
    },
    {
      id: 26950,
      cover: {
        id: 111950,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co2edq.jpg',
      },
      genres: [31],
      name: 'Marvel\u0027s Avengers',
      total_rating: 60.9905050515301,
    },
    {
      id: 11169,
      cover: {
        id: 81567,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co1qxr.jpg',
      },
      genres: [12, 31],
      name: 'Final Fantasy VII Remake',
      total_rating: 88.67126531221646,
    },
    {
      id: 75235,
      cover: {
        id: 109855,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co2crj.jpg',
      },
      genres: [31],
      name: 'Ghost of Tsushima',
      total_rating: 90.72742309357724,
    },
    {
      id: 26192,
      cover: {
        id: 81672,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.jpg',
      },
      genres: [5, 31],
      name: 'The Last of Us Part II',
      total_rating: 94.18308158215274,
    },
    {
      id: 103298,
      cover: {
        id: 75007,
        url: '//images.igdb.com/igdb/image/upload/t_cover_big/co1lvj.jpg',
      },
      genres: [5],
      name: 'DOOM Eternal',
      total_rating: 84.7518961508708,
    },
  ]);

  const [token, setToken] = useState('');
  useEffect(async () => {
    // fetch app access token from firebase
    try {
      // Get token's expiration time from firebase
      const resp = await axios.get(
        'https://game-save-default-rtdb.firebaseio.com/admin.json'
      );
      const { data } = resp;

      const token = data.token;
      setToken(token);

      // Gets new token when token expires
    } catch (err) {
      alert(err.message);
    }
  }, [token]);

  const getPopularGamesRequest = () => {
    const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;

    // const resp = await axios.post(
    //   url,
    //   {
    //     data: 'fields cover.url, genres.name, name, total_rating; where platforms =(6, 48, 49, 130) & rating_count > 75 & first_release_date > 1577921959; limit 30;',
    //   },
    //   {
    //     headers: {
    //       Accept: 'application/json',
    //       'Client-ID': process.env.REACT_APP_CLIENT_ID,
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    //   const respJson = await resp.json();

    axios({
      url: url,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: 'fields cover.url, genres.name, name, total_rating; where platforms =(6, 48, 49, 130) & rating_count > 75 & first_release_date > 1577921959; limit 30;',
    })
      .then(resp => {
        // const respJson = resp.json();

        console.log(resp);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  getPopularGamesRequest();

  return (
    <div className="Home container-fluid">
      <div className="row">
        <GamesHorizontalScroll popularGames={popularGames} />
      </div>
    </div>
  );
};

export default Home;
