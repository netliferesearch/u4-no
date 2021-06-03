import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../helpers/data-loader';

import { Footer, Layout, Newsletter, ServiceArticle, SimpleHero } from '../../components';

const ServicePage = ({
  data: {
    title = '',
    longTitle = '',
    featuredImage = {},
    lead = '',
    sections = [],
    relatedUrl = {},
    url = '',
  },
}) => (
  <Layout
    headComponentConfig={{
      title,
      description: lead,
      image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
      url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
    }}
  >
    <SimpleHero content={longTitle} cta="" helpdesk="true" />

    <ServiceArticle blocks={sections} />
    <Newsletter />
    <Footer />
  </Layout>
);

export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `*[_type == "frontpage" && slug.current == "helpdesk"][0]{
        title,
            longTitle,
            slug,
            lead,
            _id,
      sections[]{
        ...,
        expertAnswersRef[]->{
          _id,
          _type,
          slug,
          title,
          "publicationType": publicationType->title,
          "featuredImage": featuredImage.asset->url
        }
      },
      "featuredImage": featuredImage.asset->url
    }
`,
    param: { slug },
  }),
  materializeDepth: 5,
});
