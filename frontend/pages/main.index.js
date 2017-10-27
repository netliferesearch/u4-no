import React from 'react';
import { Link } from '../routes';
import { LayoutHomepage, SearchField } from '../components';
import { Footer } from '../components';
import { PartnerAgencies } from '../components';
import { U4LogoSquare } from '../components/icons';
import { MagnifyingGlass, ArrowRight } from '../components/icons';
;

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
        Anti-corruption resources and services that support your work for successful development results. We offer useable knowledge based on quality research.
      </p>
      <p className="c-introduction-text">
        Browse by <a href="/topics">topic</a> or <a href="/search">search our publications</a>. Are you U4 partner staff? Enjoy exclusive free access to <a href="/online-training">online courses</a>, <a href="/workshops">workshops</a> and helpdesk.
      </p>
      </section>
      <section className="o-wrapper-inner o-wrapper--padded u-margin-bottom-huge">
        <div className="c-introduction-text">
          <h2>
            Looking for someone?<br />
            <a href="/persons">The whole U4 team &nbsp;<ArrowRight /></a>
          </h2>
        </div>
        </section>
    </div>
    <Footer />

      <PartnerAgencies />

  </LayoutHomepage>
);

