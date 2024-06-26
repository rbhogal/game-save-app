import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './TwitchAuth.css';
import {
  getUserDataAsync,
  signIn,
  signOut,
} from '../../features/users/usersSlice';
import { isOpen } from '../../features/mobileMenu/mobileMenuSlice';

// !!! DEPRECIATED
const TwitchAuth = () => {
  const initialSignIn = localStorage.getItem('isSignedIn');
  console.log('local storage', initialSignIn);
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  // const [profileImgURL, setProfileImgURL] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(!!initialSignIn);
  console.log('useState', isSignedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Return if not authenticated
    if (window.location.hash === '') return;

    // Get access token from URL
    let parsedHash = new URLSearchParams(window.location.hash.substr(1));
    let accessToken = parsedHash.get('access_token');
    localStorage.setItem('token', accessToken);
    setToken(accessToken);

    setIsLoading(true);
    // Get user's data from Twitch API
    axios
      .get('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        // Get user data from Twitch API
        const { data } = res.data;
        const id = data[0].id;
        const userName = data[0].display_name;
        // const profileImgURL = data[0].profile_image_url;

        // Fetch users from database, match their id with signed in id
        axios
          .get('https://game-save-default-rtdb.firebaseio.com/users.json')
          .then(res => {
            const users = res.data;

            // If user doesn't already exist add them to the database
            for (const key in users) {
              // User exists
              if (users[key].id === id) {
                //POST that the user is signed in
                axios.patch(
                  `https://game-save-default-rtdb.firebaseio.com/users/${key}.json`,
                  {
                    isSignedIn: true,
                  }
                );

                dispatch(getUserDataAsync(key));
              }

              // Create new User
              if (users[key].id !== id) {
                // add new user to database
                axios
                  .post(
                    'https://game-save-default-rtdb.firebaseio.com/users.json',
                    {
                      id: id,
                      isSignedIn: true,
                      name: userName,
                    }
                  )
                  .then(resp => {
                    //...
                  })
                  .catch(err => {
                    console.log(err);
                  });
                dispatch(getUserDataAsync(key));
              }
            }
          })
          .catch(err => {
            alert(err);
          });

        // Sign in user (redux store)
        // UPDATE: Fetch user data thunk? (which adds them to state)

        // dispatch(
        //   signIn({
        //     id: id,
        //     name: userName,
        //     accessToken: accessToken,
        //     isSignedIn: isSignedIn,
        //   })
        // );

        // Sign in user and store id, username to store
        setUserId(id);
        setUsername(userName);
        // setProfileImgURL(profileImgURL);
        setIsSignedIn(true);
        localStorage.setItem('isSignedIn', 'true');
        setIsLoading(false);
      })
      .catch(err => {
        alert(err);
      });
  }, [dispatch, isSignedIn]);

  const onSignInClick = () => {
    const REDIRECT_URI = 'http://localhost:3000';
    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:email`;
  };

  const onSignOutClick = () => {
    axios
      .post(
        `https://id.twitch.tv/oauth2/revoke?client_id=${CLIENT_ID}&token=${token}`
      )
      .then(() => {
        // Sign out user

        dispatch(
          signOut({
            id: userId,
            accessToken: '',
          })
        );
        localStorage.removeItem('isSignedIn');
        localStorage.removeItem('token');
        setIsSignedIn(false);
        setUserId('');
        renderDropdown();
      })
      .catch(err => alert(err));
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
              className="sign-in-out-btn twitch-btn"
            >
              Twitch <ion-icon name="logo-twitch"></ion-icon>
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
      className="TwitchAuth"
    >
      {renderDropBtn()}
      {dropdown && renderDropdownContent()}
    </div>
  );
};

export default TwitchAuth;
