import React from 'react';
import BEMHelper from 'react-bem-helper';
import Logo from './Logo';
import Link from 'next/link';
import CmiLogo from './icons/CmiLogo';
import { FacebookIcon, TwitterIcon, LinkedInIcon } from './v2/icons/SocialIcons';
import { Newsletter } from './v2/Newsletter';

const classes = BEMHelper({
  name: 'footer',
  prefix: 'c-',
});

const Footer = () => (
  <footer className="c-footer o-wrapper-medium">
    <div className="c-footer__row u-flex-sb">
      <a href="https://www.cmi.no/" className="c-footer__logo u-border--none">
        <CmiLogo {...classes('color-icon')} />
      </a>
    </div>
    <div className="c-footer__row u-flex-sb">
      <div className="c-footer__col1">
        <p className="u-text--18">
          The U4 Anti-Corruption Resource Centre works to reduce the harmful impact of corruption on
          society. U4 is a permanent centre at Chr. Michelsen Institute in Norway.
        </p>
      </div>
      <div className="c-footer__col2 c-newsletter-footer c-newsletter-v2">
        <Newsletter cta="Dont miss our next report" text1="" text2="" button="Keep me updated" />
      </div>
    </div>
    <div className="u-flex-sb">
      <div className="c-footer__col1">
        <div className="u-text--15 u-text--grey">
          <h4 className="u-heading--5">Address</h4>
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
          <h4 className="u-heading--5">About U4</h4>
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
          <h4 className="u-heading--5">Contact</h4>
          <a className="c-btn c-btn--qua" href="mailto:u4@cmi.no">
            u4@cmi.no
          </a>

          <a className="c-btn c-btn--qua" href="tel:004747938000">
            + 47 479 38 000
          </a>

          <div className="c-share-buttons">
            <a href="https://www.facebook.com/U4anticorruption/">
              <FacebookIcon />
            </a>
            <a href="https://www.linkedin.com/showcase/u4-anti-corruption-resource-centre/">
              <LinkedInIcon />
            </a>

            <a href="https://twitter.com/U4_ACRC">
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div />
  </footer>
);

export default Footer