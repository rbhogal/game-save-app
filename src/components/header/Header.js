import React from "react";

import SearchBox from "./SearchBox";
import "./Header.css";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";

const Header = () => {
  return (
    <nav>
      <header>
        <ion-icon className="logo" name="game-controller-outline"></ion-icon>
        <div className="dropdown">
          <button className="drop-btn">
            ALL GAMES &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
          </button>
          <div className="dropdown-content">
            <Link>Shooter</Link>
            <Link>Platform</Link>
            <Link>Fighting</Link>
            <Link>Puzzle</Link>
            <Link>Racing</Link>
            <Link>Real Time Strategy</Link>
            <Link>Role Playing Game</Link>
            <Link>Sport</Link>
            <Link>Strategy</Link>
            <Link>Adventure</Link>
            <Link>Arcade</Link>
            <Link>Indie</Link>
            <Link>MOBA</Link>
          </div>
        </div>
        <SearchBox />
        <SignIn />
      </header>
    </nav>
  );
};

export default Header;
