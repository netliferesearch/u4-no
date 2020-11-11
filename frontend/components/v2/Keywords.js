import React from 'react';

/**
 * Keywords component to list keywords (keyword categories: "keywords")
 * Used in BlogEntry component - blog page, LongFormArticle component - publication/:slug page.
 *
 * @param {Boolean} title
 * @param {Array} keywords
 */

export const Keywords = ({ title = true, keywords = [] }) => {
  return (
      keywords && (
        <div className="c-keywords">
          {title ? <h6>Keywords</h6> : null }
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
