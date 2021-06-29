import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Dropdown.css';
import { DropdownMenuItems } from './DropdownMenuItems';
import { isOpen } from '../../features/mobileMenu/mobileMenuSlice';

const Dropdown = () => {
  const [clickDropdown, setClickDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleClickDropdown = () => setClickDropdown(!clickDropdown);

  const handleClickDropdownItem = () => {
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
        {DropdownMenuItems.map((item, index) => {
          return (
            <Link onClick={handleClickDropdownItem} key={index} to={item.path}>
              {item.title}
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
