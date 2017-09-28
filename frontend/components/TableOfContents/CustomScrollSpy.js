import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

/**
 * Its purpose is to track a number of html titles and see whether or not we have
 * read past those titles. Will add 'is-selected' (h2 or h3) to the currently selected child
 * and 'is-selected-parent' to the parent element (the last h2 the reader passed).
 *
 * Takes an array of 'watchables' where the array order needs to correspond with
 * the <li> children of this component.
 *
 * see proptype definition below.
 * @type {Array}
 */
class CustomScrollSpy extends Component {
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

CustomScrollSpy.propTypes = {
  watchables: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.string, // can be h2, h3 and the like
      title: PropTypes.string, // the title's text
      // id of html element to track to determine if we are currently reading that title
      id: PropTypes.string,
    }),
  ).isRequired,
  children: PropTypes.arrayOf(<li />).isRequired,
};

export default CustomScrollSpy;
