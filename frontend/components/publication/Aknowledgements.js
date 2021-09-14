import React from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers/serializers';

const classes = BEMHelper({
  name: 'acknowledgements',
  prefix: 'c-',
});

export const Acknowledgements = ({ acknowledgements = [], bottom = false }) => {

  return acknowledgements ? (
    <div className={`c-acknowledgements ${bottom ? 'c-acknowledgements--bottom c-meta' : ''}`}>
      {acknowledgements ? (
        <h4 className="u-secondary-heading u-secondary-h3">Acknowledgements</h4>
      ) : null}
      <hr className="u-section-underline--dark-grey" />
      {acknowledgements ? (
        <div {...classes('item')}>
          {/* <h3 className="u-black-mid-headline">Acknowledgements</h3> */}
          <div {...classes('content')}>
            {typeof acknowledgements === 'string' && <p>{acknowledgements}</p>}
            {typeof acknowledgements !== 'string' && (
              <BlockContent blocks={acknowledgements} serializers={serializers} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};
