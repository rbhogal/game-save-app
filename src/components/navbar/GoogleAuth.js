import React, { useState, useContext, useEffect } from 'react';
import { auth, provider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import './GoogleAuth.css';
import {
  setActiveUser,
  setUserSignOutState,
  addNewUser,
  deleteUser,
} from '../../features/user/userSlice';
import { isOpen } from '../../features/mobileMenu/mobileMenuSlice';
import AuthContext from '../../store/auth-context';

function GoogleAuth() {
  const [dropdown, setDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userName = localStorage.getItem('username');
  const [username, setUsername] = useState(userName);
  const authCtx = useContext(AuthContext);
  const isSignedIn = authCtx.isSignedIn;
  const mobileMenuIsOpen = isOpen;

  useEffect(() => {
    setUsername(userName);
  }, [userName, setUsername]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      console.log('unload');
    });
  });

  const handleUser = async (id, result) => {
    // Get users
    try {
      const resp = await axios.get(
        'https://game-save-default-rtdb.firebaseio.com/users/.json'
      );
      const { data: users } = await resp;

      let newUser = true;

      // Check if new user
      for (const user in users) {
        if (users[user].userId === id) {
          newUser = false;
        }
      }

      // Add if new user
      if (newUser) {
        dispatch(
          addNewUser({
            userId: result.user.uid,
            userName: result.user.displayName,
          })
        );

        dispatch(
          setActiveUser({
            userId: result.user.uid,
            userName: result.user.displayName,
            userEmail: result.user.email,
            token: result.credential.accessToken,
          })
        );

        authCtx.signIn(result.credential.accessToken);
        localStorage.setItem('username', result.user.displayName);
        setUsername(result.user.displayName);
        toast.success('Signed in!');
      }

      // If not a new user, sign in
      if (!newUser) {
        newUser = true;

        dispatch(
          setActiveUser({
            userId: result.user.uid,
            userName: result.user.displayName,
            userEmail: result.user.email,
            token: result.credential.accessToken,
          })
        );
        authCtx.signIn(result.credential.accessToken);
        localStorage.setItem('username', result.user.displayName);
        setUsername(result.user.displayName);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const onSignInClick = e => {
    setIsLoading(true);

    // Guest Sign In
    if (e.target.classList.contains('guest-btn')) {
      auth
        .signInAnonymously()
        .then(({ user }) => {
          dispatch(
            addNewUser({
              userId: user.uid,
              userName: 'Guest',
            })
          );

          dispatch(
            setActiveUser({
              userId: user.uid,
              userName: 'Guest',
              userEmail: 'Anonymous',
              token: null,
            })
          );

          authCtx.signIn('anonymous');
          localStorage.setItem('username', 'Guest');
          setUsername('Guest');
          toast.success('Signed in as Guest!');
        })
        .catch(err => {
          console.log(err.code);
          toast(err.message);
        });
    }

    // Google Sign In
    if (e.target.classList.contains('google-btn')) {
      auth
        .signInWithPopup(provider)
        .then(result => {
          handleUser(result.user.uid, result);
        })
        .catch(err => {
          toast(err.message);
        });
    }

    setIsLoading(false);
  };

  const onSignOutClick = () => {
    setIsLoading(true);
    let uid = null;

    // Get current signed in user's user id
    auth.onAuthStateChanged(user => {
      if (user) {
        uid = user.uid;
      }
    });

    toast.promise(auth.signOut(), {
      loading: 'Signing out...',
      success: 'Signed Out',
      error: 'Error signing out',
    });
    auth
      .signOut()
      .then(() => {
        authCtx.signOut();
        dispatch(setUserSignOutState());

        // Delete anonymous guest user from database
        if (userName === 'Guest') {
          dispatch(deleteUser(uid));
          uid = null;
        }
      })
      .catch(err => alert(err.message));

    localStorage.removeItem('username');

    // close mobile menu
    if (mobileMenuIsOpen) {
      document.body.style.overflow = 'visible';
      dispatch(
        isOpen({
          click: false,
        })
      );
    }

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
        <>
          <button onClick={dropdownMobileMenu} className="drop-btn">
            Profile &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
          </button>
        </>
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

    // close mobile menu
    if (mobileMenuIsOpen) {
      document.body.style.overflow = 'visible';
      dispatch(
        isOpen({
          click: false,
        })
      );
    }
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
            <b>{username}</b>
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
              className="sign-in-out-btn guest-btn"
            >
              As Guest
            </button>
            <button
              onClick={onSignInClick}
              className="sign-in-out-btn google-btn"
            >
              Google
              {/* <ion-icon name="logo-google"></ion-icon> */}
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
