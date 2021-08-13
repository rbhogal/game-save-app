import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import './Game.css';
import { selectAppToken } from '../../features/admin/appTokenSlice';
import { selectUserKey, storeBookmark } from '../../features/user/userSlice';
import AuthContext from '../../store/auth-context';
import LoadingDots from '../LoadingDots';
import GameHeading from './GameHeading';
import GameLinks from './GameLinks';
import GameInfo from './GameInfo';
import Footer from '../Footer';
import GameMediaSliders from '../carousels/GameMediaSliders';
import toast from 'react-hot-toast';

const Game = () => {
  const token = useSelector(selectAppToken);
  const userKey = useSelector(selectUserKey);
  const [gameId, setGameId] = useState('');
  const [gameData, setGameData] = useState([]);
  const [developer, setDeveloper] = useState('');
  const releaseDate = new Date(gameData.first_release_date * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const releaseYear = releaseDate.getFullYear();
  const releaseMonth = months[releaseDate.getMonth()];
  const releaseDay = releaseDate.getDate() + 1;
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
        data: `fields summary, first_release_date, cover.image_id, genres.name, name, total_rating, involved_companies.*, involved_companies.company.name, platforms.name, websites.*, url, release_dates, game_modes.name, themes.name, player_perspectives.*, storyline, screenshots.image_id, videos.video_id, artworks.image_id; where id = ${gameId} & genres.name != null & cover.image_id != null;`,
      });

      const { data } = await resp;
      setGameData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getDeveloper = gameData => {
    if (!gameData.involved_companies) return;
    if (!_.isEmpty(gameData)) {
      gameData.involved_companies.forEach(c => {
        if (c.developer === true) setDeveloper(c.company.name);
      });
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

  useEffect(() => {
    getDeveloper(gameData);
  }, [gameData]);

  const checkGameExists = async () => {
    let gameExists = false;

    try {
      const resp = await axios.get(
        `https://game-save-default-rtdb.firebaseio.com/users/${userKey}/savedGames.json`
      );

      const { data: savedGames } = await resp;

      for (const game in savedGames) {
        if (savedGames[game].id === +gameId) {
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
          <section className="game-main-section">
            <img
              className="game-img"
              src={`//images.igdb.com/igdb/image/upload/t_cover_big/${gameData.cover.image_id}.jpg`}
              alt={gameData.name}
            ></img>

            <div className="game-main-content">
              <div className="game-main-content-text">
                <h1 className="game-title">{gameData.name}</h1>
                <h2 className="game-release-date">{`${releaseMonth} ${releaseDay}, ${releaseYear}`}</h2>
                <h2 className="game-genre">{gameData.genres[0].name}</h2>
              </div>

              <div className="game-rating-bookmark-div">
                <div className="game-rating-box">
                  <p className="game-rating">
                    {gameData.total_rating ? Math.round(gameData.total_rating) : 'N/A'}
                  </p>
                </div>
                <ion-icon onClick={handleBookmarkClick} name="add"></ion-icon>
              </div>
            </div>
          </section>
          <section className="game-details-section">
            <div className="game-left-column">
              <GameHeading heading="Summary" />
              <p className="game-summary">{gameData.summary}</p>

              {gameData.storyline && (
                <>
                  <GameHeading heading="Storyline" />
                  <p className="game-storyline">{gameData.storyline}</p>
                </>
              )}

              {gameData.websites && (
                <div className="game-links-div">
                  <GameHeading heading="Links" />
                  <div className="game-links">
                    <GameLinks websitesArr={gameData.websites} />
                  </div>
                </div>
              )}
            </div>

            <div className="game-right-column">
              <div className="game-info-div">
                <GameHeading heading="Information" />

                <div className="game-info-content">
                  {developer && (
                    <div className="game-info-content-container">
                      <h4>Developer</h4>
                      <p className="game-info-content--developer">
                        {developer}
                      </p>
                    </div>
                  )}

                  {gameData.platforms && (
                    <GameInfo title="Platforms" gameArr={gameData.platforms} />
                  )}
                  {gameData.game_modes && (
                    <GameInfo
                      title="Game Modes"
                      gameArr={gameData.game_modes}
                    />
                  )}
                  {gameData.player_perspectives && (
                    <GameInfo
                      title="Player Perspectives"
                      gameArr={gameData.player_perspectives}
                    />
                  )}
                  {gameData.genres && (
                    <GameInfo title="Genre" gameArr={gameData.genres} />
                  )}
                  {gameData.themes && (
                    <GameInfo title="Themes" gameArr={gameData.themes} />
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="game-slider-section">
            <GameMediaSliders
              videos={gameData.videos}
              screenshots={gameData.screenshots}
              artworks={gameData.artworks}
              gameName={gameData.name}
            />
          </section>

          <div className="scroll-up-btn">
            <a href="#root">
              <ion-icon name="arrow-up"></ion-icon>
            </a>
          </div>
        </>
      )}
      {!isLoading && <Footer />}
    </div>
  );
};

export default Game;
