import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import randomKey from '../helpers/randomKey';
import Scrollchor from 'react-scrollchor';

function findTitles(articleContents) {
  return articleContents.reduce((result, elem) => {
    if (elem.style === 'h2') {
      result.push({
        style: 'h2',
        title: elem.children[0].text,
      });
    }
    return result;
  }, []);
}

const getClassName = menuItem => `o-list-bare__item menu__item menu__item--${menuItem.style}`;

const ArticleTableOfContents = ({ onItemSelected = () => {}, content = [] }) => (
  <ul className="o-list-bare">
    <li key={randomKey()} className="o-list-bare__item menu__item">
      <Scrollchor onClick={e => onItemSelected(e)} to={'#js-top'}>
        Top
      </Scrollchor>
    </li>
    {findTitles(content).map(menuItem => (
      <li key={randomKey()} className={getClassName(menuItem)}>
        <Scrollchor
          onClick={e => onItemSelected(e)}
          to={`#${slugify(menuItem.title, { lower: true })}`}
        >
          {menuItem.title}
        </Scrollchor>
      </li>
    ))}
    <li key={randomKey()} className="o-list-bare__item menu__item">
      <Scrollchor onClick={e => onItemSelected(e)} to={'#js-bottom'}>
        Bottom
      </Scrollchor>
    </li>
  </ul>
);

export default ArticleTableOfContents;
