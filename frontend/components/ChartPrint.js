import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import serializers from './serializers';

const sizeClass = (size) => {
  if (size === 'narrow') {
    return 'c-chart--narrow c-longform-grid__standard ';
  } else if (size === 'small') {
    return 'c-chart--small c-longform-grid__standard ';
  } else if (size === 'normal') {
    return 'c-chart--normal c-longform-grid__large';
  } else if (size === 'wide') {
    return 'c-chart--wide c-longform-grid__larger';
  } else if (size === 'fullwidth') {
    return 'c-chart--full c-longform-grid__full';
  }

  return 'c-chart--normal c-longform-grid__large';
};

export default function ChartPrint({
  title, caption, size, svgStr,
}) {
  return (
    <div className={`c-chart ${sizeClass(size)}`}>
      <p
        id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="c-chart__title"
      >
        {title}
      </p>
      <div className="c-chart__content" dangerouslySetInnerHTML={{ __html: svgStr }} />
      <div className="c-chart__caption">
        <BlockContent blocks={caption} serializers={serializers} />
      </div>
    </div>
  );
}

ChartPrint.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.array,
  size: PropTypes.string,
  jsonStr: PropTypes.string,
  htmlStr: PropTypes.string,
  svgStr: PropTypes.string,
};

ChartPrint.defaultProps = {
  title: '',
  caption: [],
  size: '',
  htmlStr: '',
  jsonStr: '',
  svgStr: '',
};
