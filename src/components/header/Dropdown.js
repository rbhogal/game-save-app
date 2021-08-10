import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import './Dropdown.css';
import { DropdownMenuItems } from './DropdownMenuItems';
import { isOpen } from '../../features/mobileMenu/mobileMenuSlice';
import AuthContext from '../../store/auth-context';

const Dropdown = () => {
  const [clickDropdown, setClickDropdown] = useState(false);

  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const [genre, setGenre] = useState('');
  let history = useHistory();

  const handleClickDropdown = () => setClickDropdown(!clickDropdown);

  const handleClickDropdownItem = e => {
    console.log(e.target.outerText);

    // e = genre search
    history.push('/gamelist/genre');
    

    /* 
      1) history.push('/gamelist/games')
      2) create new authCtx searchGenre(search);
      

    */

    dispatch(
      isOpen({
        click: false,
      })
    );
  };

  return (
    <>
      <div
        onClick={handleClickDropdown}
        className={
          clickDropdown ? 'dropdown-content clicked' : 'dropdown-content'
        }
      >
        {DropdownMenuItems.map((genre, index) => {
          return (
            <Link onClick={handleClickDropdownItem} key={index} to={genre.path}>
              {genre.title}
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          );
        })}
        <hr className="solid" />
        <Link
          onClick={handleClickDropdownItem}
          to="/gamelist"
          style={{ fontWeight: 'bold' }}
        >
          All Games
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>
      </div>
    </>
  );
};

export default Dropdown;
