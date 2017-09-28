import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import slugify from 'slugify';
import Scrollchor from 'react-scrollchor';
import randomKey from '../helpers/randomKey';

class CustomScrollspy extends Component {
  constructor(props) {
    super(props);
    const { idsToWatch = [] } = props;
    this.state = {
      idsToWatch,
      selectedMenuIndex: 0,
      scrollHandler: throttle(() => {
        // loop through all ids to watch and compare the position of the
        // various elements. Elements that are not found will still be
        // present in the list as null
        const elements = Array.from(
          idsToWatch.map(({ title, style, id }) => ({
            title,
            style,
            id,
            element: document.getElementById(id),
          })),
        );
        // going from top to bottom we try to find last id the user has scrolled by
        const selectedMenuIndex = elements.reduce((acc, elementToCheck, currentIndex) => {
          if (!elementToCheck) {
            return acc;
          }
          if (window.scrollY > elementToCheck.offsetTop - elementToCheck.offsetHeight) {
            return currentIndex;
          }
          return acc;
        }, 0);
        if (this.state.selectedMenuIndex !== selectedMenuIndex) {
          this.setState(() => ({
            selectedMenuIndex,
          }));
        }
      }, 1000),
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.state.scrollHandler);
    this.state.scrollHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.scrollHandler);
  }

  render() {
    const children = React.Children.toArray(this.props.children);
    return (
      <ul className="o-list-bare">
        {children.map((child, index) => {
          if (index === this.state.selectedMenuIndex) {
            return React.cloneElement(child, { className: `${child.props.className} is-selected` });
          }
          return child;
        })}
      </ul>
    );
  }
}

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
    <CustomScrollspy idsToWatch={['', ...listOfTitleIds, '']}>
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
    </CustomScrollspy>
  );
}
export default TableOfContentsBase;
