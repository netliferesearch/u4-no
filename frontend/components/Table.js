import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import serializers from './serializers';

const sizeClass = (size) => {
  if (size === 'narrow') {
    return 'c-table--narrow c-longform-grid__standard ';
  } else if (size === 'small') {
    return 'c-table--small c-longform-grid__standard ';
  } else if (size === 'normal') {
    return 'c-table--normal c-longform-grid__large';
  } else if (size === 'wide') {
    return 'c-table--wide c-longform-grid__larger';
  } else if (size === 'fullwidth') {
    return 'c-table--full c-longform-grid__full';
  }

  return 'c-table--normal c-longform-grid__large';
};

// We trust html content coming from Sanity and output htmlStr raw.
const Table = ({
  title, caption, size, htmlStr,
}) => (
  <div className={`c-table ${sizeClass(size)}`}>
    <p
      id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
      className="c-table__title"
    >
      {title}
    </p>
    <span dangerouslySetInnerHTML={{ __html: htmlStr }} />
    <div className="c-table__caption">
      <BlockContent blocks={caption} serializers={serializers} />
    </div>
  </div>
);

Table.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.array,
  size: PropTypes.string,
  htmlStr: PropTypes.string,
};

Table.defaultProps = {
  title: '',
  caption: [],
  size: '',
  htmlStr: '',
};

export default Table;
