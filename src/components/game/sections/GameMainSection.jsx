import React from 'react';

const GameMainSection = ({ gameData, onBookmarkClick }) => {
  const releaseDate = new Date(gameData.first_release_date * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const releaseYear = releaseDate.getFullYear();
  const releaseMonth = months[releaseDate.getMonth()];
  const releaseDay = releaseDate.getDate() + 1;
  const { genres } = gameData;

  console.log(gameData);
  const renderGameMainSection = () => {
    return (
      <section className="game-main-section">
        <img
          className="game-img"
          src={`//images.igdb.com/igdb/image/upload/t_cover_big/${gameData?.cover?.image_id}.jpg`}
          alt={gameData.name}
        ></img>

        <div className="game-main-content">
          <div className="game-main-content-text">
            <h1 className="game-title">{gameData.name}</h1>
            <h2 className="game-release-date">{`${releaseMonth} ${releaseDay}, ${releaseYear}`}</h2>
            <h2 className="game-genre">
              {genres ? gameData.genres[0].name : ''}
            </h2>
          </div>

          <div className="game-rating-bookmark-div">
            <div className="game-rating-box">
              <p className="game-rating">
                {gameData.total_rating
                  ? Math.round(gameData.total_rating)
                  : 'N/A'}
              </p>
            </div>
            <ion-icon onClick={onBookmarkClick} name="add"></ion-icon>
          </div>
        </div>
      </section>
    );
  };

  return renderGameMainSection();
};

export default GameMainSection;
