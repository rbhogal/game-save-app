import React, { useState, useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';

import './SearchBox.css';
import { Link, useHistory } from 'react-router-dom';
import Dropdown from './Dropdown';
import AuthContext from '../../../store/auth-context';
import { isOpen } from '../../../features/mobileMenu/mobileMenuSlice';

const SearchBox = () => {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState('');
  let history = useHistory();
  const inputSearch = useRef();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleClick = () => {
    // Click only works for mobile
    if (window.innerWidth > 960) return;

    setDropdown(!dropdown);
  };

  // Mouse cursor hover dropdown
  const onMouseEnter = () => {
    window.innerWidth < 960 ? setDropdown(false) : setDropdown(true);
  };
  const onMouseLeave = () => {
    window.innerWidth < 960 ? setDropdown(false) : setDropdown(false);
  };

  const handleEnterPress = e => {
    if (!inputSearch.current.value) return;

    if (e.key === 'Enter') {
      history.push(`/gamelist/games`);
      authCtx.searchGame(search);
      inputSearch.current.value = '';

      if (window.innerWidth < 960) {
        // close mobile menu
        document.body.style.overflow = 'visible';
        dispatch(
          isOpen({
            click: false,
          })
        );
      }
    }

    if (e.type === 'click') {
      authCtx.searchGame(inputSearch.current.value);
      inputSearch.current.value = '';
    }
  };

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

      <input
        ref={inputSearch}
        type="text"
        className="input"
        placeholder="Search Game..."
        onChange={e => setSearch(e.target.value)}
        onKeyPress={handleEnterPress}
      />
      <Link to="/gamelist/games">
        <button onClick={handleEnterPress} className="search-btn">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </Link>
    </div>
  );
};

export default SearchBox;
