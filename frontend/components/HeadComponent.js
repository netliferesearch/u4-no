import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import stylesheet from '../style/main.scss';

const HeadComponent = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content={description} />
    <link rel="stylesheet" href="/static/css/main.css" />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </Head>
);

/**
 * propTypes
 * @property {object} [object] - The content for the service item
 */
HeadComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

HeadComponent.defaultProps = {
  title: '',
  description: '',
};

export default HeadComponent;
