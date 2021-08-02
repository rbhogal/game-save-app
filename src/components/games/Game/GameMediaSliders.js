import React from 'react';
import Slider from 'react-slick';

import './GameMediaSliders.css';
import GameHeading from '../GameHeading';

const GameMediaSliders = props => {
  const settings = {
    focusOnSelect: true,
    dots: false,
    infinite: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div className="GameMediaSliders">
      <GameHeading heading="Screenshots" />
      <div className="slider-container">
        <Slider {...settings}>
          {props.screenshots.map(screenshot => (
            <img
              src={`//images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`}
            ></img>
          ))}
        </Slider>
      </div>

      <GameHeading heading="Videos" />
      <div className="slider-container">
        <Slider {...settings}>
          {props.videos.map(video => (
            <iframe
              width="640"
              height="385"
              src={`https://www.youtube.com/embed/${video.video_id}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GameMediaSliders;
