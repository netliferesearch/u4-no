import React from 'react';
import Link from 'next/link';

/**
 * Keywords component to list keywords (keyword categories: "keywords")
 * Used in BlogEntry component - blog page, LongFormArticle component - publications/:slug page.
 *
 * @param {Boolean} title
 * @param {Array} keywords
 * @param {Boolean} hr
 */

export const Keywords = ({ title = true, keywords = [], hr = false }) => {
  const urlsafe = text => text.replace( ",", "%7C" );
  return (
    <div className="c-keywords">
      {title ? <h4 className="u-secondary-heading u-secondary-h3">Keywords</h4> : null}
      {hr ? <hr className="u-section-underline--dark-grey" /> : null}
      <div className="c-keywords__list">
        {keywords
          /* .filter(keyword => keyword.category === 'keyword') */
          .map((keyword, index) => (
            <span className="u-body--small" key={index}>
              <Link
                href={`/search?filters=${keyword.category}-${keyword.translation ? urlsafe( keyword.translation.keyword ) : urlsafe( keyword.keyword )}`}
                legacyBehavior>{keyword.keyword}</Link>
              {index < keywords.length - 1 ? ', ' : ''}
            </span>
          ))}
      </div>
    </div>
  );
};
