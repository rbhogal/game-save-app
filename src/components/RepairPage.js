import React from 'react';

import './RepairPage.css';

const RepairPage = () => {
  return (
    <div className="repairPage">
      <div className="headingContainer">
        <p className="headingText">GAME OVER</p>
        <p className="subheadingText">Site in Repair...</p>
      </div>
      <div className="subHeadingContainer">
        <p>Meanwhile learn more about this project here:</p>
        <ul className="projectLinks">
          <li>
            <a
              href="https://rbhogal.github.io/project-game-save.html"
              target="_blank"
              rel="noreferrer"
            >
              https://rbhogal.github.io/project-game-save.html
            </a>
          </li>
          <li>
            <a
              href=" https://github.com/rbhogal/game-save-app"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/rbhogal/game-save-app
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RepairPage;
