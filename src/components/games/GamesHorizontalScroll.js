import React from 'react';
import './GamesHorizontalScroll.css';
import Slider from 'react-slick';

const GamesHorizontalScroll = props => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };

  return (
    <>
      <Slider {...settings}>
        {props.popularGames.map((game, index) => (
          <div className="image-container d-flex justify-content-start m-3">
            <img
              src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
              alt={game.name}
            ></img>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default GamesHorizontalScroll;
