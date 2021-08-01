import React from 'react';

const GameLinks = props => {
  const { websitesArr } = props;
  const newWebsitesArr = [];
  let officialURL = '';

  websitesArr.forEach(website => {
    if (website.category === 1) officialURL = website.url;

    if (website.category === 5) {
      newWebsitesArr.push({
        url: website.url,
        icon: 'logo-twitter',
        name: 'Twitter',
      });
    }
    if (website.category === 6) {
      newWebsitesArr.push({
        url: website.url,
        icon: 'logo-twitch',
        name: 'Twitch',
      });
    }
    if (website.category === 8) {
      newWebsitesArr.push({
        url: website.url,
        icon: 'logo-instagram',
        name: 'Instagram',
      });
    }
    if (website.category === 9) {
      newWebsitesArr.push({
        url: website.url,
        icon: 'logo-youtube',
        name: 'Youtube',
      });
    }
    if (website.category === 18) {
      newWebsitesArr.push({
        url: website.url,
        icon: 'logo-discord',
        name: 'Discord',
      });
    }
  });

  return (
    <>
      <a href={officialURL} target="_blank" rel="noreferrer noopener">
        <div className="game-links-container">
          <ion-icon name="link-outline"></ion-icon>
          <p>Official Website</p>
        </div>
      </a>

      {newWebsitesArr.map(website => (
        <a href={website.url} target="_blank" rel="noreferrer noopener">
          <div className="game-links-container">
            <ion-icon name={website.icon}></ion-icon>
            <p>{website.name}</p>
          </div>
        </a>
      ))}
    </>
  );
};

export default GameLinks;
