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
)(({ showAllItems = false, content = [], onItemSelected = () => {}, readingProgressId }) => {
  const isTitleOrChildrenSelected = ({ id, children = [] }) => {
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
  // add 'selected': true to titles that are selected and scrolledPast true
  // to titles that are scrolled past.
  let hasReachedSelectedTitle = false;
  const titleObjects = buildTitleObjects(content).reduce((acc, titleObject) => {
    const copy = Object.assign({}, titleObject);
    if (isTitleOrChildrenSelected(titleObject)) {
      hasReachedSelectedTitle = true;
      copy.selected = true;
      copy.scrolledPast = true;
    }
    if (readingProgressId && !hasReachedSelectedTitle) {
      copy.scrolledPast = true;
    }
    acc.push(copy);
    return acc;
  }, []);

  const isTitleScrolledPastClass = ({ scrolledPast = false }) =>
    (scrolledPast ? 'c-article-nav-list__item--scrolled-past' : '');
  /**
   * We tailor keys here instead of random() generating them to prevent
   * excessive react updates on scroll.
   */
  return (
    <ul className="c-article-nav-list">
      <li
        key="top"
        className={`c-article-nav-list__item ${readingProgressId
          ? 'c-article-nav-list__item--scrolled-past'
          : ''}`}
      >
        <Scrollchor beforeAnimate={onItemSelected} to={'#js-top'}>
          Top
        </Scrollchor>
      </li>
      {titleObjects.map((titleObject) => {
        const { style, title, id, children = [] } = titleObject;
        return (
          <li
            key={id}
            className={`c-article-nav-list__item ${isTitleScrolledPastClass(titleObject)} ${id ===
            readingProgressId
              ? 'c-article-nav-list__item--selected'
              : ''}`}
          >
            <Scrollchor beforeAnimate={onItemSelected} to={`#${id}`}>
              {title}
            </Scrollchor>
            {(showAllItems || titleObject.selected) && (
              <ul className="c-article-nav-list c-article-nav-list--inner">
                {children.map(({ title, id }) => (
                  <li
                    key={id}
                    className={`c-article-nav-list__item ${id === readingProgressId
                      ? 'c-article-nav-list__item--selected'
                      : ''}`}
                  >
                    <Scrollchor beforeAnimate={onItemSelected} to={`#${id}`}>
                      {title}
                    </Scrollchor>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
      <li key="bottom" className="c-article-nav-list__item">
        <Scrollchor onClick={e => onItemSelected(e)} to={'#js-bottom'}>
          Bottom
        </Scrollchor>
      </li>
    </ul>
  );
});
