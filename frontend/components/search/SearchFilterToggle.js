import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp } from '../icons/ArrowDown';

export default class SearchFilterToggle extends React.Component {
  constructor() {
    super();
    this.state = {
      isToggleOpen: false,
    };
    this.toggleHandler = this.toggleHandler.bind(this);
  }

  toggleHandler(e) {
    e.preventDefault();
    this.setState({ isToggleOpen: !this.state.isToggleOpen });
  }

  render() {
    const { bucketsToToggle, children } = this.props;
    const { isToggleOpen } = this.state;
    const sliceLimit = 5;
    const slicedBuckets = isToggleOpen ? bucketsToToggle : bucketsToToggle.slice(0, sliceLimit);
    return (
      <div>
        {children({ toggledBuckets: slicedBuckets })}
        {bucketsToToggle.length > sliceLimit && (
          <button
            className="c-filters-v2-btn c-filters-v2-btn--list-item"
            onClick={this.toggleHandler}
          >
            {isToggleOpen ? (
              <div className="c-filters-v2-toggle">
                Show less <ArrowUp />
              </div>
            ) : (
              <div className="c-filters-v2-toggle">
                Show more <ArrowDown />
              </div>
            )}
          </button>
        )}
      </div>
    );
  }
}

SearchFilterToggle.propTypes = {
  bucketsToToggle: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.func,
};

SearchFilterToggle.defaultProps = {
  bucketsToToggle: [],
  children: () => null,
};
