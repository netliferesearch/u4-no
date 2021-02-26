import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Logo } from './';
import { Link } from '../routes';
import { CmiLogo } from './icons/';
import { FacebookIcon, TwitterIcon, LinkedInIcon } from './v2/icons/SocialIcons';

import { Newsletter } from './v2/Newsletter';

const classes = BEMHelper({
  name: 'footer',
  prefix: 'c-',
});

const Footer = () => (
  <footer className="c-footer o-wrapper-medium">
    <div className="c-footer__row u-flex-sb">
      <a href="https://www.cmi.no/" {...classes('link')}>
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
    <div className="c-footer__row u-flex-sb">
      <div className="c-footer__col1">
        <div className="u-text--15 u-text--grey">
          <h4 className="u-heading--5">Address</h4>
          <p className="u-margin--no">U4 - Chr. Michelsen Institute</p>
          <p className="u-margin--no">P.O. Box 6033</p>
          <p className="u-margin--no">N-5892 Bergen, Norway</p>
          <p className="u-margin--no">Visiting address: Jekteviksbakken 31, Bergen</p>
        </div>
      </div>

      <div className="c-footer__col2">
        <div className="c-footer__row u-flex-sb">
          <div className="c-footer__col c-footer__links--no-h">
            <Link route="/topics">
              <a className="c-btn c-btn--qua">
                <span>Research topics</span>
              </a>
            </Link>

            <Link route="/blog">
              <a className="c-btn c-btn--qua">
                <span>Blog</span>
              </a>
            </Link>

            <Link route="/courses">
              <a className="c-btn c-btn--qua">
                <span>Online course</span>
              </a>
            </Link>
          </div>
          <div className="c-footer__col c-footer__links">
            <h4 className="u-heading--5">About U4</h4>
            <Link route="/the-team">
              <a className="c-btn c-btn--qua">
                <span>Team</span>
              </a>
            </Link>

            <Link route="/about-u4">
              <a className="c-btn c-btn--qua">
                <span>Vision & Strategy</span>
              </a>
            </Link>

            <Link route="/privacy-policy">
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
    </div>
    <div />
  </footer>
);

export default Footer;

// import React from 'react';
// import BEMHelper from 'react-bem-helper';
// import { Logo } from './';
// import { Link } from '../routes';
// import { CmiLogo, MediumLogo, TwitterLogo, FacebookLogo, LinkedIn } from './icons/';

// const classes = BEMHelper({
//   name: 'footer',
//   prefix: 'c-',
// });

// const Footer = () => (
//   <footer {...classes(null, null, 'o-wrapper-full-width')}>
//     <div>
//       <div {...classes('wrapper', null, 'o-wrapper')}>
//         <div {...classes('item')}>
//           <a href="https://www.cmi.no/" {...classes('link')}>
//             <CmiLogo {...classes('color-icon')} />
//           </a>
//           <a href="https://www.u4.no" {...classes('link')}>
//             <Logo {...classes('color-icon')} />
//           </a>
//         </div>
//         <div {...classes('item')}>
//           <div {...classes('heading')}>Contact</div>
//           <a href="mailto:u4@cmi.no">u4@cmi.no</a>
//           <br />
//           <a href="tel:004747938000">+ 47 479 38 000</a>
//           <br />
//         </div>
//         <div {...classes('item')}>
//           <div {...classes('heading')}>Address</div>
//           U4 - Chr. Michelsen Institute
//           <br />
//           P.O. Box 6033
//           <br />
//           N-5892 Bergen, Norway
//           <br />
//           Visiting address: Jekteviksbakken 31, Bergen
//         </div>
//         <div {...classes('item')}>
//           <a
//             href="https://cmi.us16.list-manage.com/subscribe?u=e5ddae636e7550347b5fc48d3&id=387c25c3a9"
//             title="Sign up for our newsletter"
//           >
//             Newsletter
//           </a>
//           <br />
//           <Link to="/privacy-policy">
//             <a>Privacy policy</a>
//           </Link>
//           <br />
//           <Link to="/about-u4#open-access-policy">
//             <a>Open access policy</a>
//           </Link>
//           <br />
//           <Link to="/about-u4">
//             <a>About U4</a>
//           </Link>
//           <br />
//         </div>
//         <div {...classes('item')}>
//           <div {...classes('heading')}>Follow us</div>
//           <a href="https://www.linkedin.com/showcase/u4-anti-corruption-resource-centre/">
//             <LinkedIn {...classes('some-icon')} />
//             LinkedIn
//           </a>
//           <br />
//           <a href="https://medium.com/u4-anti-corruption-resource-centre">
//             <MediumLogo {...classes('some-icon')} />
//             Medium
//           </a>
//           <br />
//           <a href="https://twitter.com/U4_ACRC">
//             <TwitterLogo {...classes('some-icon')} />
//             Twitter
//           </a>
//           <br />
//           <a href="https://www.facebook.com/U4anticorruption/">
//             <FacebookLogo {...classes('some-icon')} />
//             Facebook
//           </a>
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;
