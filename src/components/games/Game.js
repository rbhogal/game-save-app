import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import './Game.css';
import { selectAppToken } from '../../features/admin/appTokenSlice';
import AddBookmarkGame from './AddBookmarkGame';
import { selectUserKey, storeBookmark } from '../../features/users/userSlice';
import AuthContext from '../../store/auth-context';
import LoadingPage from '../LoadingPage';
import LoadingDots from '../LoadingDots';

const Game = () => {
  const token = useSelector(selectAppToken);
  const userKey = useSelector(selectUserKey);
  const [gameId, setGameId] = useState('');
  const [gameData, setGameData] = useState([]);

  const releaseYear = new Date(
    gameData.first_release_date * 1000
  ).getFullYear();
  const urlPath = window.location.pathname;
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const dispatch = useDispatch();

  const getGameId = () => {
    const index = urlPath.lastIndexOf('/');
    const gameId = urlPath.slice(index + 1, urlPath.length);
    setGameId(gameId);
  };

  const getGameData = async () => {
    console.log('Getting data...');
    console.log(`Game id: ${gameId}`);
    console.log(`Token: ${token}`);
    const url = `https://game-save-cors-proxy.herokuapp.com/https://api.igdb.com/v4/games`;

    setIsLoading(true);
    try {
      const resp = await axios({
        url: url,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: `fields summary, first_release_date, cover.image_id, genres.name, name, total_rating; where id = ${gameId} & genres.name != null & cover.image_id != null;`,
      });

      const { data } = await resp;
      setGameData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getGameId();
  }, []);

  useEffect(() => {
    if (gameId) {
      if (token) getGameData();
    }
  }, [gameId, token]);

  // DRY: Repeat code in GameList.js
  const checkGameExists = async gameId => {
    let gameExists = false;

    try {
      const resp = await axios.get(
        `https://game-save-default-rtdb.firebaseio.com/users/${userKey}/savedGames.json`
      );

      const { data: savedGames } = await resp;

      for (const game in savedGames) {
        if (savedGames[game].id === gameId) {
          gameExists = true;
        }
      }

      if (gameExists) {
        gameExists = false;
        return true;
      }

      if (!gameExists) {
        return false;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // DRY: Repeat code in GameList.js
  const handleBookmarkClick = async game => {
    if (!isSignedIn) return alert('Sign in to save!');

    const gameExists = await checkGameExists(game.id);

    if (gameExists) {
      alert('Already saved!');
    }

    if (!gameExists) {
      dispatch(
        storeBookmark({
          key: userKey,
          game: game,
        })
      );
      return alert('saved!');
    }
  };

  return (
    <div className="Game">
      {isLoading && <LoadingDots />}
      {!isLoading && (
        <>
          <section className="game-main-section">
            <img
              className="game-img"
              src={`//images.igdb.com/igdb/image/upload/t_cover_big/${gameData.cover.image_id}.jpg`}
              alt={gameData.name}
            ></img>

            <div className="game-main-content">
              <div className="game-main-content-text">
                <h1 className="game-title">{gameData.name}</h1>
                <h2 className="game-release-year">{releaseYear}</h2>
                <h2 className="game-genre">{gameData.genres[0].name}</h2>
              </div>

              <div className="game-rating-bookmark-div">
                <div className="game-rating-box">
                  <p className="game-rating">
                    {Math.round(gameData.total_rating)}
                  </p>
                </div>
                <ion-icon name="add"></ion-icon>
              </div>
            </div>
          </section>
          <section className="game-slide-section"></section>

          <section className="game-details-section">
            <div className="game-summary-div">
              <div className="heading-container">
                <h3 className="game-summary-heading">Summary</h3>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>

              <p className="game-summary-content">{gameData.summary}</p>
            </div>

            <div className="game-right-column">
              <div className="game-info-div">
                <div className="heading-container">
                  <h3 className="game-info-heading">Information</h3>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>

                <div className="game-info-content">
                  <h4>Developer: </h4>
                  <h4>Platforms:</h4>
                  <h4>Game Modes:</h4>
                  <h4>Themes:</h4>
                </div>
              </div>

              <div className="game-socials-div">
                <div className="heading-container">
                  <h3 className="game-socials-heading">Connect</h3>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Game;
