import React, { useState, useRef } from 'react';
import Slider from 'react-slick';

import './GameMediaSliders.css';
import GameHeading from '../game/GameHeading';
import FullscreenImgModal from '../game/FullscreenImgModal';

const GameMediaSliders = props => {
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState('');
  const screenshotRef = useRef();
  const artworkRef = useRef();
  const [imageType, setImageType] = useState('');

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const showFullscreen = e => {
    console.log(e);
    setImageId(e.target.id);
    setShowModal(prev => !prev);
    setImageType(e.target.dataset.imgType);
  };

  return (
    <div className="GameMediaSliders">
      {showModal && (
        <FullscreenImgModal
          imageType={imageType}
          screenshotRef={screenshotRef.current}
          artworkRef={artworkRef.current}
          showModal={showModal}
          setShowModal={setShowModal}
          imageId={imageId}
          setImageId={setImageId}
          screenshots={props.screenshots}
          artworks={props.artworks}
        />
      )}
      {props.videos && <GameHeading heading="Videos" />}
      {props.videos && (
        <div className="slider-container">
          <Slider {...settings}>
            {props.videos.map(video => (
              <div key={video.id} className="videos-container">
                <iframe
                  className="videos"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {props.screenshots && <GameHeading heading="Screenshots" />}
      {props.screenshots && (
        <div className="slider-container">
          <Slider {...settings}>
            {props.screenshots.map((screenshot, index) => (
              <div key={screenshot.id} className="img-container">
                <span className="icon-zoom-container">
                  <i className="fas fa-search-plus"></i>
                </span>
                <img
                  ref={screenshotRef}
                  onClick={showFullscreen}
                  id={screenshot.image_id}
                  src={`//images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`}
                  alt={`${props.gameName}-screenshot-${index}`}
                  data-img-type="screenshot"
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
              <div key={artwork.image_id} className="img-container">
                <span className="icon-zoom-container">
                  <i className="fas fa-search-plus"></i>
                </span>
                <img
                  ref={artworkRef}
                  onClick={showFullscreen}
                  className="artwork"
                  id={artwork.image_id}
                  src={`//images.igdb.com/igdb/image/upload/t_screenshot_med/${artwork.image_id}.jpg`}
                  alt={`${props.gameName}-artwork-${index}`}
                  data-img-type="artwork"
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
