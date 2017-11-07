import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Logo } from './';
import { Link } from '../routes';
import { CmiLogo } from './icons/';
import { MediumLogo } from './icons/';
import { TwitterLogo } from './icons/';
import { FacebookLogo } from './icons/';

const classes = BEMHelper({
  name: 'footer',
  prefix: 'c-',
});

const Footer = ({ title }) => (
  <footer {...classes()}>
    <div>
      <div {...classes('wrapper', null, 'o-wrapper')}>
        <div {...classes('item')}>
          <Link to="http://www.cmi.no">
            <a {...classes('link')}>
              <CmiLogo {...classes('color-icon')} />
            </a>
          </Link>
          <Link to="/">
            <a {...classes('link')}>
              <Logo {...classes('color-icon')} />
            </a>
          </Link>
        </div>
        <div {...classes('item')}>
          <div {...classes('heading')}>Contact</div>
          <a href="mailto:u4@cmi.no">u4@cmi.no</a><br />
          <a href="tel:004747938000">+ 47 479 38 000</a><br />
        </div>
        <div {...classes('item')}>
          <div {...classes('heading')}>Address</div>
          Chr. Michelsen Institute,<br />
          Jekteviksbakken 31,<br />
          5006 Bergen, Norway
        </div>
        <div {...classes('item')}>
          <div {...classes('heading')} />
          <a href="#">Privacy / licence</a><br />
          <a href="#">Vacancy</a><br />
          <a href="#">Cookies</a><br />
        </div>
        <div {...classes('item')}>
          <div {...classes('heading')}>Follow us</div>
          <a href="#"><MediumLogo {...classes('some-icon')} />Medium</a><br />
          <a href="#"><TwitterLogo {...classes('some-icon')} />Twitter</a><br />
          <a href="#"><FacebookLogo {...classes('some-icon')} />Facebook</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
