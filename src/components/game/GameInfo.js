import React from 'react';

const GameInfo = props => {
  const gameArr = props.gameArr;

  return (
    <div className="game-info-content-container">
      <h4>{props.title}</h4>
      {gameArr.map(item => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default GameInfo;
