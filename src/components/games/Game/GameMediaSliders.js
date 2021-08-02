import React, { useState } from 'react';
import Slider from 'react-slick';

import './GameMediaSliders.css';
import GameHeading from '../GameHeading';
import FullscreenImgModal from './FullscreenImgModal';

const GameMediaSliders = props => {
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState('');

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const showFullscreen = e => {
    console.log(e.target.id);
    setImageId(e.target.id);
    setShowModal(prev => !prev);
  };

  return (
    <div className="GameMediaSliders">
      <FullscreenImgModal
        showModal={showModal}
        setShowModal={setShowModal}
        imageId={imageId}
      />
      {props.videos && <GameHeading heading="Videos" />}
      {props.videos && (
        <div className="slider-container">
          <Slider {...settings}>
            {props.videos.map(video => (
              <iframe
                key={video.id}
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
      )}

      {props.screenshots && <GameHeading heading="Screenshots" />}
      {props.screenshots && (
        <div className="slider-container">
          <Slider {...settings}>
            {props.screenshots.map((screenshot, index) => (
              <div className="img-container">
                <span className="icon-zoom-container" >
                  <i class="fas fa-search-plus"></i>
                </span>
                <img
                  onClick={showFullscreen}
                  key={screenshot.id}
                  id={screenshot.image_id}
                  src={`//images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`}
                  alt={`${props.gameName}-screenshot-${index}`}
                ></img>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {props.artworks && <GameHeading heading="Artwork" />}
      {props.artworks && (
        <div className="slider-container">
          <Slider {...settings}>
            {props.artworks.map((artwork, index) => (
              <div className="img-container">
                <span className="icon-zoom-container">
                  <i class="fas fa-search-plus"></i>
                </span>
                <img
                  onClick={showFullscreen}
                  className="artwork"
                  key={artwork.image_id}
                  id={artwork.image_id}
                  src={`//images.igdb.com/igdb/image/upload/t_screenshot_med/${artwork.image_id}.jpg`}
                  alt={`${props.gameName}-artwork-${index}`}
                ></img>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default GameMediaSliders;
