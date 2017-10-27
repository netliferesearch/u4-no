import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import DataLoader from '../helpers/data-loader';
import { Link } from '../routes';
import { LayoutHomepage, SearchField } from '../components';
import { Footer } from '../components';
import { PartnerAgencies } from '../components';
import { U4LogoSquare } from '../components/icons';
import { MagnifyingGlass, ArrowRight } from '../components/icons';
;

const Frontpage = ({ sections = false }) => (
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
        <div className="c-introduction-text">
          <BlockContent blocks={sections} />
        </div>
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

export default DataLoader(Frontpage, {
  queryFunc: () => ({
    sanityQuery: '*[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]',
  }),
  materializeDepth: 2,
});
