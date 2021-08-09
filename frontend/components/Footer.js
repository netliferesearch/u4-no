import React from 'react';
import BEMHelper from 'react-bem-helper';
import Logo from './Logo';
import Link from 'next/link';
import CmiLogoWhite from './icons/CmiLogoWhite';
import { FacebookIcon, TwitterIcon, LinkedInIcon, EmailIcon } from './icons/SocialIcons';
import { Newsletter } from './Newsletter';

const classes = BEMHelper({
  name: 'footer',
  prefix: 'c-',
});

const Footer = () => (
  <footer className="c-footer o-wrapper-full-width">
    <div className="c-footer__row u-flex-sb o-wrapper-medium">
      <div className="c-footer__col2 c-newsletter-footer c-newsletter-v2 u-side-padding-mobile">
        <Newsletter cta="Subscribe to our emails" text1="" text2="" button="Sign up" />
      </div>
      <div className="c-footer-mobile-seperator" />
      <div className="c-footer__col1 u-side-padding-mobile">
        <h4 className="u-secondary-heading-white u-detail--white c-footer-mobile-margin">
          Follow Us
        </h4>
        <div className="c-share-buttons">
          <a className="c-share-button" href="https://www.facebook.com/U4anticorruption/">
            <FacebookIcon />
          </a>
          <a
            className="c-share-button"
            href="https://www.linkedin.com/showcase/u4-anti-corruption-resource-centre/"
          >
            <LinkedInIcon />
          </a>

          <a className="c-share-button" href="https://twitter.com/U4_ACRC">
            <TwitterIcon />
          </a>
          <a className="c-share-button" href="https://twitter.com/U4_ACRC">
            <EmailIcon />
          </a>
        </div>
      </div>
    </div>
    <div className="o-wrapper-full-width c-footer__row-second">
      <div className="c-footer__row u-flex-sb o-wrapper-medium ">
        <a
          href="https://www.cmi.no/"
          className="c-footer__logo u-border--none u-side-padding-mobile"
        >
          <CmiLogoWhite {...classes('color-icon')} />
        </a>
        <div>
          <p className="u-body--small c-footer-description u-side-padding-mobile">
            The U4 Anti-Corruption Resource Centre works to reduce the harmful impact of corruption
            on society. U4 is a permanent centre at Chr. Michelsen Institute in Norway.
          </p>
        </div>
        <div className="c-footer-mobile-seperator" />
        <div className="u-side-padding-mobile">
          <Link href="/topics">
            <a className="c-btn c-btn--qua u-body--small c-footer-hyperlinks-light">
              <span>Research topics</span>
            </a>
          </Link>

          <Link href="/blog">
            <a className="c-btn c-btn--qua u-body--small c-footer-hyperlinks-light">
              <span>Blog</span>
            </a>
          </Link>

          <Link href="/courses">
            <a className="c-btn c-btn--qua u-body--small c-footer-hyperlinks-light">
              <span>Online course</span>
            </a>
          </Link>
        </div>
        <div className="u-side-padding-mobile">
          {' '}
          <Link href="/privacy-policy">
            <a className="c-btn  c-btn--qua u-body--small  c-footer-hyperlinks">
              <span>Privacy policy</span>
            </a>
          </Link>
          <Link href="/about-u4">
            <a className="c-btn c-btn--qua u-body--small c-footer-hyperlinks">
              <span>Vision & Strategy</span>
            </a>
          </Link>
          <Link href="/the-team">
            <a className="c-btn c-btn--qua u-body--small  c-footer-hyperlinks">
              <span>Team</span>
            </a>
          </Link>
        </div>
      </div>
      {/* <div className="c-footer__col c-footer__links">
        <h4 className="u-secondary-heading">About U4</h4>
        <Link href="/the-team">
          <a className="c-btn c-btn--qua">
            <span>Team</span>
          </a>
        </Link>
      </div> */}
      {/* <div className="u-flex-sb">
        <div className="c-footer__col1">
          <div className="u-text--grey">
            <h4 className="u-secondary-heading">Address</h4>
            <p className="u-margin--no">U4 - Chr. Michelsen Institute</p>
            <p className="u-margin--no">P.O. Box 6033</p>
            <p className="u-margin--no">N-5892 Bergen, Norway</p>
            <p className="u-margin--no">Visiting address: Jekteviksbakken 31, Bergen</p>
          </div>
        </div>

        <div className="c-footer__col2 u-flex-sb">
          <div className="c-footer__col c-footer__links--no-h">
            <Link href="/topics">
              <a className="c-btn c-btn--qua">
                <span>Research topics</span>
              </a>
            </Link>

            <Link href="/blog">
              <a className="c-btn c-btn--qua">
                <span>Blog</span>
              </a>
            </Link>

            <Link href="/courses">
              <a className="c-btn c-btn--qua">
                <span>Online course</span>
              </a>
            </Link>
          </div>
          <div className="c-footer__col c-footer__links">
            <h4 className="u-secondary-heading">About U4</h4>
            <Link href="/the-team">
              <a className="c-btn c-btn--qua">
                <span>Team</span>
              </a>
            </Link>

            <Link href="/about-u4">
              <a className="c-btn c-btn--qua">
                <span>Vision & Strategy</span>
              </a>
            </Link>

            <Link href="/privacy-policy">
              <a className="c-btn  c-btn--qua">
                <span>Privacy policy</span>
              </a>
            </Link>
          </div>
          <div className="c-footer__col c-footer__links">
            <h4 className="u-secondary-heading">Contact</h4>
            <a className="c-btn c-btn--qua" href="mailto:u4@cmi.no">
              u4@cmi.no
            </a>

            <a className="c-btn c-btn--qua" href="tel:004747938000">
              + 47 479 38 000
            </a>

            <p className="">
              The U4 Anti-Corruption Resource Centre works to reduce the harmful impact of
              corruption on society. U4 is a permanent centre at Chr. Michelsen Institute in Norway.
            </p>
          </div>
        </div>
      </div> */}
    </div>

    <div />
  </footer>
);

export default Footer;
