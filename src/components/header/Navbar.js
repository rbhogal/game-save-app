import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import SearchBox from './SearchBox';
import TwitchAuth from './TwitchAuth';

const Navbar = () => {
  const [click, setClick] = useState(false);

  return (
    <header>
      <div
        onClick={() => setClick(!click)}
        className={click ? 'menu-toggle open' : 'menu-toggle'}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={click ? 'mobile-menu open fade-in' : 'mobile-menu fade-out'}
      >
        <SearchBox />
        <TwitchAuth />
      </div>
      <nav>
        <div className="logo-icon">
          <Link to="/">
            {/* <h1 className="logo-heading">Game Save</h1> */}
            <ion-icon name="game-controller-outline"></ion-icon>
          </Link>
        </div>
        <SearchBox />
        <TwitchAuth />
      </nav>
    </header>
  );
};

export default Navbar;
