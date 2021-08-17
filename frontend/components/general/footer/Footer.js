import React from 'react';
import BEMHelper from 'react-bem-helper';
import CmiLogoWhite from '../../icons/CmiLogoWhite';
import { Newsletter } from '../newsletter/Newsletter';
import { SocialFollow } from '../social/SocialFollow';
import { socialItems } from '../social/socialItems';
import { footerMenu, footerText } from './data';
import { MenuItem } from './MenuItem';

const classes = BEMHelper({
  name: 'footer',
  prefix: 'c-',
});

const Footer = () => (
  <footer className="c-footer o-wrapper-full-width u-bg-dark-blue">
    <div className="u-flex-sb o-wrapper-medium">
      <div className="c-footer__col1">
        <Newsletter cta="Subscribe to our emails" text1="" text2="" button="Sign up" />
      </div>
      <hr className="c-footer-mobile-seperator" />
      <div className="c-footer__col2">
        <h4 className="c-footer__heading u-secondary-heading u-secondary-h1 u-detail--white">
          Follow Us
        </h4>
        <SocialFollow items={socialItems} />
      </div>
    </div>
    <div className="c-footer__bottom">
      <div className="c-footer__row u-flex-sb o-wrapper-medium">
        <div className="c-footer__col1">
          <a href={footerText.url} className="c-footer__logo u-border--none">
            <CmiLogoWhite {...classes('color-icon')} />
          </a>
          <p className="u-body--small u-text--light-blue c-footer-description">
            {footerText.description}
          </p>
        </div>
        <hr className="c-footer-mobile-seperator" />
        <div className="c-footer__menu c-footer__col2">
          <div className="c-footer__menu-col">
            {footerMenu.slice(0, 3).map((i, index) => (
              <MenuItem key={index} item={i} />
            ))}
          </div>
          <div className="u-opacity--60--text c-footer__menu-col">
            {footerMenu.slice(3).map((i, index) => (
              <MenuItem key={index} item={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
    <div />
  </footer>
);

export default Footer;
