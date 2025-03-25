import React from 'react';
import {
  BlueskyShareButton,
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'react-share';
import { BlueskyIcon, EmailIcon, FacebookIcon, LinkedInIcon } from '../../icons/SocialIcons';
import { TextButton } from '../buttons';

export const SocialShare = ({ title = '' }) => {
  const url = typeof window === 'undefined' ? '' : window.location.href;
  return (
    <div className="c-social--share__buttons">
      <FacebookShareButton
        className="c-social--share__item c-social--share__buttons--facebook"
        url={url}
        quote={title}
      >
        <FacebookIcon />
      </FacebookShareButton>
      <LinkedinShareButton
        className="c-social--share__item c-social--share__buttons--twitter"
        url={url}
        title={title}
      >
        <LinkedInIcon />
      </LinkedinShareButton>
      <BlueskyShareButton
        className="c-social--share__item c-social--share__buttons--bluesky"
        url={url}
        title={title}
      >
        <BlueskyIcon />
      </BlueskyShareButton>
      <EmailShareButton
        className="c-social--share__item c-social--share__buttons--email"
        url={url}
        subject={title}
      >
        <EmailIcon
        // size={40}
        // round={true}
        // bgStyle={{ fill: 'transparent' }}
        // iconFillColor={'#1E2051'}
        />
      </EmailShareButton>
      <TextButton onClick={() => navigator.clipboard.writeText(url)} text="Copy link" />
    </div>
  );
};
