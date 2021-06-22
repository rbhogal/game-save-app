import React from 'react';

const TwitchAuth = () => {
  const onSignInClick = () => {
    const CLIENT_ID = 'zu11vezio6yttm9q01oea69kq9dd1h';
    const REDIRECT_URI = 'http://localhost:3000';

    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:email`;
  };

  return (
    <button onClick={onSignInClick} className="sign-in-btn">
      Twitch <ion-icon name="logo-twitch"></ion-icon>
    </button>
  );
};

export default TwitchAuth;
