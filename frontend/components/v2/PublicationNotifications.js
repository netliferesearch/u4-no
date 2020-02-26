import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import BEMHelper from 'react-bem-helper';

import serializers from '../serializers';
import buildUrl from '../../helpers/buildUrl';

const classes = BEMHelper({
  name: 'notifications',
  prefix: 'c-',
});

// remove blocks with no text
const trimEmptyBlocks = blocks =>
  blocks.filter(block => {
    if (
      block._type === 'block' &&
      block.children.length === 1 &&
      block.children[0].text.length === 0
    ) {
      return false;
    }
    return true;
  });

const PublicationNotifications = ({
  headsUp = false,
  updatedVersion = false,
  date = {},
  publicationType = {},
}) => {
  const pubyear = date && date.utc ? new Date(date.utc).getFullYear() : '';
  const headsUpHasContent = headsUp && trimEmptyBlocks(headsUp).length > 0;

  return (
    <section>
      {headsUpHasContent && (
        <div {...classes('label')}>
          <BlockContent blocks={headsUp} serializers={serializers} />
        </div>
      )}
      {updatedVersion && (
        <div {...classes()}>
          <p {...classes('label')}>
            This publication is from {pubyear}.A more recent version has been published,{' '}
            <a
              href={buildUrl({
                _type: 'publication',
                slug: updatedVersion.slug,
              })}
              title={updatedVersion.title}
            >
              {updatedVersion.title}
            </a>
            {'.'}
          </p>
        </div>
      )}
      {publicationType._id == '080dc28c-9d5e-4c14-972f-73f83a206b92' && (
        <p {...classes('label')}>
          This publication is part of the TNRC consortium and produced with support from USAID.
        </p>
      )}
      {/* {!headsUpHasContent &&
        !updatedVersion &&
        date &&
        new Date().getFullYear() - Number(pubyear) > 5 && (
          <div {...classes()}>
            <p {...classes('body')}>
              This publication is from {pubyear}. Some of the content may be outdated. Search
              related topics to find more recent resources.
            </p>
          </div>
        )} */}
    </section>
  );
};

PublicationNotifications.propTypes = {};

PublicationNotifications.defaultProps = {
  headsUp: [],
  updatedVersion: {},
  date: {},
};

export default PublicationNotifications;
