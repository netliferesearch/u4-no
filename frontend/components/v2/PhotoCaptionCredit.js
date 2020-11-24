import React from 'react';
import BlockToContent from '@sanity/block-content-to-react';

export const PhotoCaptionCredit = ({ featuredImage }) => {
  const { license = '', credit = '', sourceUrl = '', caption } = featuredImage;
  return (
    <div className="c-credit">
      {caption && (
        <BlockToContent
          blocks={caption}
          serializers={{
            types: {
              block: props => (
                <span className="c-blog-entry__caption" style={{ display: 'inline' }}>
                  {props.children}
                </span>
              ),
            },
          }}
        />
      )}{' '}
      {!sourceUrl && credit && <span className="c-blog-entry__caption">Photo: {credit} </span>}
      {sourceUrl && (
        <span className="c-blog-entry__caption">
          Photo:
          <a className="u-margin-left-tiny" href={sourceUrl}>
            <div>{credit ? credit : sourceUrl}</div>
          </a>
        </span>
      )}
      {license && (
        <span className="c-blog-entry__caption">
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
            <div>
              {' '}
              {license.startsWith('copyrighted') || 'CC'} {license.toUpperCase()}
            </div>
          </a>
        </span>
      )}
    </div>
  );
};
