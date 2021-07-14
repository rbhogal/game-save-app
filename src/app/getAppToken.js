import axios from 'axios';

export const getAppToken = async () => {
  // Helper Functions
  const calcRemainingTime = expirationTime => {
    // expirationTime is in seconds, getTime is in ms. Convert it also to ms.

    const currTime = new Date().getTime();
    // const adjExpirationTime = new Date(expirationTime).getTime();
    const adjExpirationTime = new Date(
      new Date().getTime() + expirationTime * 1000
    );

    const remainingDuration = adjExpirationTime - currTime;

    return remainingDuration;
  };

  const getNewToken = async () => {
    // Get token from Twitch
    const respTwitch = await axios.post(
      `https://id.twitch.tv/oauth2/token`,
      null,
      {
        params: {
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
      }
    );
    const { data } = respTwitch;

    // Store token and expiration time to firebase
    axios
      .put('https://game-save-default-rtdb.firebaseio.com/admin.json', {
        expiresIn: data.expires_in,
        token: data.access_token,
      })
      .then()
      .catch(err => {
        alert(err.message);
      });
  };

  // Get New Token If it Expires & dispatch token to redux
  try {
    // Get token's expiration time from firebase
    const respFirebase = await axios.get(
      'https://game-save-default-rtdb.firebaseio.com/admin.json'
    );
    const { data: dataFirebase } = respFirebase;

    const expirationTime = dataFirebase.expiresIn;
    const token = dataFirebase.token;

    const remainingDuration = calcRemainingTime(expirationTime);

    // Gets new token when token expires
    setTimeout(getNewToken, remainingDuration);
    console.log(token);
    return token;
  } catch (err) {
    alert(err.message);
  }
};
