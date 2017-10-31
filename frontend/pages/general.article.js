import React from 'react';

import { LongformArticleContainer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const GeneralArticle = (props) => {
  const { url, explainerText } = props;
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
  materializeDepth: 1,
});
