import React from 'react';
import { EmailIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from '../../icons/SocialIcons';
import { TextButton } from '../buttons';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

export const SocialShare = ({ title = ''}) => {
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
      <TwitterShareButton
        className="c-social--share__item c-social--share__buttons--twitter"
        url={url}
        title={title}
      >
        <TwitterIcon />
      </TwitterShareButton>
      <EmailShareButton
        className="c-social--share__item c-social--share__buttons--email"
        url={url}
        subject={title}
      >
        <EmailIcon
          size={40}
          round={true}
          bgStyle={{ fill: 'transparent' }}
          iconFillColor={'#1E2051'}
        />
      </EmailShareButton>
      <TextButton onClick={() => navigator.clipboard.writeText(url)} text="Copy link" />
    </div>
  );
};
