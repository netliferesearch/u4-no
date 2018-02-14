import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';

const classes = BEMHelper({
  name: 'article',
  prefix: 'c-',
});

const renderCaption = (caption) => {
  if (Array.isArray(caption)) {
    return <BlockContent blocks={caption} serializers={serializers} />;
  }
  return caption;
};

const renderLicensor = ({ licensor = '', sourceUrl = '' }) => {
  if (sourceUrl) {
    return (
      <p className="c-longform-grid__standard">
        Photo by: <a href={sourceUrl}>{licensor}</a>
      </p>);
  }
  return <p className="c-longform-grid__standard">Photo by: {licensor}</p>;
};

renderLicensor.propTypes = {
  licensor: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
};

const figureOutFigureClass = (size) => {
  if (size === 'narrow') {
    return 'c-figure--narrow c-longform-grid__standard ';
  } else if (size === 'small') {
    return 'c-figure--small c-longform-grid__standard ';
  } else if (size === 'normal') {
    return 'c-figure--normal c-longform-grid__large';
  } else if (size === 'wide') {
    return 'c-figure--wide c-longform-grid__full';
  }

  return 'c-figure--medium c-longform-grid__large';
};

const Figure = ({
  asset = {}, caption = {}, licensor = '', size, sourceUrl,
}) => (
  <figure {...classes('figure', null, figureOutFigureClass(size))}>
    <img {...classes('figure-img')} src={asset.url} alt={asset.altText} />
    {caption.length > 0 && (
    <figcaption {...classes('figure-figcaption')}>
      {renderCaption(caption)}
      {licensor && renderLicensor({ licensor, sourceUrl })}
    </figcaption>)}
  </figure>
);

Figure.propTypes = {
  asset: PropTypes.shape({
    url: PropTypes.string,
    altText: PropTypes.string,
  }).isRequired,
  caption: PropTypes.shape({
    licensor: PropTypes.string,
    sourceUrl: PropTypes.string,
  }).isRequired,
  license: PropTypes.string,
  licensor: PropTypes.string,
  size: PropTypes.string,
  sourceUrl: PropTypes.string,
};

Figure.defaultProps = {
  license: '',
  licensor: '',
  size: '',
  sourceUrl: '',
};

export default Figure;
