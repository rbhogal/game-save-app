import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import './FeaturedGame.css';
import '../components/game/Game.css';
import GameHeading from './game/GameHeading';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoadingUserData } from '../features/user/userSlice';
import LoadingDots from './LoadingDots';

const FeaturedGame = ({ games, title }) => {
  const [featuredGame, setFeaturedGame] = useState({});
  const isLoadingUserData = useSelector(selectIsLoadingUserData);
  const releaseDate = new Date(featuredGame.first_release_date * 1000);
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

  useEffect(() => {
    if (!isLoadingUserData) {
      setFeaturedGame(games[Math.floor(Math.random() * games.length)]);
    }
  }, [isLoadingUserData, games]);

  return (
    <>
      {_.isEmpty(featuredGame) && (
        <div className="loading-dots-container">
          <LoadingDots />
        </div>
      )}
      {!_.isEmpty(featuredGame) && (
        <Link to={`/gamelist/games/${featuredGame.name}/${featuredGame.id}`}>
          <div className="category">
            <h1>{title}</h1> &nbsp;
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
          <div
            className={
              isLoadingUserData
                ? 'FeaturedGame'
                : 'FeaturedGame fade-in-featured-game'
            }
          >
            <section className="game-main-section featured-game-main-content ">
              <img
                className="game-img"
                src={`//images.igdb.com/igdb/image/upload/t_cover_big/${featuredGame.cover.image_id}.jpg`}
                alt={featuredGame.name}
              ></img>

              <div className="game-main-content">
                <div className="game-main-content-text">
                  <h1 className="game-title">{featuredGame.name}</h1>
                  <h2 className="game-release-date">{`${releaseMonth} ${releaseDay}, ${releaseYear}`}</h2>
                  <h2 className="game-genre">{featuredGame.genres[0].name}</h2>
                </div>

                <div className="game-rating-bookmark-div">
                  <div className="game-rating-box">
                    <p className="game-rating">
                      {featuredGame.total_rating
                        ? Math.round(featuredGame.total_rating)
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="featured-game-summary-container">
              <GameHeading heading="Summary" />
              <p className="game-summary">{featuredGame.summary}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default FeaturedGame;
