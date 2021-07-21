import React, { useState, useContext, useEffect } from 'react';
import { auth, provider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './GoogleAuth.css';
import {
  setActiveUser,
  setUserSignOutState,
  selectUserEmail,
  selectUserName,
  selectUserToken,
  addNewUser,
  getUserData,
  getAllUsers,
} from '../../features/users/userSlice';
import { isOpen } from '../../features/mobileMenu/mobileMenuSlice';
import AuthContext from '../../store/auth-context';

function GoogleAuth() {
  const [dropdown, setDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  // const token = useSelector(selectUserToken);
  const userName = localStorage.getItem('username');
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;

 

  const onSignInClick = () => {
    setIsLoading(true);
    auth.signInWithPopup(provider).then(result => {
      authCtx.signIn(result.credential.accessToken);
      localStorage.setItem('username', result.user.displayName);
      dispatch(
        setActiveUser({
          userId: result.user.uid,
          userName: result.user.displayName,
          userEmail: result.user.email,
          token: result.credential.accessToken,
        })
      );

      // handleNewUser(result.user.uid);
    });
    setIsLoading(false);
  };

  const onSignOutClick = () => {
    setIsLoading(true);

    auth
      .signOut()
      .then(() => {
        authCtx.singOut();
        dispatch(setUserSignOutState());
      })
      .catch(err => alert(err.message));

    localStorage.removeItem('username');
    setIsLoading(false);
    renderDropdown();
  };

  const renderDropdown = () => {
    renderDropBtn();
    renderDropdownContent();
  };

  // MOBILE DROPDOWN
  const dropdownMobileMenu = () => {
    // Click only works for mobile
    if (window.innerWidth > 960) return;
    setDropdown(!dropdown);
  };

  const renderDropBtn = () => {
    // Signed In
    if (isSignedIn || isLoading) {
      return (
        <button onClick={dropdownMobileMenu} className="drop-btn">
          Profile &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      );
    }

    //Not Signed In
    if (!isSignedIn && !isLoading) {
      return (
        <button onClick={dropdownMobileMenu} className="drop-btn">
          Sign In &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      );
    }
  };

  // MOBILE MENU --SAVED GAMES
  const mobileSavedGamesClick = () => {
    // Click only works for mobile
    if (window.innerWidth > 960) return;

    dispatch(
      isOpen({
        click: false,
      })
    );
  };

  const renderDropdownContent = () => {
    // Signed In
    if (isSignedIn) {
      return (
        <div
          onClick={onMouseLeave}
          className="user-dropdown-content user-dropdown-content-signed-in"
          style={{ textAlign: 'center' }}
        >
          <div className="user-name-container">
            <p>Signed in as </p>
            <b>{userName}</b>
          </div>

          <hr className="solid"></hr>
          <Link
            onClick={mobileSavedGamesClick}
            to="/savedgames"
            className="link-saved-games"
          >
            <b style={{ margin: '0 auto' }}>SAVED GAMES</b>
          </Link>
          <hr className="solid"></hr>
          <Link to="/">
            <button onClick={onSignOutClick} className="sign-in-out-btn">
              Sign Out
            </button>
          </Link>
        </div>
      );
    }

    // NOT Signed in
    if (!isSignedIn)
      return (
        <div className="user-dropdown-content user-dropdown-content-signed-out">
          <Link to="/">
            <button
              onClick={onSignInClick}
              className="sign-in-out-btn google-btn"
            >
              Google
              <ion-icon name="logo-google"></ion-icon>
            </button>
          </Link>
        </div>
      );

    return <div>ERROR</div>;
  };

  // Hover over drop button (Sign In/Profile)
  const onMouseEnter = () => {
    window.innerWidth < 960 ? setDropdown(false) : setDropdown(true);
  };
  const onMouseLeave = () => {
    window.innerWidth < 960 ? setDropdown(false) : setDropdown(false);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="GoogleAuth"
    >
      {renderDropBtn()}
      {dropdown && renderDropdownContent()}
    </div>
  );
}

export default GoogleAuth;
