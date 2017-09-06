import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';

function findTitles(articleContents) {
  return articleContents.reduce((result, elem) => {
      if (elem.style === 'h2') {
        result.push({
          style: 'h2',
          title: elem.spans[0].text
        })
      }
      return result
  }, [])
}

const getClassName = (menuItem) => `menu__item menu__item--${menuItem.style}`

const ArticleContents = ({
  content = []
}) => (
  <ul>{findTitles(content).map(menuItem => <li className={getClassName(menuItem)}>{menuItem.title}</li>)}</ul>
);

export default ArticleContents;
