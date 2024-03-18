import React from 'react';
import GameMediaSliders from '../../carousels/GameMediaSliders';

const GameSliderSection = ({ gameData }) => {
  return (
    <section className="game-slider-section">
      <GameMediaSliders
        videos={gameData.videos}
        screenshots={gameData.screenshots}
        artworks={gameData.artworks}
        gameName={gameData.name}
      />
    </section>
  );
};

export default GameSliderSection;
