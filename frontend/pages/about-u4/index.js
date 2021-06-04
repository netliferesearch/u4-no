import React, { Component } from 'react';
import DataLoader from '../../helpers/data-loader';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Newsletter from '../../components/Newsletter';
import ServiceArticle from '../../components/ServiceArticle';
import SimpleHero from '../../components/SimpleHero';

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
        description: lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      {lead && <SimpleHero light title={title} content={lead} />}
    
      {sections ? <ServiceArticle blocks={sections} /> : null}
    
      <Newsletter />
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
