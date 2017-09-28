import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import slugify from 'slugify';
import Scrollchor from 'react-scrollchor';

class CustomScrollspy extends Component {
  constructor(props) {
    super(props);
    const { watchables = [] } = props;
    this.state = {
      watchables,
      menuSelection: {
        parentId: false,
        selectedId: false,
      },
      scrollHandler: throttle(() => {
        // loop through all ids to watch and compare the position of the
        // various elements. Elements that are not found will still be
        // present in the list as null
        //
        // going from top to bottom we try to find last id the user has scrolled by
        //
        const menuSelection = watchables.reduce((acc, { style, title, id }, currentIndex) => {
          const element = document.getElementById(id);
          if (!element) {
            return acc;
          }
          if (window.scrollY > element.offsetTop - element.offsetHeight) {
            if (style === 'h2') {
              // store this info to enable us to know about the parentId if
              // a sub id is selected
              acc.parentId = id;
            }
            acc.selectedId = id;
          }
          return acc;
        }, {});
        if (this.state.menuSelection.selectedId !== menuSelection.selectedId) {
          this.setState(() => ({
            menuSelection,
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
    const indexOfSelectedParentId = this.props.watchables.reduce((acc, { id }, index) => {
      if (id === this.state.menuSelection.parentId) {
        return index;
      }
      return acc;
    }, 0);
    const indexOfSelectedId = this.props.watchables.reduce((acc, { id }, index) => {
      if (id === this.state.menuSelection.selectedId) {
        return index;
      }
      return acc;
    }, 0);
    const children = React.Children.toArray(this.props.children);
    return (
      <ul className="o-list-bare">
        {children.map((child, index) => {
          let updatedChild = React.cloneElement(child);
          if (index === indexOfSelectedParentId) {
            updatedChild = React.cloneElement(updatedChild, {
              className: `${updatedChild.props.className} is-selected-parent`,
            });
          }
          if (index === indexOfSelectedId) {
            updatedChild = React.cloneElement(updatedChild, {
              className: `${updatedChild.props.className} is-selected`,
            });
          }
          return updatedChild;
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
    <CustomScrollspy watchables={['', ...listOfTitleIds, '']}>
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
