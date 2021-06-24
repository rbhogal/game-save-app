import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Dropdown.css';
import { DropdownMenuItems } from './DropdownMenuItems';

const Dropdown = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!false);

  return (
    <>
      <div
        onClick={handleClick}
        className={click ? 'dropdown clicked' : 'dropdown'}
        className="dropdown-content"
      >
        {DropdownMenuItems.map((item, index) => {
          return (
            <Link key={index} to={item.path} onClick={() => setClick(false)}>
              {item.title}
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Dropdown;

