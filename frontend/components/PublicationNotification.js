import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../routes';
import BlockContent from '@sanity/block-content-to-react';
import BEMHelper from 'react-bem-helper';

import serializers from './serializers';
import bibliographicReference from '../helpers/bibliographicReference';
import buildUrl from '../helpers/buildUrl';

const classes = BEMHelper({
  name: 'notification',
  prefix: 'c-',
});

// remove blocks with no text
const trimEmptyBlocks = blocks =>
  blocks.filter((block) => {
    if (
      block._type === 'block' &&
      block.children.length === 1 &&
      block.children[0].text.length === 0
    ) {
      return false;
    }
    return true;
  });

const PublicationNotification = ({ headsUp = false, updatedVersion = false, date = {} }) => {
  const pubyear = date && date.utc ? new Date(date.utc).getFullYear() : '';
  const headsUpHasContent = headsUp && trimEmptyBlocks(headsUp).length > 0;

  return (
    <section>
      {headsUpHasContent && (
        <div {...classes()}>
          <BlockContent blocks={headsUp} serializers={serializers} />
        </div>
      )}
      {updatedVersion && (
        <div {...classes()}>
          <p {...classes('label')}>A more recent publication is available:</p>
          <p {...classes('body')}>
            <a
              href={buildUrl({ _type: 'publication', slug: updatedVersion.slug })}
              title={updatedVersion.title}
            >
              {updatedVersion.title}
            </a>
            <br />
            <span>
              {bibliographicReference({
                publicationType: updatedVersion.publicationType,
                publicationNumber: updatedVersion.publicationNumber,
                reference: updatedVersion.reference,
                shortVersion: true,
              })}
            </span>
          </p>
        </div>
      )}
      {!headsUpHasContent &&
        !updatedVersion &&
        date &&
        new Date().getFullYear() - Number(pubyear) > 5 && (
          <div {...classes()}>
            <p {...classes('body')}>
              This publication is from {pubyear}. Some of the content may be outdated. Search
              related topics to find more recent resources.
            </p>
          </div>
        )}
    </section>
  );
};

PublicationNotification.propTypes = {};

PublicationNotification.defaultProps = {
  headsUp: [],
  updatedVersion: {},
  date: {},
};

export default PublicationNotification;
