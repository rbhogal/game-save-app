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
  const [isLoading, setIsLoading] = useState(true);
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
    console.log('3. still getting saved games...');
    const resp = await axios.get(
      'https://game-save-default-rtdb.firebaseio.com/users/.json'
    );
    const { data: users } = await resp;
    for (const key in users) {
      if (users[key].userId === userId) {
        console.log(`4. Got saved games: ${users[key].savedGames}`);
        users[key].savedGames
          ? setSavedGamesObj(users[key].savedGames)
          : setIsLoading(false);
      }
    }
  };

  // Helper Function (DRY: Also in Home.js)
  const getUserIdFirebase = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setUserId(user.uid);
        console.log('2. setting userId');
      } else {
        // User is signed out
        setUserId(null);
        console.log('2. user is signed out');
      }
    });
  };

  useEffect(() => {
    getUserIdFirebase();
    console.log('1. getting user id...');
  });

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserData(userId));
    console.log(`3. got user id = ${userId}`);
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      console.log('3. getting saved games...');
      getSavedGames();
    }
  }, [userId]);

  useEffect(() => {
    console.log('converting obj to arr');
    convertObjToArr();
  }, [savedGamesObj]);

  const convertObjToArr = () => {
    console.log('still converting obj to arr');
    if (!savedGamesObj) return;
    const updatedSavedGames = Object.values(savedGamesObj);
    const updatedSavedGamesRev = updatedSavedGames.reverse(); // Reversed order: Most recent saves
    setSavedGamesArr(updatedSavedGamesRev);
    setIsLoading(false);
  };
  console.log(isLoading);
  return (
    <div className="SavedGames">
      <GamesSearchScroll
        title="Saved Games"
        dots={true}
        infinite={false}
        bookmarkComponent={RemoveBookmarkGame}
        handleBookmarkClick={handleBookmarkClick}
        isLoading={isLoading}
        games={savedGamesArr}
      />
      {!_.isEmpty(savedGamesArr) && <Footer />}
    </div>
  );
};

export default SavedGames;
