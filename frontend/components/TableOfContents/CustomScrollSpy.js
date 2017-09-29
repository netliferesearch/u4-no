import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateReadingProgress } from '../../helpers/redux-store';
import buildTitleObjects from './buildTitleObjects';

/**
 * Its purpose is to track a number of html titles and see whether or not we have
 * read past those titles.
 *
 * Its only responsibility is to report to redux on scroll updates.
 *
 * Takes article content as input.
 *
 */
class CustomScrollSpy extends Component {
  constructor(props) {
    super(props);
    const { content = [] } = props;
    const watchables = buildTitleObjects(content).reduce((acc, titleObject) => {
      // it's important that we add the title before the children to preserve
      // the chronology
      acc.push(titleObject);
      const { children = [] } = titleObject;
      if (children.length > 0) {
        acc = acc.concat(children);
      }
      return acc;
    }, []);

    this.state = {
      scrollHandler: throttle(() => {
        // loop through all ids to watch and compare the position of the
        // various elements. Elements that are not found will still be
        // present in the list as null
        //
        // going from top to bottom we try to find last id the user has scrolled by
        const { selectedId = false } = watchables.reduce((acc, { id }) => {
          const element = document.getElementById(id);
          if (!element) {
            return acc;
          }
          if (window.scrollY > element.offsetTop - element.offsetHeight) {
            acc.selectedId = id;
          }
          return acc;
        }, {});
        if (this.props.readingProgressId !== selectedId) {
          this.props.updateReadingProgress(selectedId);
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
    return <div />;
  }
}

const mapStateToProps = ({ readingProgressId }) => ({ readingProgressId });

const mapDispatchToProps = dispatch => ({
  updateReadingProgress: bindActionCreators(updateReadingProgress, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomScrollSpy);
