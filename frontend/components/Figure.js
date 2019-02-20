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

const renderCredit = ({ credit = '', sourceUrl = '', license = '' }) => (
  <p className="c-longform-grid__standard">
    {sourceUrl && credit && `Credit: <a href=${sourceUrl}>${credit}</a> ${license}`}
    {!sourceUrl && credit && `Credit: ${credit} ${license}`}
  </p>
);

renderCredit.propTypes = {
  credit: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  license: PropTypes.string.isRequired,
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
  asset = {}, caption = [], heading, credit = '', size, sourceUrl, license,
}) => (
  <figure {...classes('figure', null, figureOutFigureClass(size))}>
    {heading && <p className="c-figure__heading">{heading}</p>}
    <img {...classes('figure-img')} src={asset.url} alt={asset.altText} />
    {(caption.length > 0 || credit || sourceUrl || license) && (
      <figcaption {...classes('figure-figcaption')}>
        {renderCaption(caption)}
        {renderCredit({ credit, sourceUrl, license })}
      </figcaption>
    )}
  </figure>
);

Figure.propTypes = {
  asset: PropTypes.shape({
    url: PropTypes.string,
    altText: PropTypes.string,
  }).isRequired,
  heading: PropTypes.string,
  license: PropTypes.string,
  size: PropTypes.string,
  sourceUrl: PropTypes.string,
};

Figure.defaultProps = {
  heading: '',
  license: '',
  size: '',
  sourceUrl: '',
};

export default Figure;
