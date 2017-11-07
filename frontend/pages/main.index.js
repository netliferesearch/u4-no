import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import DataLoader from '../helpers/data-loader';
import { Link } from '../routes';
import { LayoutHomepage, SearchField, BoxOnBoxPartnerFeatures } from '../components';
import { Footer } from '../components';
import { PartnerAgencies, FrontpageFeature, Mosaic } from '../components';
import { U4LogoSquare } from '../components/icons';
import { MagnifyingGlass, ArrowRight } from '../components/icons';


const Frontpage = ({ frontPage = {}, topics = {} }) => (
  <LayoutHomepage noSearch>
    <div>
      <section className="o-wrapper-inner o-wrapper--padded ">
        <div className="o-layout">
          <div className="o-layout__item c-logo--center">
            <Link route="/">
              <a className="u-no-underline" href="/"><U4LogoSquare className="c-logo" /></a>
            </Link>
          </div>
        </div>
        <div className="c-search__clean-wrapper">
          <SearchField />
        </div>
      </section>
      <section className="o-wrapper-inner o-wrapper--padded u-margin-bottom-huge">
        <div className="c-introduction-text">
          <BlockContent blocks={frontPage.sections} />
        </div>
      </section>

      <FrontpageFeature topics={topics} />

      <section className="o-wrapper--padded o-wrapper-medium u-margin-bottom-huge">
        <div className="c-topic-section__title">
          <h2> Browse our handpicked anti-corruption publications, insights and ideas.</h2>
        </div>
        <Mosaic resources={frontPage.resources} />
        <h2 className="c-topic-section__cta u-padding-bottom-huge">
          <a href="/search">Explore all our resources &nbsp;<ArrowRight /></a>
        </h2>
      </section>

      <section >
        <BoxOnBoxPartnerFeatures />
        <h2 className="c-topic-section__cta u-padding-bottom-huge">
          <a href="/search">See all our partners &nbsp;<ArrowRight /></a>
        </h2>
      </section>

      <section className="o-wrapper-inner o-wrapper--padded u-margin-bottom-huge">
        <div className="c-introduction-text">
          <h2>
            Looking for someone?<br />
            <a href="/the-team">The whole U4 team &nbsp;<ArrowRight /></a>
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
    sanityQuery: `{
      "frontPage": *[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]{id,title,sections,"resources": resources[]->{_id,_type, "publicationType": publicationType->title, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}},
      "topics": *[_type == "topics"][0..5]{_id, title, slug}
    }`,
  }),
  materializeDepth: 4,
});
