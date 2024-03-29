import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import BEMHelper from 'react-bem-helper';
import serializers from '../serializers/serializers';
import buildUrl from '../../helpers/buildUrl';
import { ArrowNextWhite } from '../icons/ArrowNextWhite';

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

export const PublicationNotifications = ({
  headsUp = false,
  updatedVersion = false,
  date = {},
  publicationType = {},
}) => {
  const pubyear = date && date.utc ? new Date(date.utc).getFullYear() : '';
  const headsUpHasContent = headsUp && trimEmptyBlocks(headsUp).length > 0;

  return headsUpHasContent ||
    updatedVersion ||
    publicationType._id === '080dc28c-9d5e-4c14-972f-73f83a206b92' ||
    (!headsUpHasContent &&
      !updatedVersion &&
      date &&
      new Date().getFullYear() - Number(pubyear) > 5) ? (
    <section {...classes()}>
      {headsUpHasContent && (
        <div className="c-notifications__note-item c-notifications__headsUp">
          <BlockContent blocks={headsUp} serializers={serializers} />
        </div>
      )}
      {updatedVersion && (
        <div className="c-notifications__note-item c-notifications__updatedVersion">
          {/* <Note /> */}
          <h4 className="u-secondary-heading">A more recent publication is available:</h4>
          <div {...classes('updatedVersionLink')}>
            <a
              href={buildUrl({
                _type: 'publication',
                slug: updatedVersion.slug,
              })}
              title={updatedVersion.title}
              className=""
            >
              <p {...classes('label')}>
                {/* This publication is from {pubyear}.A more recent version has been published,{' '} */}
                {updatedVersion.title} <br />
                <span>
                  {updatedVersion.publicationType?.title} {updatedVersion.publicationNumber}
                </span>
              </p>
            </a>
            <a
              className="c-btn c-btn--link"
              href={buildUrl({
                _type: 'publication',
                slug: updatedVersion.slug,
              })}
              title={updatedVersion.title}
            >
              View
              <ArrowNextWhite />
            </a>
          </div>
        </div>
      )}
      {publicationType._id === '080dc28c-9d5e-4c14-972f-73f83a206b92' && (
        <div className="c-notifications__note-item c-notifications__partner">
          {/* <Note /> */}
          <p {...classes('label')}>
            This publication is part of the TNRC consortium and produced with support from USAID.
          </p>
        </div>
      )}
      {!headsUpHasContent &&
        !updatedVersion &&
        pubyear &&
        new Date().getFullYear() - Number(pubyear) > 5 && (
          <div className="c-notifications__note-item c-notifications__old">
            {/* <Note /> */}
            <p {...classes('label')}>
              This publication is {pubyear ? `from ${pubyear}` : 'some years old'}. Newer material may be available. Please search
              related topics and keywords.
            </p>
          </div>
        )}
    </section>
  ) : null;
};
