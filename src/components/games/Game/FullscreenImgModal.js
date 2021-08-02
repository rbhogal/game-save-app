import React from 'react';

import './FullscreenImgModal.css';

const FullscreenImgModal = ({ showModal, setShowModal, imageId }) => {
  return (
    <>
      {showModal ? (
        <div className="FullscreenImgModal">
          <div className="modal-wrapper">
            <button className="close-modal-btn">
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
