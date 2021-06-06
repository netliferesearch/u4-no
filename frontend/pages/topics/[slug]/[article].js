import React from 'react';
import find from 'lodash/find';
import { useRouter } from 'next/router'

import LongformArticleContainer from '../../../components/LongformArticleContainer';
import BreadCrumb from '../../../components/BreadCrumb';
import DataLoader from '../../../helpers/data-loader';

const firstTitleInContent = (content = []) => {
  const firstTitle = find(content, ({ style = '' }) => style === 'h1' || style === 'h2');
  return firstTitle ? firstTitle.children[0].text : '';
};

const firstParagraphInContent = (content = []) => {
  const firstParagraph = find(content, ({ style = '' }) => style === 'normal');
  return firstParagraph ? firstParagraph.children[0].text : '';
};

const TopicArticleEntry = props => {
  const { url = {}, title } = props.data;
  const { query = {} } = url;
  const topicPartMap = {
    basics: 'introduction',
    agenda: 'agenda',
  };
  const router = useRouter();
  const content = props.data[topicPartMap[router.asPath.split('/')[router.asPath.split('/').length - 1]]];
  return (
    <LongformArticleContainer
      BreadCrumbComponent={
        <BreadCrumb data={{ _type: 'topics', slug: { current: props.data.slug.current }, title }} />
      }
      data={{ content }}
      headComponentConfigOverride={{
        title: firstTitleInContent(content),
        description: firstParagraphInContent(content),
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    />
  );
};

export default DataLoader(TopicArticleEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug && _type == "topics"][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
