import React from 'react';

import {
  LongformArticleContainer,
  Footer,
  Layout,
  Newsletter,
  ServiceArticle,
  SimpleHero,
} from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const GeneralArticle = (props) => {
  const { url = '', explainerText = '', _type = '' } = props;
  if (_type === 'frontpage') {
    const {
      title = '',
      longTitle = '',
      featuredImage = {},
      lead = '',
      sections,
      relatedUrl = {},
    } = props;
    return (
      <Layout
        headComponentConfig={{
          title,
          description: lead,
          image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
          url: url.asPath ? `https://beta.u4.no${url.asPath}` : '',
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
  return (
    <LongformArticleContainer
      BreadCrumbComponent={<BreadCrumb url={url} />}
      lead={explainerText}
      {...props}
    />
  );
};

export default DataLoader(GeneralArticle, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
  materializeDepth: 2,
});
