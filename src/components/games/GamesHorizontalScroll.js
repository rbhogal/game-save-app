import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import './GamesHorizontalScroll.css';

const GamesHorizontalScroll = props => {
  const [bookmark, setBookmark] = useState(false)
  const gameCard = useRef('nothing yet');

  // useEffect(() => {
  //   if (props.popularGames) console.log(gameCard.current);
  // }, []);

  // console.log(gameCard.current);

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
        {props.games.map(game => (
          <>
            <Link ref={gameCard} to={`/gamelist/games/${game.name}`}>
              <div className="game-card">
                <img
                  src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                  alt={game.name}
                ></img>

                <div className="game-card-summary-box">
                  <p className="game-card-summary">{game.summary}</p>
                </div>

                <div className="game-card-content">
                  <p className="game-card-genre">{`${game.genres[0].name}`}</p>
                  <Link onClick={()=> setBookmark(!bookmark)}>
                    <ion-icon
                      className="game-card-bookmark"
                      name={bookmark? "bookmark" : "bookmark-outline"}
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

export default GamesHorizontalScroll;
