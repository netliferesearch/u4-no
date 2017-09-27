import React from 'react';

import { Layout, LongformArticle } from '../components';
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
      <LongformArticle content={content} />
    </Layout>
  );
};

export default DataLoader(TopicArticleEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '*[_id == $id][0]',
    param: { id },
  }),
  materializeDepth: 1,
});
