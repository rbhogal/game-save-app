import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './SavedGames.css';
import GamesHorizontalScroll from './GamesHorizontalScroll';
import RemoveBookmarkGame from './RemoveBookmarkGame';
import {
  selectSavedGames,
  selectUserKey,
} from '../../features/users/userSlice';
import { auth } from '../../firebase';
import { getUserData } from '../../features/users/userSlice';
import axios from 'axios';

const SavedGames = () => {
  const [savedGamesArr, setSavedGamesArr] = useState([]);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const savedGamesObj = useSelector(selectSavedGames);
  const dispatch = useDispatch();
  const userKey = useSelector(selectUserKey);

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

  useEffect(() => {
    convertObjToArr();
  }, [savedGamesObj]);

  const convertObjToArr = () => {
    const updatedSavedGames = Object.values(savedGamesObj);
    setSavedGamesArr(updatedSavedGames);
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
      // console.log(savedGamesObj[key].id);
      if (savedGamesObj[key].id === game.id) {
        removeGame(key);
      }
    }
  };

  return (
    <div className="SavedGames">
      <GamesHorizontalScroll
        dots={true}
        bookmarkComponent={RemoveBookmarkGame}
        handleBookmarkClick={handleBookmarkClick}
        games={savedGamesArr}
      />
    </div>
  );
};

export default SavedGames;
