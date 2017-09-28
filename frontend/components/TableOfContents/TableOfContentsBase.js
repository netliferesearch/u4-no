import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import Scrollchor from 'react-scrollchor';
import flatten from 'lodash/flatten';
import concat from 'lodash/concat';
import CustomScrollSpy from './CustomScrollSpy';

/**
 * This breaks down article content and creates a list based on titles found
 * in the article.
 * @param {Object} [onItemSelected=(] callback
 */
function TableOfContentsBase(props) {
  const { content = [], onItemSelected } = props;

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
  console.log('titleObjects', titleObjects);
  const listOfTitleIds = flatten(titleObjects);

  /**
   * We tailor keys here instead of random() generating them to prevent
   * excessive react updates on scroll.
   */
  return (
    <CustomScrollSpy watchables={concat([''], listOfTitleIds, [''])}>
      <li key="0" className="o-list-bare__item menu__item">
        <Scrollchor onClick={e => onItemSelected(e)} to={'#js-top'}>
          Top
        </Scrollchor>
      </li>
      {titleObjects.map(({ style, title, id, children }, listIndex) => (
        <li key={listIndex + 1} className={`o-list-bare__item menu__item menu__item--${style}`}>
          <Scrollchor onClick={e => onItemSelected(e)} to={`#${id}`}>
            {title}
          </Scrollchor>

          {children && (
            <ul className="o-list-bare c-article-nav__sub-list">
              {children.map(({ style, title, id }, innerListIndex) => (
                <li
                  key={listIndex + 1 + innerListIndex}
                  className={'o-list-bare__item c-article-nav__sub-list__item'}
                >
                  <Scrollchor onClick={e => onItemSelected(e)} to={`#${id}`}>
                    {title}
                  </Scrollchor>
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
    </CustomScrollSpy>
  );
}

export default TableOfContentsBase;
