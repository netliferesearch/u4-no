import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'acknowledgements',
  prefix: 'c-',
});

export const Acknowledgements = ({ data, bottom = false }) => {
  const { acknowledgements = '' } = data;

  return acknowledgements ? (
    <div className={`c-acknowledgements ${bottom ? 'c-acknowledgements--bottom c-meta' : ''}`}>
      {bottom ? <hr className="u-section-underline--no-margins" /> : null }
      {acknowledgements ? (
        <h3 className="u-primary-heading">Acknowledgements</h3>
      ) : null}
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
