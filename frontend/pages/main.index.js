import React from 'react';
import { Link } from '../routes';
import { LayoutHomepage, SearchField } from '../components';
import { U4LogoSquare } from '../components/icons';
import { MagnifyingGlass } from '../components/icons';

export default () => (
  <LayoutHomepage>
    <div className="o-wrapper">
      <section className="o-wrapper-inner o-wrapper--padded ">
        <div className="o-layout o-layout--center u-margin-bottom-huge">
        <Link route="/">
          <a className="u-no-underline" href="/"><U4LogoSquare /></a>
        </Link>
        </div>
        <SearchField />
      </section>
      <section className="o-wrapper-inner o-wrapper--padded u-margin-bottom-huge">
        <p className="c-introduction-text">
          U4 provides anti-corruption resources based on high-quality research to support your efforts to reduce the harmful impact of corruption on sustainable development.
      </p>
      <p className="c-introduction-text">
          Explore our resources by <Link route="/topics"><a>topics</a></Link>. Find contact information to those <Link route="#"><a>who works at U4</a></Link>. Are you <Link route="#"><a>U4 partner</a></Link> staff? Take advantage of our
          exclusive <Link route="/services/online-training"><a>online courses</a></Link>, <Link route="/services/workshops"><a>workshops</a></Link> or <Link route="#"><a>helpdesk</a></Link>.</p>
      </section>
    </div>
  </LayoutHomepage>
);
