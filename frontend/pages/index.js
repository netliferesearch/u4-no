import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import DataLoader from '../helpers/data-loader';
import Link from 'next/link';

import Layout from '../components/Layout';
import FrontpageSearchField from '../components/FrontpageSearchField';
import BoxOnBoxPartnerFeatures from '../components/BoxOnBoxPartnerFeatures';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import PartnerAgencies from '../components/PartnerAgencies';
import FrontpageFeature from '../components/FrontpageFeature';
import Mosaic from '../components/Mosaic';
import serializers from '../components/serializers';

import U4LogoSquare from '../components/icons/U4LogoSquare';
import ArrowRight from '../components/icons/ArrowRight';

const Frontpage = ({ data: { frontPage = {}, topics = {} } }) => (
  <Layout
    hideLogo
    noSearch
    headComponentConfig={{
      title: 'U4 Anti-Corruption Resource Centre',
      description:
        'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
      url: 'https://www.u4.no',
      image:
        frontPage.ImageUrl ||
        'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
    }}
  >
    <section className="o-wrapper-inner o-wrapper--padded ">
      <div className="o-layout">
        <div className="o-layout__item c-logo--center">
          <Link href="/">
            <a className="u-no-underline" href="/">
              <U4LogoSquare className="c-logo" />
            </a>
          </Link>
        </div>
      </div>
      <div className="c-search__clean-wrapper">
        <FrontpageSearchField />
      </div>
    </section>
    <section className="o-wrapper-medium u-margin-bottom-huge">
      <div className="c-introduction-text">
        <BlockContent blocks={frontPage.sections} serializers={serializers} />
      </div>
    </section>

    <FrontpageFeature topics={topics} />

    <section className="o-wrapper u-margin-bottom-huge">
      <h2 className="c-topic-section__title">
        Browse our handpicked anti-corruption <br /> publications, insights and ideas.
      </h2>

      <Mosaic resources={frontPage.resources} />
      <h2 className="c-topic-section__cta u-padding-bottom-huge">
        <a href="/search?search=*">
          Explore all resources &nbsp;
          <ArrowRight />
        </a>
      </h2>
    </section>

    <section className="o-wrapper u-margin-bottom-huge">
      <BoxOnBoxPartnerFeatures />
      <h2 className="c-topic-section__cta u-padding-bottom">
        <a href="/u4-partner-agencies">
          See all our partners &nbsp;
          <ArrowRight />
        </a>
      </h2>
    </section>

    {false && (
      <section className="o-wrapper-inner o-wrapper--padded u-margin-bottom-huge">
        <div className="c-introduction-text">
          <h2>
            Looking for someone?
            <br />
            <a href="/the-team">
              The whole U4 team &nbsp;
              <ArrowRight />
            </a>
          </h2>
        </div>
      </section>
    )}

    <Newsletter />

    <Footer />

    <PartnerAgencies />
  </Layout>
);

Frontpage.propTypes = {
  data: PropTypes.shape({
    frontPage: PropTypes.object,
    topics: PropTypes.array,
  }).isRequired,
};

export default DataLoader(Frontpage, {
  queryFunc: () => ({
    sanityQuery: `{
      "frontPage": *[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]{id,title,sections,"imageUrl": featuredImage.asset->url,"resources": resources[]->{_id,_type, "publicationType": publicationType->title, "articleType": articleType[0]->title, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}},
      "topics": *[_type == "topics"] | order(title) {_id, title, slug,  "imageUrl": featuredImage.asset->url}
    }`,
  }),
  materializeDepth: 0,
});
