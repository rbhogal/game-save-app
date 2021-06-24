import React, {useState} from 'react';

import './SearchBox.css';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const SearchBox = () => {
  // const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // const handleClick = () => setClick(!click);
  
  const onMouseEnter = () => {
    (window.innerWidth < 960) ? setDropdown(false) : setDropdown(true);
  }

  const onMouseLeave =() => {
    (window.innerWidth < 960) ?  setDropdown(false) : setDropdown(false);
  }




  return (
    <div className="search-box">
        <div 
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="dropdown">
          <Link to="/gamelist">
            <button className="drop-btn drop-btn-games">
              GAMES &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
            </button>
          </Link>
           {dropdown && <Dropdown />}
         </div>
      
      <input type="text" className="input" placeholder="Search game..." />
      <Link to="/">
        <button className="search-btn">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </Link>
    </div>
  );
};

export default SearchBox;
