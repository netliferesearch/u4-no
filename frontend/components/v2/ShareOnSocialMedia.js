import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';

export const ShareOnSocialMedia = ({ title = '' }) => {
  let url = typeof window === 'undefined' ? '' : window.location.href;

  return (
    <div className="c-share-buttons">
      <FacebookShareButton className="c-share-buttons__fb" url={url} quote={title}>
        <FacebookIcon
          size={40}
          round={true}
          bgStyle={{ fill: 'transparent' }}
          iconFillColor={'#1E2051'}
        />
      </FacebookShareButton>
      <TwitterShareButton className="c-share-buttons__fb" url={url} title={title}>
        <TwitterIcon
          size={40}
          round={true}
          bgStyle={{ fill: 'transparent' }}
          iconFillColor={'#1E2051'}
        />
      </TwitterShareButton>
      <EmailShareButton className="c-share-buttons__fb" url={url} subject={title}>
        <EmailIcon
          size={40}
          round={true}
          bgStyle={{ fill: 'transparent' }}
          iconFillColor={'#1E2051'}
        />
      </EmailShareButton>
    </div>
  );
};
