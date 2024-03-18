import React, { useEffect, useState } from 'react';
import GameHeading from '../GameHeading';
import GameInfo from '../GameInfo';
import GameLinks from '../GameLinks';
import _ from 'lodash';

const GameDetailsSection = ({ gameData }) => {
  const [developer, setDeveloper] = useState('');

  const getDeveloper = gameData => {
    if (!gameData.involved_companies) return;
    if (!_.isEmpty(gameData)) {
      gameData.involved_companies.forEach(c => {
        if (c.developer === true) setDeveloper(c.company.name);
      });
    }
  };

  useEffect(() => {
    getDeveloper(gameData);
  }, [gameData]);
  return (
    <section className="game-details-section">
      <div className="game-left-column">
        <GameHeading heading="Summary" />
        <p className="game-summary">{gameData.summary}</p>

        {gameData.storyline && (
          <>
            <GameHeading heading="Storyline" />
            <p className="game-storyline">{gameData.storyline}</p>
          </>
        )}

        {gameData.websites && (
          <div className="game-links-div">
            <GameHeading heading="Links" />
            <div className="game-links">
              <GameLinks websitesArr={gameData.websites} />
            </div>
          </div>
        )}
      </div>

      <div className="game-right-column">
        <div className="game-info-div">
          <GameHeading heading="Information" />

          <div className="game-info-content">
            {developer && (
              <div className="game-info-content-container">
                <h4>Developer</h4>
                <p className="game-info-content--developer">{developer}</p>
              </div>
            )}

            {gameData.platforms && (
              <GameInfo title="Platforms" gameArr={gameData.platforms} />
            )}
            {gameData.game_modes && (
              <GameInfo title="Game Modes" gameArr={gameData.game_modes} />
            )}
            {gameData.player_perspectives && (
              <GameInfo
                title="Player Perspectives"
                gameArr={gameData.player_perspectives}
              />
            )}
            {gameData.genres && (
              <GameInfo title="Genre" gameArr={gameData.genres} />
            )}
            {gameData.themes && (
              <GameInfo title="Themes" gameArr={gameData.themes} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameDetailsSection;
