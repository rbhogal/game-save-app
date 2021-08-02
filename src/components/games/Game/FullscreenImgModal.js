import React, { useRef, useEffect, useCallback } from 'react';

import './FullscreenImgModal.css';

const FullscreenImgModal = ({ showModal, setShowModal, imageId }) => {
  const modalRef = useRef();

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
            <img
              className="img-fullscreen"
              src={`https://images.igdb.com/igdb/image/upload/t_original/${imageId}.jpg`}
              alt="screenshot"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FullscreenImgModal;
