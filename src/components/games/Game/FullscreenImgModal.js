import React, { useRef, useEffect, useCallback } from 'react';

import './FullscreenImgModal.css';

const FullscreenImgModal = ({
  showModal,
  setShowModal,
  imageId,
  screenshots,
  artworks,
  screenshotRef,
  artworkRef,
  imageType,
}) => {
  const modalRef = useRef();
  const curImageRef = useRef();
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
    },
    [setShowModal, showModal]
  );

  const closeModalESC = () => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  };

  useEffect(() => {
    closeModalESC();
  }, [keyPress]);

  const prevClick = () => {
    console.log(`image type =${imageType}`);

    /* 
        if(imageType === 'screenshot) {
            run thru screenshots(arr)
                        find matching id, then get then next on in the array. 

        }

        if(imageType === 'artwork) {
            run thru artworks arr
            find matching id, then get then next on in the array. 
        }
    
    
    */

    console.log(curImageRef.current);
    console.log(screenshotRef);
    console.log(artworkRef);
  };

  const nextClick = () => {
    console.log('next');
  };

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
            <div className="arrow-prev-container" onClick={prevClick}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </div>
            <div className="arrow-next-container" onClick={nextClick}>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <img
              ref={curImageRef}
              className="img-fullscreen"
              src={`https://images.igdb.com/igdb/image/upload/t_original/${imageId}.jpg`}
              alt="image"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FullscreenImgModal;
