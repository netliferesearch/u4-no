import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import Scrollchor from 'react-scrollchor';
import CustomScrollSpy from './CustomScrollSpy';

/**
 * This breaks down article content and creates a list based on titles found
 * in the article.
 * @param {Object} [onItemSelected=(] callback
 */
function TableOfContentsBase(props) {
  const { content = [] } = props;
  const titleObjects = content.reduce((result, elem) => {
    if (/h2|h3/gi.test(elem.style)) {
      result.push({
        style: elem.style,
        title: elem.children[0].text,
      });
    }
    return result;
  }, []);
  const listOfTitleIds = titleObjects.map(({ title, style }) => ({
    title,
    style,
    id: slugify(title, { lower: true }),
  }));
  /**
   * We tailor keys here instead of random() generating them to prevent
   * excessive react updates on scroll.
   */
  return (
    <CustomScrollSpy watchables={['', ...listOfTitleIds, '']}>
      <li key="0" className="o-list-bare__item menu__item">
        <Scrollchor onClick={e => onItemSelected(e)} to={'#js-top'}>
          Top
        </Scrollchor>
      </li>
      {titleObjects.map(({ style, title }, listIndex) => (
        <li key={listIndex + 1} className={`o-list-bare__item menu__item menu__item--${style}`}>
          <Scrollchor onClick={e => onItemSelected(e)} to={`#${slugify(title, { lower: true })}`}>
            {title}
          </Scrollchor>
        </li>
      ))}
      <li key={titleObjects.length + 1} className="o-list-bare__item menu__item">
        <Scrollchor onClick={e => onItemSelected(e)} to={'#js-bottom'}>
          Bottom
        </Scrollchor>
      </li>
    </CustomScrollSpy>
  );
}
export default TableOfContentsBase;
