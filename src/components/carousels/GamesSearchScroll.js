import React from 'react';
import Slider from 'react-slick';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import './GamesHorizontalScroll.css';
import './GamesSearchScroll.css';
import LoadingDots from '../LoadingDots';

const GamesSearchScroll = props => {
  const BookmarkComponent = props.bookmarkComponent;
  const isLoading = props.isLoading;

  const settings = {
    className: 'center',
    dots: true,
    infinite: false,
    lazyLoad: true,
    slidesToShow: 8,
    slidesToScroll: 8,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    className: 'slick-arrows',
    responsive: [
      {
        breakpoint: 1760,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1570,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1370,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 825,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: false,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          arrows: false,
          dots: false,
        },
      },
    ],
    customPaging: i => (
      <div
        style={{
          fontWeight: '700',
        }}
      >
        {i + 1}
      </div>
    ),
  };

  const showSearchResults = () => {
    if (!_.isEmpty(props.games)) {
      return (
        <>
          <Slider {...settings}>
            {props.games.map(game => (
              <>
                <Link to={`/gamelist/games/${game.name}/${game.id}`}>
                  <div className="game-card">
                    <img
                      src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                      alt={game.name}
                    ></img>

                    <div className="game-card-summary-box">
                      <p className="game-card-summary">
                        {game.summary ? game.summary : 'No Summary Available'}
                      </p>
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
                        {game.total_rating
                          ? Math.round(game.total_rating)
                          : 'N/A'}
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
      return props.title === 'Saved Games' ? (
        <div className="no-results-mssg">Add Games</div>
      ) : (
        <>
          <div className="no-results-mssg">
            <h1>{`No results for "${props.search}".`}</h1>
          </div>
        </>
      );
    }
  };

  return (
    <>
      {!isLoading && showSearchResults()}
      {isLoading && <LoadingDots />}
    </>
  );
};

export default GamesSearchScroll;
