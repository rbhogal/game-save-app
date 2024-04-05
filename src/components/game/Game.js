import React, { useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { selectUserKey, storeBookmark } from '../../features/user/userSlice';
import { selectAppToken } from '../../features/admin/appTokenSlice';
import AuthContext from '../../store/auth-context';
import LoadingDots from '../LoadingDots';
import GameMainSection from './sections/GameMainSection';
import GameDetailsSection from './sections/GameDetailsSection';
import GameSliderSection from './sections/GameSliderSection';
import Footer from '../Footer';

import './Game.css';

const Game = () => {
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const [gameId, setGameId] = useState('');
  const userKey = useSelector(selectUserKey);
  const urlPath = window.location.pathname;
  const getGameId = useCallback(() => {
    const index = urlPath.lastIndexOf('/');
    const gameId = urlPath.slice(index + 1, urlPath.length);
    setGameId(gameId);
  }, [urlPath]);
  const token = useSelector(selectAppToken);
  const dispatch = useDispatch();

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

  const getGameData = useCallback(async () => {
    const url = `https://42z5n298h4.execute-api.us-west-2.amazonaws.com/production/v4/games`;
    setIsLoading(true);
    try {
      const resp = await axios({
        url: url,
        method: 'POST',
        headers: {
          'x-api-key': process.env.REACT_APP_AWS_API_DEFAULT_API_KEY,
        },
        data: `fields summary, first_release_date, cover.image_id, genres.name, name, total_rating, involved_companies.*, involved_companies.company.name, platforms.name, websites.*, url, release_dates, game_modes.name, themes.name, player_perspectives.*, storyline, screenshots.image_id, videos.video_id, artworks.image_id; where id = ${gameId} & genres.name != null & cover.image_id != null;`,
      });

      const game = await resp;
      const [data] = game.data;
      setGameData(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    getGameId();
  }, [getGameId]);

  useEffect(() => {
    if (gameId) getGameData();
  }, [gameId, getGameData]);

  const handleBookmarkClick = async () => {
    if (!isSignedIn) {
      return toast('Sign in!', {
        duration: 2000,
        icon: (
          <ion-icon
            style={{ fontSize: '2.5rem' }}
            name="person-circle-outline"
          ></ion-icon>
        ),
      });
    }

    const gameExists = await checkGameExists();

    if (gameExists) {
      toast.error('Already saved!', {
        duration: 2000,
      });
    }

    if (!gameExists) {
      dispatch(
        storeBookmark({
          key: userKey,
          game: gameData,
        })
      );
      return toast.success('Saved', {
        duration: 2000,
      });
    }
  };

  return (
    <div id="Game" className="Game">
      {isLoading && <LoadingDots />}
      {!isLoading && (
        <>
          <GameMainSection
            gameData={gameData}
            onBookmarkClick={handleBookmarkClick}
          />
          <GameDetailsSection gameData={gameData} />
          <GameSliderSection gameData={gameData} />
          <div className="scroll-up-btn">
            <a href="#root">
              <p>Back To Top</p> <ion-icon name="arrow-up"></ion-icon>
            </a>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Game;
