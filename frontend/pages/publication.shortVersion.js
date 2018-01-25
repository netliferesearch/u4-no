import React from 'react';

import { Layout, LongformArticleContainer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const TopicArticleEntry = ({ data: { title = '', summary = [] }, url = {} }) => {
  const { query = {} } = url;
  const { slug = '' } = query;
  return (
    <LongformArticleContainer
      BreadCrumbComponent={
        <BreadCrumb data={{ _type: 'publication', slug: { current: slug }, title }} />
      }
      content={summary}
    />
  );
};

export default DataLoader(TopicArticleEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
