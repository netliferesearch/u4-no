import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import ArticleContents from './ArticleContents';

const TopicArticle = ({ content = [] }) => (
  <article className="o-wrapper">
    <BlockContent
      blocks={content.filter(block => !['reference', 'pullQuote'].includes(block._type))}
    />
  </article>
);

export default TopicArticle;
