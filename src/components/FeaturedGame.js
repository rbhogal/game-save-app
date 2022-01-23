import React from 'react';

import './FeaturedGame.css';
import '../components/game/Game.css';
import GameHeading from './game/GameHeading';
import { Link } from 'react-router-dom';

const FeaturedGame = ({ games, title }) => {
  const featuredGameData = games[Math.floor(Math.random() * games.length)];

  const releaseDate = new Date(featuredGameData.first_release_date * 1000);
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

  return (
    <>
      <Link
        to={`/gamelist/games/${featuredGameData.name}/${featuredGameData.id}`}
      >
        <div className="category">
          <h1>{title}</h1> &nbsp;
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
        <div className="FeaturedGame">
          <section className="game-main-section featured-game-main-content">
            <img
              className="game-img"
              src={`//images.igdb.com/igdb/image/upload/t_cover_big/${featuredGameData.cover.image_id}.jpg`}
              alt={featuredGameData.name}
            ></img>

            <div className="game-main-content">
              <div className="game-main-content-text">
                <h1 className="game-title">{featuredGameData.name}</h1>
                <h2 className="game-release-date">{`${releaseMonth} ${releaseDay}, ${releaseYear}`}</h2>
                <h2 className="game-genre">
                  {featuredGameData.genres[0].name}
                </h2>
              </div>

              <div className="game-rating-bookmark-div">
                <div className="game-rating-box">
                  <p className="game-rating">
                    {featuredGameData.total_rating
                      ? Math.round(featuredGameData.total_rating)
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="featured-game-summary-container">
            <GameHeading heading="Summary" />
            <p className="game-summary">{featuredGameData.summary}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FeaturedGame;
