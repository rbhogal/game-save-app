import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <p>
        Designed and Developed by{' '}
        <a
          href="https://github.com/rbhogal"
          target="_blank"
          rel="noopener noreferrer"
        >
          RB
        </a>
      </p>
      <p>
        Powered by <a href="https://www.igdb.com/discover">IGDB</a>
      </p>
      <ion-icon name="flash-outline"></ion-icon>
    </div>
  );
};

export default Footer;
