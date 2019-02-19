import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import serializers from './serializers';

// We trust html content coming from Sanity and output htmlStr raw.
const Table = ({ title, caption, htmlStr }) => (
  <Fragment>
    <h3
      id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
      className="u-margin-bottom-none"
    >
      {title}
    </h3>
    <div className="c-table" dangerouslySetInnerHTML={{ __html: htmlStr }} />
    <div className="c-table-caption">
      <BlockContent blocks={caption} serializers={serializers} />
    </div>
  </Fragment>
);

Table.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.array,
  htmlStr: PropTypes.string,
};

Table.defaultProps = {
  title: '',
  caption: [],
  htmlStr: '',
};

export default Table;
