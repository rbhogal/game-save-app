import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectAppToken } from '../../features/admin/appTokenSlice';
import GamesMultipleRowsScroll from './GamesMultipleRowsScroll';
import './GameList.css';
import { getSearchAsync } from '../../features/users/userSlice';
import AuthContext from '../../store/auth-context';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectAppToken);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  // const search = useSelector(state => state.user.search);
  // const [newSearch, setNewSearch] = useState('');
  // const [prevSearch, setPrevSearch] = useState('');
  const authCtx = useContext(AuthContext);
  const newSearch = authCtx.search;
  console.log(`athCtx search = ${newSearch}`);
  // console.log(`Retrieving search: '${search}', from state`);

  // useEffect(() => {
  //   dispatch(getSearchAsync());
  // }, [dispatch]);

  useEffect(() => {
    setSearch(newSearch);
  }, [newSearch]);

  const searchGames = () => {
    const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;

    // setIsLoading(true);
    axios({
      url: url,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: `search"${search}"; fields summary, cover.image_id, genres.name, name, total_rating; where platforms = (6, 48, 49, 130); limit 48;`,
    })
      .then(resp => {
        setGames(resp.data);
        // setIsLoading(false);
      })
      .catch(err => {
        // alert(err.message);
        console.log(err);
      });
  };
  /* 
  useEffect(() => {
    const checkNewSearch = () => {
      const newSearch = localStorage.getItem('search');
      if (newSearch) {
        setSearch(newSearch);
        console.log(`new search: ${newSearch}`);
      } else {
        console.log('did not set search');
      }
    };

    window.addEventListener('storage', checkNewSearch());

    return () => {
      window.removeEventListener('storage', checkNewSearch());
    };
    // dispatch(getSearchAsync());

    // console.log(`4) getting search from database...`);
    // console.log(`Search from firebase ${search}`);

    // if (token ) {
    //   dispatch(getSearchAsync());
    //   console.log(`4) getting search from database...`);
    // }
  }, []);
 */

  useEffect(() => {
    if (token && search) searchGames();
    setIsLoading(false);
  }, [token, search]);

  return (
    <div className="GameList">
      {!isLoading && <GamesMultipleRowsScroll games={games} />}
    </div>
  );
};

export default GameList;
