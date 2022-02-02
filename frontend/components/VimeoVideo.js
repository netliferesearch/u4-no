import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers/serializers';

const classes = BEMHelper({
  name: 'article',
  prefix: 'c-',
});

const renderCaption = caption => {
  if (Array.isArray(caption)) {
    return <BlockContent blocks={caption} serializers={{ container: 'span', ...serializers }} />;
  }
  return caption;
};

const renderCredit = ({ credit = '', sourceUrl = '', license = '' }) => (
  <p className="c-longform-grid__standard credit">
    {sourceUrl && credit ? (
      <span>
        Credit: <a href={sourceUrl}>{credit}</a> {license}
      </span>
    ) : (
      ''
    )}
    {!sourceUrl && credit ? (
      <span>
        Credit: {credit} {license}
      </span>
    ) : (
      ''
    )}
  </p>
);

renderCredit.propTypes = {
  credit: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  license: PropTypes.string.isRequired,
};

const figureOutFigureClass = size => {
  if (size === 'narrow') {
    return 'c-figure--narrow c-longform-grid__standard ';
  } else if (size === 'small') {
    return 'c-figure--small c-longform-grid__standard ';
  } else if (size === 'normal') {
    return 'c-figure--normal c-longform-grid__large';
  } else if (size === 'wide') {
    return 'c-figure--wide c-longform-grid__larger';
  } else if (size === 'fullwidth') {
    return 'c-figure--wide c-longform-grid__full';
  }

  return 'c-figure--wide c-longform-grid__large';
};

const VimeoVideo = ({ src = '', title, caption = [], credit = '', sourceUrl, license, size }) => (
  <div {...classes('figure', null, figureOutFigureClass(size))}>
    {title && <p className="c-figure__title">{title}</p>}
    {src ? (
      <div className={`u-video ${size || ''}`}>
        <ReactPlayer
          controls
          width="100%"
          height="0"
          config={{
            preload: true,
          }}
          url={src}
        />
      </div>
    ) : (
      <div>(video unavailable)</div>
    )}

    {(caption.length > 0 || credit || sourceUrl || license) && (
      <div className="c-figure__caption">
        {renderCaption(caption)}
        {renderCredit({ credit, sourceUrl, license })}
      </div>
    )}
  </div>
);

VimeoVideo.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  caption: PropTypes.array,
  license: PropTypes.string,
  size: PropTypes.string,
  credit: PropTypes.string,
  sourceUrl: PropTypes.string,
};

VimeoVideo.defaultProps = {
  title: '',
  caption: [],
  license: '',
  size: '',
  credit: '',
  sourceUrl: '',
};

export default VimeoVideo;
