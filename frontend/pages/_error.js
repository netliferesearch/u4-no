/*
  custom error handling
  source: https://github.com/zeit/next.js#custom-error-handling
  if redirect found then redirect else error
*/

import React from 'react';
import Error404 from '../components/Error404';

export default class ErrorHandler extends React.Component {

  render() {
    return <Error404 {...this.props} />;
  }
}
