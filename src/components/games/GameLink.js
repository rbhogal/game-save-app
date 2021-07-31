import React from 'react';

const GameLink = (props) => {
  return (
    <a href='#'>
      <div className="game-links-container">
        <ion-icon name={props.icon}></ion-icon>
        <p>{props.site}</p>
      </div>
    </a>
  );
};

export default GameLink;
