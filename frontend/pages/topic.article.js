import React from 'react';

import { Layout, LongformArticle } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const TopicArticleEntry = (props) => {
  const { url = {} } = props;
  const { query = {} } = url;
  const { topicPart = 'nopart' } = query;
  const topicPartMap = {
    basics: 'introduction',
    agenda: 'agenda',
  };
  const content = props[topicPartMap[topicPart]];
  return (
    <Layout>
      <div className="o-wrapper o-wrapper--padded">
        <BreadCrumb url={url} />
      </div>
      <LongformArticle content={content} />
    </Layout>
  );
};

export default DataLoader(TopicArticleEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
