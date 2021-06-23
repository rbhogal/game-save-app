import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './TwitchAuth.css';

const TwitchAuth = () => {
  const [token, setToken] = useState('');
  const signInDrop = useRef();
  const CLIENT_ID = 'zu11vezio6yttm9q01oea69kq9dd1h';

  useEffect(() => {
    if (document.location.hash === '') return;

    let parsedHash = new URLSearchParams(window.location.hash.substr(1));
    let accessToken = parsedHash.get('access_token');

    setToken(accessToken);

    axios
      .get('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(resp => console.log(resp.data.data[0].id));

    renderButtons();
  }, [token]);

  const renderButtons = () => {
    if (token) {
      signInDrop.current.innerHTML =
        'profile &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>';

      return <div>Signed in!</div>;
    }

    if (!token)
      return (
        <button onClick={onSignInClick} className="sign-in-btn">
          Twitch <ion-icon name="logo-twitch"></ion-icon>
        </button>
      );

    return <div>something is wrong</div>;
  };

  const onSignInClick = () => {
    const REDIRECT_URI = 'http://localhost:3000';

    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:email`;
  };

  return (
    <div className="dropdown">
      <button ref={signInDrop} className="drop-btn">
        Sign In &nbsp; <ion-icon name="chevron-down-outline"></ion-icon>
      </button>
      <div className="dropdown-content dropdown-content-sign-in">
        <Link>{renderButtons()}</Link>
      </div>
    </div>
  );
};

export default TwitchAuth;

// https://<your registered redirect URI>#access_token=<an access token>
