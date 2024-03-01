import React, { useState } from 'react';

import './RepairPage.css';

const RepairPage = () => {
  // TODO: Come up with a more elegant solution
  const [activeLink1, setActiveLink1] = useState(true);
  const [activeLink2, setActiveLink2] = useState(null);

  return (
    <div className="repairPage">
      <div className="headingContainer">
        <p className="headingText">GAME OVER</p>
        <p className="subheadingText">Site in Repair...</p>
      </div>
      <div className="subHeadingContainer">
        <p>Meanwhile learn more about this project here:</p>
        <ul className="projectLinks">
          <li
            onMouseEnter={() => {
              setActiveLink1(true);
              setActiveLink2(false);
            }}
            className={`link ${activeLink1 ? 'active' : ''}`}
          >
            <a
              href="https://rbhogal.github.io/project-game-save.html"
              target="_blank"
              rel="noreferrer"
            >
              https://rbhogal.github.io/project-game-save.html
            </a>
          </li>
          <li
            onMouseEnter={() => {
              setActiveLink2(true);
              setActiveLink1(false);
            }}
            className={`link ${activeLink2 ? 'active' : ''}`}
          >
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
