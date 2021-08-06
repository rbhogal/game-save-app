import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      {/* <div className="role-credits">
        <p>Designed and Developed by&nbsp;</p>
        <p className="author">RB</p>
      </div>
      <div className="role-credits">
        <p>Powered by&nbsp;</p>
        <p className="author">IGDB</p>
      </div> */}
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
