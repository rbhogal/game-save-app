import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import './SavedGames.css';
import GamesSearchScroll from '../components/carousels/GamesSearchScroll';
import RemoveBookmarkGame from '../components/carousels/RemoveBookmarkGame';
import { selectUserKey, getUserData } from '../features/user/userSlice';
import { auth } from '../firebase';
import LoadingDots from './LoadingDots';
import Footer from './Footer';

const SavedGames = () => {
  const [savedGamesArr, setSavedGamesArr] = useState([]);
  const [userId, setUserId] = useState();
  const [savedGamesObj, setSavedGamesObj] = useState();
  const dispatch = useDispatch();
  const userKey = useSelector(selectUserKey);

  const removeGame = async gameKey => {
    try {
      const resp = await axios.delete(
        `https://game-save-default-rtdb.firebaseio.com/users/${userKey}/savedGames/${gameKey}.json`
      );
    } catch (err) {
      console.log(err.message);
    }
    getSavedGames();
  };

  const handleBookmarkClick = game => {
    for (const key in savedGamesObj) {
      if (savedGamesObj[key].id === game.id) {
        removeGame(key);
      }
    }
  };

  const getSavedGames = async () => {
    const resp = await axios.get(
      'https://game-save-default-rtdb.firebaseio.com/users/.json'
    );
    const { data: users } = await resp;
    for (const key in users) {
      if (users[key].userId === userId) {
        setSavedGamesObj(users[key].savedGames);
      }
    }
  };

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
  }, []);

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserData(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    getSavedGames();
  }, [userId]);

  useEffect(() => {
    convertObjToArr();
  }, [savedGamesObj]);

  const convertObjToArr = () => {
    if (!savedGamesObj) return;
    const updatedSavedGames = Object.values(savedGamesObj);
    const updatedSavedGamesRev = updatedSavedGames.reverse(); // Reversed order: Most recent saves
    setSavedGamesArr(updatedSavedGamesRev);
  };

  // console.log(savedGamesArr);
  // console.log(savedGamesObj);
  console.log('rendering...');
  return (
    <div className="SavedGames">
      {!_.isEmpty(savedGamesArr) ? (
        <GamesSearchScroll
          title="Saved Games"
          dots={true}
          infinite={false}
          bookmarkComponent={RemoveBookmarkGame}
          handleBookmarkClick={handleBookmarkClick}
          games={savedGamesArr}
        />
      ) : (
        <LoadingDots />
      )}
      {!_.isEmpty(savedGamesArr) && <Footer />}
    </div>
  );
};

export default SavedGames;
