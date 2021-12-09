import React, { useState, useRef, useEffect, useCallback } from 'react';
import './FullscreenImgModal.css';

const FullscreenImgModal = ({
  showModal,
  setShowModal,
  imageId,
  setImageId,
  screenshots,
  artworks,
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

  const getCurrIndex = useCallback(() => {
    if (imageType === 'screenshot') {
      for (const screenshot of screenshots) {
        if (screenshot.image_id === imageId) {
          currIndex.current = screenshots.indexOf(screenshot);
          setCurrSlideNum(currIndex.current + 1);
          setNumSlides(screenshots.length);
        }
      }
    }

    if (imageType === 'artwork') {
      for (const artwork of artworks) {
        // It's artwork.id not artwork.image_id due to API breaking change
        if (artwork.image_id === imageId) {
          currIndex.current = artworks.indexOf(artwork);
          setCurrSlideNum(currIndex.current + 1);
          setNumSlides(artworks.length);
        }
      }
    }
  }, [artworks, imageId, imageType, screenshots]);

  const prevClick = useCallback(() => {
    setIsLoading(true);
    getCurrIndex();
    if (imageType === 'screenshot') {
      if (currIndex.current > 0) {
        prevIndex.current = currIndex.current - 1;
        setImageId(screenshots[prevIndex.current].image_id);
      }
    }

    if (imageType === 'artwork') {
      if (currIndex.current > 0) {
        prevIndex.current = currIndex.current - 1;
        setImageId(artworks[prevIndex.current].image_id);
      }
    }
    setIsLoading(false);
  }, [artworks, getCurrIndex, imageType, screenshots, setImageId]);

  const nextClick = useCallback(() => {
    setIsLoading(true);
    getCurrIndex();

    if (imageType === 'screenshot') {
      if (currIndex.current < screenshots.length - 1) {
        nextIndex.current = currIndex.current + 1;
        setImageId(screenshots[nextIndex.current].image_id);
      }
    }

    if (imageType === 'artwork') {
      if (currIndex.current < artworks.length - 1) {
        nextIndex.current = currIndex.current + 1;
        setImageId(artworks[nextIndex.current].image_id);
      }
    }
    setIsLoading(false);
  }, [artworks, getCurrIndex, imageType, screenshots, setImageId]);

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
                alt={imageId}
              />
            )}
            {isLoading && <p className="loading-text">Loading...</p>}
          </div>
          <p className="slideshow-count">
            {currSlideNum}/{numSlides}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default FullscreenImgModal;
