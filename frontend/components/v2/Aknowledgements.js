import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'acknowledgements',
  prefix: 'c-',
});

export const Acknowledgements = ({ data }) => {
  const { publicationType = {}, acknowledgements = '' } = data;

  return data ? (
    <div className="c-acknowledgements">
      {acknowledgements || partners.length > 0 || publicationType._id === 'pubtype-3' ? (
        <h3 className="u-headline--2">Acknowledgements</h3>
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
