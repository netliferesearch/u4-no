import React from 'react';
import BEMHelper from 'react-bem-helper';
import Logo from './Logo';
import Link from 'next/link';
import CmiLogo from './icons/LinkedIn';
import MediumLogo from './icons/FacebookLogo';
import TwitterLogo from './icons/TwitterLogo';
import FacebookLogo from './icons/MediumLogo';
import LinkedIn from './icons/CmiLogo';

const classes = BEMHelper({
  name: 'footer',
  prefix: 'c-',
});

const Footer = () => (
  <footer {...classes(null, null, 'o-wrapper-full-width')}>
    <div>
      <div {...classes('wrapper', null, 'o-wrapper')}>
        <div {...classes('item')}>
          <a href="https://www.cmi.no/" {...classes('link')}>
            <CmiLogo {...classes('color-icon')} />
          </a>
          <a href="https://www.u4.no" {...classes('link')}>
            <Logo {...classes('color-icon')} />
          </a>
        </div>
        <div {...classes('item')}>
          <div {...classes('heading')}>Contact</div>
          <a href="mailto:u4@cmi.no">u4@cmi.no</a>
          <br />
          <a href="tel:004747938000">+ 47 479 38 000</a>
          <br />
        </div>
        <div {...classes('item')}>
          <div {...classes('heading')}>Address</div>
          U4 - Chr. Michelsen Institute
          <br />
          P.O. Box 6033
          <br />
          N-5892 Bergen, Norway
          <br />
          Visiting address: Jekteviksbakken 31, Bergen
        </div>
        <div {...classes('item')}>
          <a
            href="https://cmi.us16.list-manage.com/subscribe?u=e5ddae636e7550347b5fc48d3&id=387c25c3a9"
            title="Sign up for our newsletter"
          >
            Newsletter
          </a>
          <br />
          <Link href="/privacy-policy">
            <a>Privacy policy</a>
          </Link>
          <br />
          <Link href="/about-u4#open-access-policy">
            <a>Open access policy</a>
          </Link>
          <br />
          <Link href="/about-u4">
            <a>About U4</a>
          </Link>
          <br />
        </div>
        <div {...classes('item')}>
          <div {...classes('heading')}>Follow us</div>
          <a href="https://www.linkedin.com/showcase/u4-anti-corruption-resource-centre/">
            <LinkedIn {...classes('some-icon')} />
            LinkedIn
          </a>
          <br />
          <a href="https://medium.com/u4-anti-corruption-resource-centre">
            <MediumLogo {...classes('some-icon')} />
            Medium
          </a>
          <br />
          <a href="https://twitter.com/U4_ACRC">
            <TwitterLogo {...classes('some-icon')} />
            Twitter
          </a>
          <br />
          <a href="https://www.facebook.com/U4anticorruption/">
            <FacebookLogo {...classes('some-icon')} />
            Facebook
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
