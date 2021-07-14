import React from 'react';
import './GamesHorizontalScroll.css';

const GamesHorizontalScroll = props => {
  return (
    <>
      {props.popularGames.map((game, index) => (
        <div className="cover-container d-flex justify-content-start m-3">
          <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt={game.name}></img>
        </div>
      ))}
    </>
  );
};

export default GamesHorizontalScroll;
