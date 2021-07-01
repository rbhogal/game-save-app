import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Navbar.css';
import SearchBox from './SearchBox';
import TwitchAuth from './TwitchAuth';
import { isOpen } from '../../features/mobileMenu/mobileMenuSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const mobileMenuIsOpen = useSelector(state => state.mobileMenu.isOpen.click);

  const handleClick = () => {
    // open mobile menu
    if (!mobileMenuIsOpen) {
      dispatch(
        isOpen({
          click: true,
        })
      );
    }

    // close mobile menu
    if (mobileMenuIsOpen) {
      dispatch(
        isOpen({
          click: false,
        })
      );
    }
  };

  const handleHomeClick = () => {
    // If user clicks on home icon on desktop
    if (window.innerWidth > 960) return;
    dispatch(
      isOpen({
        click: false,
      })
    );
  };

  return (
    <header>
      <div
        onClick={handleClick}
        className={mobileMenuIsOpen ? 'menu-toggle open' : 'menu-toggle'}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={
          mobileMenuIsOpen ? 'mobile-menu open fade-in' : 'mobile-menu fade-out'
        }
      >
        {mobileMenuIsOpen && <SearchBox />}
        {mobileMenuIsOpen && <TwitchAuth />}
        {/* <SearchBox />
        <TwitchAuth /> */}
      </div>
      <nav>
        <div onClick={handleHomeClick} className="logo-icon">
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
