import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import serializers from './serializers';

export default function ChartPrint({ title, caption, svgStr }) {
  return (
    <Fragment>
      <h3
        id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="c-chart__title"
      >
        {title}
      </h3>
      <div className="c-chart__content" dangerouslySetInnerHTML={{ __html: svgStr }} />
      <div className="c-chart__caption">
        <BlockContent blocks={caption} serializers={serializers} />
      </div>
    </Fragment>
  );
}

ChartPrint.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.array,
  jsonStr: PropTypes.string,
  htmlStr: PropTypes.string,
  svgStr: PropTypes.string,
};

ChartPrint.defaultProps = {
  title: '',
  caption: [],
  htmlStr: '',
  jsonStr: '',
  svgStr: '',
};
