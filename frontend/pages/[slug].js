import React from 'react';
import DataLoader from '../helpers/data-loader';

import LongformArticleContainer from '../components/LongformArticleContainer';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Newsletter from '../components/Newsletter';
import ServiceArticle from '../components/ServiceArticle';
import SimpleHero from '../components/SimpleHero';
import { wrapInRedux } from '../helpers/redux-store-wrapper';

const GeneralArticle = props => {
  if (props.data._type === 'frontpage') {
    const {
      title = '',
      longTitle = '',
      featuredImage = {},
      lead = '',
      sections,
      relatedUrl = {},
      explainerText = '',
    } = props.data;
    const { url = {} } = props;
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
  }
  return <LongformArticleContainer lead={props.data.standfirst} {...props} />;
};

export default wrapInRedux(
  DataLoader(GeneralArticle, {
    queryFunc: ({ query: { slug = '' } }) => ({
      sanityQuery: '*[slug.current == $slug][0]',
      param: { slug },
    }),
    materializeDepth: 2,
  })
);
