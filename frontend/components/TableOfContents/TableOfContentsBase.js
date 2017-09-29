import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import Scrollchor from 'react-scrollchor';
import flatten from 'lodash/flatten';
import concat from 'lodash/concat';
import { connect } from 'react-redux';
import CustomScrollSpy from './CustomScrollSpy';

/**
 * This breaks down article content and creates a list based on titles found
 * in the article.
 * @param {Object} [onItemSelected=(] callback
 */
export default connect(state => state)(({ content = [], onItemSelected, readingProgressId }) => {
  const buildTitleObject = (elem) => {
    const title = elem.children[0].text;
    return {
      style: elem.style,
      title,
      id: slugify(title, { lower: true }),
    };
  };

  const titleObjects = content.reduce((result, elem) => {
    const lastResultItem = result[result.length - 1];
    if (elem.style === 'h2') {
      result.push(buildTitleObject(elem));
    } else if (elem.style === 'h3' && lastResultItem.children) {
      lastResultItem.children.push(buildTitleObject(elem));
    } else if (elem.style === 'h3') {
      lastResultItem.children = [buildTitleObject(elem)];
    }
    return result;
  }, []);

  const isTopTitleOrChildrenSelected = ({ id, children = [] }) => {
    if (id === readingProgressId) {
      return true;
    }
    return children.reduce((acc, child) => {
      if (child.id === readingProgressId) {
        return true;
      }
      return acc;
    }, false);
  };

  /**
   * We tailor keys here instead of random() generating them to prevent
   * excessive react updates on scroll.
   */
  return (
    <ul>
      <li key="0" className="o-list-bare__item menu__item" onClick={e => onItemSelected(e)}>
        <Scrollchor to={'#js-top'}>Top</Scrollchor>
      </li>
      {titleObjects.map(({ style, title, id, children }, listIndex) => (
        <li
          key={listIndex + 1}
          className={`o-list-bare__item menu__item menu__item--${style}`}
          onClick={e => onItemSelected(e)}
        >
          <Scrollchor onClick={e => onItemSelected(e)} to={`#${id}`}>
            {title}
          </Scrollchor>

          {children && (
            <ul className="o-list-bare c-article-nav__sub-list">
              {children.map(({ style, title, id }, innerListIndex) => (
                <li
                  key={listIndex + 1 + innerListIndex}
                  className={'o-list-bare__item c-article-nav__sub-list__item'}
                  onClick={e => onItemSelected(e)}
                >
                  <Scrollchor to={`#${id}`}>{title}</Scrollchor>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      <li key={titleObjects.length + 1} className="o-list-bare__item menu__item">
        <Scrollchor onClick={e => onItemSelected(e)} to={'#js-bottom'}>
          Bottom
        </Scrollchor>
      </li>
    </ul>
  );
});
