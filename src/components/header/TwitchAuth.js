import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './TwitchAuth.css';
import { userAdded, signOut } from '../../features/users/usersSlice';
import { isOpen } from '../../features/mobileMenu/mobileMenuSlice';

const TwitchAuth = () => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  // const [profileImgURL, setProfileImgURL] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  //  const index = state.findIndex(user => user.id === action.payload.id);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  //   const isSignedIn = undefined ? false : user[0].isSignedIn;
  // console.log(isSignedIn);

  const CLIENT_ID = 'zu11vezio6yttm9q01oea69kq9dd1h';

  // const isSignedIn = (userId) ? true : false;
  // console.log(isSignedIn);

  // const fetchUserData = () => {
  //   // get user data: name and id from API

  // };

  useEffect(() => {
    // Return if not authenticated
    if (window.location.hash === '') return;

    // Get access token from URL
    let parsedHash = new URLSearchParams(window.location.hash.substr(1));
    let accessToken = parsedHash.get('access_token');
    setToken(accessToken);

    // Get user's data from API
    axios
      .get('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(resp => {
        // Get user data from Twitch API
        const { data } = resp.data;
        const id = data[0].id;
        const userName = data[0].display_name;
        // const profileImgURL = data[0].profile_image_url;
        const user = users.findIndex(user => user.id === id);

        // user doesn't exist add new user
        if (user === -1) {
          dispatch(
            userAdded({
              id: id,
              name: userName,
              accessToken: accessToken,
              isSignedIn: true,
            })
          );
        }
        /* 
        // * FUTURE UPDATE: IF YOU ADD BACKEND * 
        // If USER does exist sign them in (redux)
        if (user >= 1) {
          dispatch(
            signIn({
              id: id,
              accessToken: accessToken,
            })
          );
        }
        */
        setUserId(id);
        setUsername(userName);
        // setProfileImgURL(profileImgURL);
        setIsSignedIn(true);
      })
      .catch(err => {
        alert(err);
      });
  }, [dispatch, users]);

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
        setIsSignedIn(false);

        //dispatch make sure current user isSignedIn is set to false

        dispatch(
          signOut({
            id: userId,
            accessToken: '',
          })
        );

        setUserId('');
        renderDropdown();
      })
      .catch(err => console.log(err));
  };

  const renderDropdown = () => {
    renderDropBtn();
    renderDropdownContent();
  };

  const handleSignInClick = () => {
    // Click only works for mobile
    if (window.innerWidth > 960) return;
    setDropdown(!dropdown);
  };

  const handleProfileClick = () => {
    if (window.innerWidth > 960) return;
    setDropdown(!dropdown);
  };

  const renderDropBtn = () => {
    // Signed In
    if (isSignedIn) {
      return (
        <button onClick={handleProfileClick} className="drop-btn">
          Profile &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      );
    }

    //Not Signed In
    if (!isSignedIn) {
      return (
        <button onClick={handleSignInClick} className="drop-btn">
          Sign In &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      );
    }
  };

  const handleSavedGamesClick = () => {
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
            onClick={handleSavedGamesClick}
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
