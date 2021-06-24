import React from 'react';

import './HeaderItems.css';
import { Link } from 'react-router-dom';

const HeaderItems = () => {
  return (
    <div className="HeaderItems">
      <div className="dropdown">
        <button className="drop-btn">
          GAMES &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
        <div className="dropdown-content">
          <div className="link-item">
            <Link to="/">
              Shooter <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Platform <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Fighting <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Puzzle<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Racing<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              RPG
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Sport<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Strategy<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Adventure<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Arcade<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              Indie<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
          <div className="link-item">
            <Link to="/">
              MOBA<ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" className="input" placeholder="Search game..." />
        <button className="search-btn">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default HeaderItems;
