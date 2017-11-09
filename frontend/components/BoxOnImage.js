import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';

const classes = BEMHelper({
  name: 'boxOnImage',
  prefix: 'c-',
});

const BoxOnImage = ({ text = '', image, wide = false, helpdesk = false }) => (
  <div {...classes()}>
    <figure {...classes('figure')}>
      { image && <img alt="" src={image.asset.url} /> }
    </figure>
    <div {...classes('body', wide ? 'wide' : null)}>
      <BlockContent blocks={text} />
      { helpdesk ?
        <div className="c-columns">
          <div className="c-columns__item c-columns--two__item">
            <h3>U4 helpdesk coordinator in Bergen</h3>

          </div>
          <div className="c-columns__item c-columns--two__item">
            <h3>U4 helpdesk at Transparency International</h3>

          </div>
        </div>
        : null}
    </div>
  </div>
);

export default BoxOnImage;
