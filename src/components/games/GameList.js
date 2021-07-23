import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectAppToken } from '../../features/admin/appTokenSlice';
import GamesMultipleRowsScroll from './GamesMultipleRowsScroll';
import './GameList.css';
import AuthContext from '../../store/auth-context';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const token = useSelector(selectAppToken);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const authCtx = useContext(AuthContext);
  const newSearch = authCtx.search;
  // console.log(`Retrieving search: '${search}', from state`);

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

  return (
    <div className="GameList">
      {!isLoading && <GamesMultipleRowsScroll search={search} games={games} />}
      {/* {isLoading && <p>Loading...</p>} */}
    </div>
  );
};

export default GameList;
