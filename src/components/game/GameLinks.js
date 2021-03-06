import React from 'react';

const GameLinks = props => {
  const { websitesArr } = props;
  const newWebsitesArr = [];
  let officialURL = '';
  let wikiURL = '';

  websitesArr.forEach(website => {
    if (website.category === 1) officialURL = website.url;

    if (website.category === 3) wikiURL = website.url;

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

    if (website.category === 13) {
      newWebsitesArr.push({
        url: website.url,
        icon: 'logo-steam',
        name: 'Steam',
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
      {officialURL && (
        <a href={officialURL} target="_blank" rel="noreferrer noopener">
          <div className="game-links-container">
            <ion-icon name="link-outline"></ion-icon>
            <p>Official Website</p>
          </div>
        </a>
      )}

      {wikiURL && (
        <a href={wikiURL} target="_blank" rel="noreferrer noopener">
          <div className="game-links-container">
            <span style={{ fontSize: '2rem' }}>
              <i className="fab fa-wikipedia-w"></i>
            </span>
            <p>Wiki</p>
          </div>
        </a>
      )}

      {newWebsitesArr.map(website => (
        <a
          key={website.url}
          href={website.url}
          target="_blank"
          rel="noreferrer noopener"
        >
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
