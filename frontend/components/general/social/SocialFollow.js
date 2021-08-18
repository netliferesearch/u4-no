import React from 'react';
import { EmailIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from '../../icons/SocialIcons';

export const SocialFollow = ({ items }) => {
  return (
    <div className="c-social c-social--follow">
      <a className="c-social--follow__item" href={items[0].url}>
        <FacebookIcon />
      </a>
      <a className="c-social--follow__item" href={items[1].url}>
        <LinkedInIcon />
      </a>
      <a className="c-social--follow__item" href={items[2].url}>
        <TwitterIcon />
      </a>
      <a className="c-social--follow__item" href={items[0].url}>
        <EmailIcon />
      </a>
    </div>
  );
};