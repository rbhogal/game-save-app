import React from 'react';
import Slider from 'react-slick';

import './GameMediaSlider.css';

const GameMediaSlider = props => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  

  return (
    <>
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
    </>
  );
};

export default GameMediaSlider;
/* 
<iframe
          width="560"
          height="315"
          src={`${youtubeURL}6eS7CX5zkj0`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */
