import React from "react";

import SearchBox from "./SearchBox";
import "./Header.css";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";

const Header = () => {
  return (
    <nav>
      <header>
        <div className="logo-icon">
          <Link to="/">
            <ion-icon name="game-controller-outline"></ion-icon>
          </Link>
        </div>
        <SearchBox />
        <SignIn />
      </header>
    </nav>
  );
};

export default Header;
