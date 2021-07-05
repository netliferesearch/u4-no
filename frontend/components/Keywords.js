import React from 'react';

/**
 * Keywords component to list keywords (keyword categories: "keywords")
 * Used in BlogEntry component - blog page, LongFormArticle component - publications/:slug page.
 *
 * @param {Boolean} title
 * @param {Array} keywords
 * @param {Boolean} hr
 */

export const Keywords = ({ title = true, keywords = [], hr = false }) => {
  return (
      keywords && (
        <div className="c-keywords">
          {title ? <h5 className="u-secondary-heading">Keywords</h5> : null }
          {hr ? <hr className="u-section-underline--no-margins" /> : null }
          <div className="c-keywords__list">
            {keywords
              .filter(keyword => keyword.category === 'keyword')
              .map((keyword, index) => (
                <span className="keyword" key={index}>
                  {keyword.keyword}
                </span>
              ))}
          </div>
        </div>
      )
  );
};
