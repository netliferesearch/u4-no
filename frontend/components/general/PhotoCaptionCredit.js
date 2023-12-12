import React from 'react';
import BlockToContent from '@sanity/block-content-to-react';

export const PhotoCaptionCredit = ({ image = {}, showCaption = true, onDark = false }) => {
  if (!image) {
    return null;
  }
  const { license = '', credit = '', sourceUrl = '', caption } = image;
  return (
    <div className={`c-credit ${onDark ? 'onDark' : ''}`}>
      {caption && showCaption && (
        <BlockToContent
          blocks={caption}
          serializers={{
            types: {
              block: props => (
                <span className="c-credit__caption" style={{ display: 'inline' }}>
                  {props.children}
                </span>
              ),
            },
          }}
        />
      )}{' '}
      {!sourceUrl && credit && <span className="c-credit__caption">Photo: {credit} </span>}
      {sourceUrl && (
        <span className="c-credit__caption">
          Photo:
          <a className="u-margin-left-tiny" href={sourceUrl}>
            <div>{credit ? credit : sourceUrl}</div>
          </a>
        </span>
      )}
      {license && (
        <span className="c-credit__caption">
          {license.startsWith('by') && 'CC'} {license.toUpperCase()}
        </span>
      )}
      {/* {license && (
        <span className="c-credit__caption">
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
            <div>
              {' '}
              {license.startsWith('copyrighted') || 'CC'} {license.toUpperCase()}
            </div>
          </a>
        </span>
      )} */}
    </div>
  );
};
