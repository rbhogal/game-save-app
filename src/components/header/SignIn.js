import React from "react";

import "./SignIn.css";
import { Link } from "react-router-dom";
import TwitchAuth from "../TwitchAuth";

const SignIn = () => {



  return (
    <div className="dropdown">
      <button className="drop-btn">
        Sign In &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
      </button>
      <div className="dropdown-content dropdown-content-sign-in">
        <Link >
          <TwitchAuth />
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
