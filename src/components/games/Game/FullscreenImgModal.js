import React, { useState, useRef, useEffect, useCallback } from 'react';

import './FullscreenImgModal.css';

const FullscreenImgModal = ({
  showModal,
  setShowModal,
  imageId,
  setImageId,
  screenshots,
  artworks,
  screenshotRef,
  artworkRef,
  imageType,
}) => {
  const modalRef = useRef();
  const curImageRef = useRef();
  const arrowPrevRef = useRef();
  const arrowNextRef = useRef();
  let currIndex = useRef(null);
  let prevIndex = useRef(null);
  let nextIndex = useRef(null);
  const [currSlideNum, setCurrSlideNum] = useState('');
  const [numSlides, setNumSlides] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const prevClick = () => {
    setIsLoading(true);
    getCurrIndex();
    if (imageType === 'screenshot') {
      if (currIndex > 0) {
        prevIndex = currIndex - 1;
        setImageId(screenshots[prevIndex].image_id);
      }
    }

    if (imageType === 'artwork') {
      if (currIndex > 0) {
        prevIndex = currIndex - 1;
        setImageId(artworks[prevIndex].image_id);
      }
    }
    setIsLoading(false);
  };

  const nextClick = () => {
    setIsLoading(true);
    getCurrIndex();

    if (imageType === 'screenshot') {
      if (currIndex < screenshots.length - 1) {
        nextIndex = currIndex + 1;
        setImageId(screenshots[nextIndex].image_id);
      }
    }

    if (imageType === 'artwork') {
      if (currIndex < artworks.length - 1) {
        nextIndex = currIndex + 1;
        setImageId(artworks[nextIndex].image_id);
      }
    }
    setIsLoading(false);
  };

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
      if (e.key === 'ArrowRight') nextClick();
      if (e.key === 'ArrowLeft') prevClick();
    },
    [setShowModal, showModal, nextClick, prevClick]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  const getCurrIndex = () => {
    if (imageType === 'screenshot') {
      for (const screenshot of screenshots) {
        if (screenshot.image_id === imageId) {
          currIndex = screenshots.indexOf(screenshot);
          setCurrSlideNum(currIndex + 1);
          setNumSlides(screenshots.length);
        }
      }
    }

    if (imageType === 'artwork') {
      for (const artwork of artworks) {
        if (artwork.image_id === imageId) {
          currIndex = artworks.indexOf(artwork);
          setCurrSlideNum(currIndex + 1);
          setNumSlides(artworks.length);
        }
      }
    }
  };

  useEffect(() => {
    getCurrIndex();
  });

  return (
    <>
      {showModal ? (
        <div className="FullscreenImgModal" ref={modalRef} onClick={closeModal}>
          <div className="modal-wrapper">
            <button
              className="close-modal-btn"
              onClick={() => setShowModal(prev => !prev)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <div
              ref={arrowPrevRef}
              className="arrow-prev-container"
              onClick={prevClick}
            >
              <ion-icon name="chevron-back-outline"></ion-icon>
            </div>
            <div
              ref={arrowNextRef}
              className="arrow-next-container"
              onClick={nextClick}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>

            {!isLoading && (
              <img
                ref={curImageRef}
                className="img-fullscreen"
                src={`https://images.igdb.com/igdb/image/upload/t_original/${imageId}.jpg`}
                alt="image"
              />
            )}
            {isLoading && <p className="loading-text">Loading...</p>}
            <p className="slideshow-count">
              {currSlideNum}/{numSlides}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FullscreenImgModal;
