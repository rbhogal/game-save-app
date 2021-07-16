import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import './GamesHorizontalScroll.css';

const GamesHorizontalScroll = props => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    className: 'slick-arrows',
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {props.popularGames.map(game => (
          <>
            <Link to={`/games/${game.id}`}>
              <div className="game-card">
                <img
                  src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                  alt={game.name}
                ></img>
                <div className="game-card-text">
                  <p className="game-card-genre">{`${game.genres[0].name}`}</p>
                  <div className="game-card-rating-box">
                    <p className="game-card-rating">
                      {Math.round(game.total_rating)}</p>
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

export default GamesHorizontalScroll;
