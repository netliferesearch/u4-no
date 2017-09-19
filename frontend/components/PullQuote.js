import React from 'react';
import PropTypes from 'prop-types';

const PullQuote = ({ children }) => (
  <div className="c-article__pullQuote o-grid-container__item-wider">
    {children}
  </div>
);
/*
PullQuote.propTypes = {
  children: PropTypes.children.isRequired,
};
*/
export default PullQuote;

