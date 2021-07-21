import React, { useRef, useState, useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import './GamesHorizontalScroll.css';
import AuthContext from '../../store/auth-context';

const GamesHorizontalScroll = props => {
  const [bookmark, setBookmark] = useState(false);
  const gameCard = useRef('nothing yet');
  const [bookmarkedGames, setBookmarkedGames] = useState([]);
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;

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

  

  const handleBookmarkClick = e => {
    // If logged in, store to database / If NOT logged in prompt user to login and return
    // console.log(e.target.id);

    if (!isSignedIn) return alert('Sign in to save!');

    if (isSignedIn) {

      

      
      // map an array and only setBookmark on those with the id you want
      bookmarkedGames.map(game => {
        // find id
        // if no matching id, push object  game id, and push bookmarked: true
        // if matching id found, then update bookmarked to either true or false. bookmark ? false : true
      });

      // 1) if

      setBookmark(!bookmark);
    }
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
              </div>
              <div className="game-card-content">
                  <div className="game-card-genre-box">
                    <p className="game-card-genre">{`${game.genres[0].name}`}</p>
                  </div>
                  <Link onClick={handleBookmarkClick}>
                    <ion-icon
                      className="game-card-bookmark"
                      name={bookmark ? 'bookmark' : 'bookmark-outline'}
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
