import React from 'react';

import { Layout, LongformArticleContainer, LongformArticle } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const TopicArticleEntry = (props) => {
  const { data: { title = '', summary = [] }, url = {} } = props;
  const { query = {} } = url;
  const { slug = '' } = query;
  return (
     <LongformArticleContainer
        BreadCrumbComponent={
          <BreadCrumb data={{ _type: 'publication', slug: { current: slug }, title }} />
        }
        content={summary}
        shortversion
        {...props}
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
