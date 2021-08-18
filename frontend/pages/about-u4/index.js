import React, { Component } from 'react';
import DataLoader from '../../helpers/data-loader';
import Layout from '../../components/Layout';
import ServiceArticle from '../../components/ServiceArticle';
import SimpleHero from '../../components/SimpleHero';
import { blocksToText } from '../../helpers/blocksToText';
import Footer from '../../components/general/footer/Footer';

const About = ({ data: { about = {}, url = {} } }) => {
  const {
    title = '',
    longTitle = '',
    featuredImage = {},
    lead = '',
    sections,
    relatedUrl = {},
  } = about;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: blocksToText(lead),
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      {lead && <SimpleHero light title={title} content={lead} />}

      {sections ? <ServiceArticle blocks={sections} /> : null}

      <Footer />
    </Layout>
  );
};
export default DataLoader(About, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "about": *[slug.current == "about-u4"][0]{title, slug, lead, _id, "sections": sections, "featuredImage": featuredImage.asset->url} }',
    param: { slug },
  }),
  materializeDepth: 3,
});
