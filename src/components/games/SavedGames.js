import React, { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import './SavedGames.css';
import GamesHorizontalScroll from './GamesHorizontalScroll';
import RemoveBookmarkGame from './RemoveBookmarkGame';
import {
  selectSavedGames,
  selectUserKey,
} from '../../features/users/userSlice';
import { auth } from '../../firebase';
import { getUserData } from '../../features/users/userSlice';
import LoadingPage from '../LoadingPage';

const SavedGames = () => {
  const [savedGamesArr, setSavedGamesArr] = useState([]);

  const [userId, setUserId] = useState();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  // const savedGamesObj = useSelector(selectSavedGames);
  const [savedGamesObj, setSavedGamesObj] = useState();

  const dispatch = useDispatch();
  const userKey = useSelector(selectUserKey);

  /* 
    Redux is too damn slow, just fetch the games Objects directly in here.
  */

  // Helper Function (DRY: Also in Home.js)
  const getUserIdFirebase = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setUserId(user.uid);
      } else {
        // User is signed out
        setUserId(null);
      }
    });
  };

  useEffect(() => {
    getUserIdFirebase();
  });

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserData(userId));
  }, [dispatch, userId]);

  useEffect(async () => {
    const resp = await axios.get(
      'https://game-save-default-rtdb.firebaseio.com/users/.json'
    );
    const { data: users } = await resp;
    for (const key in users) {
      if (users[key].userId === userId) {
        setSavedGamesObj(users[key].savedGames);
      }
    }
  }, [savedGamesObj, userId]);

  useEffect(() => {
    convertObjToArr();
  }, [savedGamesObj]);

  const convertObjToArr = () => {
    if (!savedGamesObj) return;
    const updatedSavedGames = Object.values(savedGamesObj);
    const updatedSavedGamesRev = updatedSavedGames.reverse(); // Reversed order: Most recent saves
    setSavedGamesArr(updatedSavedGamesRev);
  };

  const removeGame = async gameKey => {
    try {
      const resp = await axios.delete(
        `https://game-save-default-rtdb.firebaseio.com/users/${userKey}/savedGames/${gameKey}.json`
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBookmarkClick = game => {
    for (const key in savedGamesObj) {
      if (savedGamesObj[key].id === game.id) {
        removeGame(key);
      }
    }
  };

  return (
    <div className="SavedGames">
      {savedGamesObj && (
        <GamesHorizontalScroll
          title="Saved Games"
          dots={true}
          infinite={false}
          bookmarkComponent={RemoveBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={savedGamesArr}
        />
      )}

      {!savedGamesObj && <LoadingPage />}
    </div>
  );
};

export default SavedGames;
