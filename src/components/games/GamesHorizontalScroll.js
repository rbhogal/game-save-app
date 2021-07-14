import React from 'react';
import './GamesHorizontalScroll.css';

const GamesHorizontalScroll = props => {
  return (
    <>
      {props.popularGames.map((game, index) => (
        <div className="cover-container d-flex justify-content-start m-3">
          <img src={game.cover.url} alt={game.name}></img>
        </div>
      ))}
    </>
  );
};

export default GamesHorizontalScroll;
