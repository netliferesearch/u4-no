import React, { useRef, useState } from 'react';
import ClientOnlyPortal from './ClientOnlyPortal';
import { CloseButton, TextButton } from './buttons';
import { useOnClickOutside, useLockBodyScroll } from '../../helpers/hooks';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  // FacebookIcon,
  // TwitterIcon,
  // EmailIcon,
} from 'react-share';
import { FacebookIcon, TwitterIcon, EmailIcon, LinkedInIcon } from './icons/SocialIcons';

/**
 * V2 - Social Share component with modal
 * @param {Array} topics
 * @param {function} setFilter
 * @param {Array} filters
 */

export const Share = ({ text = '' }) => {
  const [open, setOpen] = useState();
  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextButton onClick={() => setOpen(true)} text="Share" modifier="sec" />
      {open && <Modal text={text} title="Share" setOpen={setOpen} />}
    </div>
  );
};

export const Modal = ({ text = '', title = '', setOpen }) => {
  const url = typeof window === 'undefined' ? '' : window.location.href;
  // ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  //hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));
  //hook to lock body scroll
  useLockBodyScroll();

  const onKeyDown = event => {
    if (event.keyCode === 27) {
      setOpen(false);
    }
  };

  const copyRef = useRef(null);

  return (
    <ClientOnlyPortal selector="#modal">
      <aside
        className="c-modal__cover"
        aria-modal="true"
        tabIndex="-1"
        role="dialog"
        onKeyDown={onKeyDown}
      >
        <div className="c-modal__area  c-modal--share" ref={ref}>
          <div className="c-modal__top">
            <h3 className="c-modal__title">{title}</h3>
            <CloseButton onClick={e => setOpen(false)} />
          </div>
          <hr className="u-section-underline--no-margins" />
          <div className="c-modal__content">
            <div className="c-modal__text" ref={copyRef}>
              {text}
            </div>
            <div className="c-share-buttons">
              <FacebookShareButton className="c-share-buttons__facebook" url={url} quote={title}>
                <FacebookIcon />
              </FacebookShareButton>
              <LinkedinShareButton className="c-share-buttons__twitter" url={url} title={title}>
                <LinkedInIcon />
              </LinkedinShareButton>
              <TwitterShareButton className="c-share-buttons__twitter" url={url} title={title}>
                <TwitterIcon />
              </TwitterShareButton>
              <EmailShareButton className="c-share-buttons__email" url={url} subject={title}>
                <EmailIcon
                  size={40}
                  round={true}
                  bgStyle={{ fill: 'transparent' }}
                  iconFillColor={'#1E2051'}
                />
              </EmailShareButton>
              <TextButton onClick={() => navigator.clipboard.writeText(url)} text="Copy link" modifier="ter" />
            </div>
          </div>
        </div>
      </aside>
    </ClientOnlyPortal>
  );
};

export const ShareOnSocialMedia = ({ title = '' }) => {
  let url = typeof window === 'undefined' ? '' : window.location.href;

  return (
    <div className="c-share-buttons">
      <FacebookShareButton className="c-share-buttons__facebook" url={url} quote={title}>
        <FacebookIcon
          size={40}
          round={true}
          bgStyle={{ fill: 'transparent' }}
          iconFillColor={'#1E2051'}
        />
      </FacebookShareButton>
      <TwitterShareButton className="c-share-buttons__twitter" url={url} title={title}>
        <TwitterIcon
          size={40}
          round={true}
          bgStyle={{ fill: 'transparent' }}
          iconFillColor={'#1E2051'}
        />
      </TwitterShareButton>
      <EmailShareButton className="c-share-buttons__email" url={url} subject={title}>
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
