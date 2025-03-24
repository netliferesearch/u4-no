import React from 'react';
import { BlueskyIcon, EmailIcon, FacebookIcon, LinkedInIcon } from '../../icons/SocialIcons';

export const SocialFollow = ({ footer, items, faceBook, linkedIn, bluesky, email, target = 'U4' }) => {
  return (
    <div className="c-social c-social--follow">
      {!faceBook && !footer ? null : (
        <a className="c-social--follow__item" href={faceBook ? faceBook : items[0].url}
          title={`Follow ${target} on Facebook`}
        >
          <FacebookIcon />
        </a>
      )}
      {!linkedIn && !footer ? null : (
        <a className="c-social--follow__item" href={linkedIn ? linkedIn : items[1].url}
          title={`Follow ${target} on LinkedIn`}
        >
          <LinkedInIcon />
        </a>
      )}

      {!bluesky && !footer ? null : (
        <a className="c-social--follow__item" href={bluesky ? bluesky : items[2].url}
          title={`Follow ${target} on Bluesky`}
        >
          <BlueskyIcon />
        </a>
      )}

      {!email && !footer ? null : (
        <a className="c-social--follow__item" href={email ? `mailto:${email}` : items[3].url}
          title={`E-mail ${target}`}
        >
          <EmailIcon />
        </a>
      )}
    </div>
  );
};
