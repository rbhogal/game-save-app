import React from "react";

import "./SearchBox.css";

const SearchBox = () => {
  return (
    <div>
      <div className="search-box">
        <input type="text" className="input" placeholder="Search game..." />
        <button className="search-btn">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
