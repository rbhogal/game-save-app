import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './TwitchAuth.css';
import { userAdded } from '../../features/users/usersSlice';

const TwitchAuth = () => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [profileImgURL, setProfileImgURL] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const CLIENT_ID = 'zu11vezio6yttm9q01oea69kq9dd1h';

  // const isSignedIn = (userId) ? true : false;
  // console.log(isSignedIn);

  // const fetchUserData = () => {
  //   // get user data: name and id from API

  // };

  useEffect(() => {
    if (document.location.hash === '') return;

    let parsedHash = new URLSearchParams(window.location.hash.substr(1));
    let accessToken = parsedHash.get('access_token');

    setToken(accessToken);

    axios
      .get('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(resp => {
        const { data } = resp.data;
        const id = data[0].id;
        const userName = data[0].display_name;
        const profileImgURL = data[0].profile_image_url;
        setUserId(id);
        setUsername(userName);
        setIsSignedIn(true);
        setProfileImgURL(profileImgURL);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  const addUserToStore = () => {
    dispatch(
      userAdded({
        id: userId,
        name: username,
        accessToken: token,
      })
    );
  };

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
        renderDropdown();
      })
      .catch(err => alert(err));
  };

  const renderDropdown = () => {
    renderDropBtn();
    renderDropdownContent();
  };

  const renderDropBtn = () => {
    // Signed In
    if (isSignedIn) {
      console.log(profileImgURL);
      return (
        <button className="drop-btn">
          Profile &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      );
    }

    //Not Signed In
    if (!isSignedIn) {
      return (
        <button className="drop-btn">
          Sign In &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
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
          <p>Signed in as </p>
          <b>{username}</b>

          <hr className="solid"></hr>
          <Link to="/savedgames" className="link-saved-games">
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
            <button onClick={onSignInClick} className="sign-in-out-btn">
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
