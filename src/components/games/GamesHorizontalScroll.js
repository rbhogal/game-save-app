import React from 'react';
import './GamesHorizontalScroll.css';
import Slider from 'react-slick';

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
        {props.popularGames.map((game, index) => (
          <div className="GamesHorizontalScroll">
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
