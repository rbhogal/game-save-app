import React, { useState } from 'react';

import './SearchBox.css';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const SearchBox = () => {
  const [click, setClick] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => {
    click ? setDropdown(true) : setDropdown(false);
    setClick(!click);
  };

  const onMouseEnter = () => {
    window.innerWidth < 960 ? setDropdown(false) : setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth < 960 ? setDropdown(false) : setDropdown(false);
  };

  // const handleClick = () => {
  //   window.innerWidth < 960 ? setDropdown(true) : return ad;
  // };

  return (
    <div id="SearchBox" className="SearchBox">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="dropdown"
      >
        <Link to="/">
          <button onClick={handleClick} className="drop-btn drop-btn-games">
            GAMES &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
          </button>
        </Link>
        {dropdown && <Dropdown />}
      </div>

      <input type="text" className="input" placeholder="Search..." />
      <Link to="/">
        <button className="search-btn">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </Link>
    </div>
  );
};

export default SearchBox;
