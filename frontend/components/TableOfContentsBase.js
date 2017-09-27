import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import Scrollchor from 'react-scrollchor';
import randomKey from '../helpers/randomKey';

function findTitles(articleContents) {
  return articleContents.reduce((result, elem) => {
    if (/h2|h3/gi.test(elem.style)) {
      result.push({
        style: elem.style,
        title: elem.children[0].text,
      });
    }
    return result;
  }, []);
}

const getClassName = menuItem => `o-list-bare__item menu__item menu__item--${menuItem.style}`;

/**
 * This breaks down article content and creates a list based on titles found
 * in the article.
 * @param {Object} [onItemSelected=(] callback
 */
const TableOfContentsBase = ({ onItemSelected = () => {}, content = [] }) => (
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

export default TableOfContentsBase;
