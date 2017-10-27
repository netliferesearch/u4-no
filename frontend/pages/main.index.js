import React from 'react';
import { Link } from '../routes';
import { LayoutHomepage, SearchField } from '../components';
import { Footer } from '../components';
import { PartnerAgencies } from '../components';
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
        Anti-corruption resources and services that support your work for successful development results. We offer useable knowledge based on quality research.
      </p>
      <p className="c-introduction-text">
        Browse by topic or publications. Are you U4 partner staff? Enjoy exclusive free access to online courses, workshops and helpdesk. You can also contact our researchers and advisors.
      </p>
      </section>
    </div>
    <Footer />

      <PartnerAgencies />

  </LayoutHomepage>
);

