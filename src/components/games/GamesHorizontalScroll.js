import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import './GamesHorizontalScroll.css';

const GamesHorizontalScroll = props => {
  // const [bookmark, setBookmark] = useState(false);
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

  const handleBookmark = bookmarkId => {
    // 1) select the element with the id of bookmarkId
    // console.log(bookmark.current);
    // 2) run through saved games database , if it doesn't exist add it + change bookmark className to 'bookmark'
    // 3) if it does exist, remove it from the database (array) + change bookmark className to 'bookmark-outline
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
              </div>
              <div className="game-card-content">
                <div className="game-card-genre-box">
                  <p className="game-card-genre">{`${game.genres[0].name}`}</p>
                </div>
                <Link onClick={() => props.handleBookmarkClick(game)}>
                  <ion-icon
                    className="game-card-bookmark"
                    name={props.bookmark}
                    id={game.id}
                  ></ion-icon>
                </Link>
                <div className="game-card-rating-box">
                  <p className="game-card-rating">
                    {Math.round(game.total_rating)}
                  </p>
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
