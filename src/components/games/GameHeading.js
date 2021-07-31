import React from 'react';

const GameHeading = props => {
  return (
    <div className="heading-container">
      <h3 className="game-summary-heading">{props.heading}</h3>
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </div>
  );
};

export default GameHeading;
