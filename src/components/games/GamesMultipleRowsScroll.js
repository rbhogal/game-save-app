import React, { useState } from 'react';
import Slider from 'react-slick';

import './GamesHorizontalScroll.css';
import { Link } from 'react-router-dom';

const GamesMultipleRowsScroll = props => {
  const [bookmark, setBookmark] = useState(false);

  const settings = {
    className: 'center',
    centerMode: false,
    infinite: false,
    // centerPadding: '60px',
    slidesToShow: 8,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    className: 'slick-arrows',
  };

  const handleBookmarkClick = () => {
    setBookmark(!bookmark);
  };

  return (
    <>
      <Slider {...settings}>
        {props.games.map(game => (
          <>
            <Link to={`/gamelist/games/${game.name}`}>
              <div className="game-card">
                <img
                  src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                  alt={game.name}
                ></img>

                <div className="game-card-summary-box">
                  <p className="game-card-summary">{game.summary}</p>
                </div>

                <div className="game-card-content">
                  <div className="game-card-genre-box">
                    <p className="game-card-genre">{`${game.genres[0].name}`}</p>
                  </div>
                  <Link onClick={handleBookmarkClick}>
                    <ion-icon
                      className="game-card-bookmark"
                      name={bookmark ? 'bookmark' : 'bookmark-outline'}
                    ></ion-icon>
                  </Link>
                  <div className="game-card-rating-box">
                    <p className="game-card-rating">
                      {Math.round(game.total_rating)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </>
        ))}
      </Slider>
    </>
  );
};

export default GamesMultipleRowsScroll;
