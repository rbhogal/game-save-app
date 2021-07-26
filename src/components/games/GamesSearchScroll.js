import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import _ from 'lodash';

import './GamesHorizontalScroll.css';
import { Link } from 'react-router-dom';

const GamesSearchScroll = props => {
  const [bookmark, setBookmark] = useState(false);
  const BookmarkComponent = props.bookmarkComponent;

  const settings = {
    className: 'center',
    dots: true,
    // centerMode: false,
    infinite: true,
    // centerPadding: '60px',
    slidesToShow: 8,
    slidesToScroll: 8,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    className: 'slick-arrows',
  };

  const showSearchResults = () => {
    if (!_.isEmpty(props.games)) {
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
                    <Link
                      onClick={() => {
                        props.handleBookmarkClick(game);
                      }}
                    >
                      <BookmarkComponent />
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
    }

    if (_.isEmpty(props.games)) {
      return (
        <>
          <div style={{ margin: '45vh', textAlign: 'center' }}>
            <h1>{`No results for "${props.search}".`}</h1>
          </div>
        </>
      );
    }
  };

  return <>{showSearchResults()}</>;
};

export default GamesSearchScroll;
