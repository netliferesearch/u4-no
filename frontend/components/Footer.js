import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Logo } from './';
import { CmiLogo } from './icons/';

const classes = BEMHelper({
  name: 'footer',
  prefix: 'c-',
});

const Footer = ({ title }) => (
  <footer {...classes()}>
    <div className="o-wrapper">
      <div {...classes('wrapper')}>
        <div {...classes('item')}>
          <CmiLogo {...classes('color-icon')} /><br /><br />
          <Logo {...classes('color-icon')} />
        </div>
        <div {...classes('item')}>
          <a href="mailto:u4@cmi.no">u4@cmi.no</a><br />
          <a href="tel:004747938000">+ 47 479 38 000</a><br />
          Chr. Michelsen Institute,<br />
          Jekteviksbakken 31,<br />
          5006 Bergen, Norway
        </div>
        <div {...classes('item')}>
          Except where otherwise<br />
          noted, this work is licensed<br />
          under CC BY-NC-ND 4.0.<br />
          © Chr. Michelsen Institute 2017 Some rights reserved
        </div>
        <div {...classes('item')}>
        Facebook<br />
        Medium<br />
        Twitter
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
