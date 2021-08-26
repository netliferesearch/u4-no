import React from 'react';
import { EmailIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from '../../icons/SocialIcons';

export const SocialFollow = ({ footer, items, faceBook, linkedIn, twitter, email }) => {
  return (
    <div className="c-social c-social--follow">
      {!faceBook && !footer ? null : (
        <a className="c-social--follow__item" href={faceBook ? faceBook : items[0].url}>
          <FacebookIcon />
        </a>
      )}
      {!linkedIn && !footer ? null : (
        <a className="c-social--follow__item" href={linkedIn ? linkedIn : items[1].url}>
          <LinkedInIcon />
        </a>
      )}

      {!twitter && !footer ? null : (
        <a className="c-social--follow__item" href={twitter ? twitter : items[2].url}>
          <TwitterIcon />
        </a>
      )}

      {!email && !footer ? null : (
        <a className="c-social--follow__item" href={email ? `mailto:${email}` : items[3].url}>
          <EmailIcon />
        </a>
      )}
    </div>
  );
};
