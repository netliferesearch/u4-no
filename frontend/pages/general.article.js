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

const GeneralArticleX = props => {
  console.log(props)
  return <div></div>
}
const GeneralArticle = ({ data, url = {} }) => {
  if (data._type === 'frontpage') {
    const {
      title = '',
      longTitle = '',
      featuredImage = {},
      lead = '',
      sections,
      relatedUrl = {},
    } = data;
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
      lead={data.explainerText}
      {...data}
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
