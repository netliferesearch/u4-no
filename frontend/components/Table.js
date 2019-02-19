import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import serializers from './serializers';

// We trust html content coming from Sanity and output htmlStr raw.
const Table = ({ title, caption, htmlStr }) => (
  <div className="c-table">
    <h3
      id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
      className="c-table__title"
    >
      {title}
    </h3>
    <span dangerouslySetInnerHTML={{ __html: htmlStr }} />
    <div className="c-table__caption">
      <BlockContent blocks={caption} serializers={serializers} />
    </div>
  </div>
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
