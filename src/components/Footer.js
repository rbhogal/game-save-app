import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <p>
        Designed and Developed by{' '}
        <a
          href="https://rbhogal.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          RB
        </a>
      </p>
      <p>
        Powered by <a href="https://www.igdb.com/discover">IGDB</a>
      </p>
      <p>© 2024</p>
      <ion-icon name="flash-outline"></ion-icon>
    </div>
  );
};

export default Footer;
