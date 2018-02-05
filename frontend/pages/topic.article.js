import React from 'react';
import find from 'lodash/find';

import { LongformArticleContainer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const firstTitleInContent = (content = []) => {
  const firstTitle = find(content, ({ style = '' }) => style === 'h1' || style === 'h2');
  return firstTitle ? firstTitle.children[0].text : '';
};

const firstParagraphInContent = (content = []) => {
  const firstParagraph = find(content, ({ style = '' }) => style === 'normal');
  return firstParagraph ? firstParagraph.children[0].text : '';
};

const TopicArticleEntry = (props) => {
  const { url = {}, title } = props.data;
  const { query = {} } = props.url;
  const { topicPart = 'nopart', slug = '' } = query;
  const topicPartMap = {
    basics: 'introduction',
    agenda: 'agenda',
  };
  const content = props.data[topicPartMap[topicPart]];

  return (
    <LongformArticleContainer
      BreadCrumbComponent={
        <BreadCrumb data={{ _type: 'topics', slug: { current: slug }, title }} />
      }
      data={{content}}
      headComponentConfigOverride={{
        title: firstTitleInContent(content.filter(({ style = {} }) => style.children)),
        description: firstParagraphInContent(content),
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
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
