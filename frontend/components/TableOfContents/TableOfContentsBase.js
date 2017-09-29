import React from 'react';
import PropTypes from 'prop-types';
import Scrollchor from 'react-scrollchor';
import { connect } from 'react-redux';
import buildTitleObjects from './buildTitleObjects';

/**
 * This breaks down article content and creates a list based on titles found
 * in the article.
 * @param {Object} [onItemSelected=(] callback
 */
export default connect(
  state => state,
)(({ content = [], onItemSelected = () => {}, readingProgressId }) => {
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
  const titleObjects = buildTitleObjects(content);
  /**
   * We tailor keys here instead of random() generating them to prevent
   * excessive react updates on scroll.
   */
  return (
    <ul className="c-article-nav">
      <li key="0" className="o-list-bare__item menu__item" onClick={e => onItemSelected(e)}>
        <Scrollchor to={'#js-top'}>Top</Scrollchor>
      </li>
      {titleObjects.map((titleObject, listIndex) => {
        const { style, title, id, children = [] } = titleObject;
        return (
          <li
            key={listIndex + 1}
            className={`o-list-bare__item menu__item menu__item--${style}`}
            onClick={e => onItemSelected(e)}
          >
            <Scrollchor to={`#${id}`}>{title}</Scrollchor>
            {isTopTitleOrChildrenSelected(titleObject) && (
              <ul className="o-list-bare">
                {children.map(({ title, id }, innerListIndex) => (
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
        );
      })}
      <li key={titleObjects.length + 1} className="o-list-bare__item menu__item">
        <Scrollchor onClick={e => onItemSelected(e)} to={'#js-bottom'}>
          Bottom
        </Scrollchor>
      </li>
    </ul>
  );
});
