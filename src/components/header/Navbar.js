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
      <div className="mobile-menu">
        
      </div>
      <nav>
        <div className="logo-icon">
          <Link to="/">
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
