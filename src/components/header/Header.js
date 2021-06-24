import React from 'react';

import HeaderItems from './HeaderItems';
import './Header.css';
import { Link } from 'react-router-dom';
import TwitchAuth from './TwitchAuth';

const Header = () => {
  return (
    <nav>
      <header>
        <div className="logo-icon">
          <Link to="/">
            <ion-icon name="game-controller-outline"></ion-icon>
          </Link>
        </div>
        <HeaderItems />
        <TwitchAuth />
      </header>
    </nav>
  );
};

export default Header;
