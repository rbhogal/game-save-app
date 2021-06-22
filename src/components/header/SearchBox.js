import React from "react";

import "./SearchBox.css";
import { Link } from 'react-router-dom'

const SearchBox = () => {
  return (
    <div className="SearchBox">
    <div className="dropdown">
          <button className="drop-btn">
            GAMES &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
          </button>
          <div className="dropdown-content">
            <div className="link-item">
              <Link>
                Shooter <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Platform <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Fighting <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Puzzle<ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Racing<ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                RPG
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Sport<ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Strategy<ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Adventure<ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Arcade<ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
                Indie<ion-icon name="chevron-forward-outline"></ion-icon>
              </Link>
            </div>
            <div className="link-item">
              <Link>
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

export default SearchBox;
