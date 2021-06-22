import React from "react";

import "./SignIn.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="dropdown">
      <button className="drop-btn">
        Sign In &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
      </button>
      <div className="dropdown-content dropdown-content-sign-in">
        <Link>
          <button className="sign-in-btn">
            Twitch <ion-icon name="logo-twitch"></ion-icon>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
