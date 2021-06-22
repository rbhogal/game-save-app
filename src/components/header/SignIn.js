import React from "react";

import "./SignIn.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="dropdown">
      <button className="drop-btn">
        Sign In &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
      </button>
      <div className="dropdown-content">
        <Link>
          {/* <button className="sign-in-btn">Sign In</button>
          <button className="sign-in-btn">Create Account</button> */}
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
