import React from 'react';

import './LoadingDots.css';

const LoadingDots = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }} id="container">
        <div className="loading-dots">
          {/* <p className="loading-dots--mssg">Loading games...</p> */}
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default LoadingDots;
