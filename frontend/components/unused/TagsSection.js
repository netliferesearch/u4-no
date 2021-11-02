import React from 'react';

/**
 * Not used in 2021 design
 * 
 * TagsSection component to list topics and keywords (keyword categories: "regions" + "countries" and "keywords")
 * Used in BlogEntry component - blog page, LongFormArticle component - publication/:slug page.
 *
 * @param {Array} topics
 * @param {Array} keywords
 */

export const TagsSection = ({ topics = [], keywords = [] }) => {
  return (
    <div className="c-tags-section">
      <h3 className="title">Tags</h3>
      {topics && (
        <div className="c-tags-section__row">
          <h6>Topics</h6>
          <div className="c-tags-section__col">
            {topics.map(
              (topic, index) =>
                topic.title && (
                  <span className="topic" key={index}>
                    {topic.title}
                  </span>
                )
            )}
          </div>
        </div>
      )}
      {keywords && (
        <div className="c-tags-section__row">
          <h6>Region</h6>
          <div className="c-tags-section__col">
            {keywords
              .filter(keyword => keyword.category === 'region' || keyword.category === 'country')
              .map((keyword, index) => (
                <span className="keyword" key={index}>
                  {keyword.keyword}
                </span>
              ))}
          </div>
        </div>
      )}
      {keywords && (
        <div className="c-tags-section__row">
          <h6>Keywords</h6>
          <div className="c-tags-section__col">
            {keywords
              .filter(keyword => keyword.category === 'keyword')
              .map((keyword, index) => (
                <span className="keyword" key={index}>
                  {keyword.keyword}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
