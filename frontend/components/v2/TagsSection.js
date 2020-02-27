import React from 'react';

/**
 * TagsSection component to list topics and keywords (keyword categories: "regions" and "keywords")
 * Used in BlogEntry component, blog page
 *
 * @param {Array} topics
 * @param {Array} keywords
 */

export const TagsSection = ({ topics = [], keywords = [] }) => {
  console.log("keywords:",keywords ? keywords : "now kw")
  console.log("topics:", topics ? topics: "no topics")

  return (
    <div className="tags-section">
      <h3 className="title">Tags</h3>
      {topics && (
        <div className="tags-section__row">
          <h6>Topics</h6>
          {topics.map((topic, index) => (
            topic.title && <span className="topic" key={index}>
              {topic.title}
            </span>
          ))}
        </div>
      )}
      {keywords && (
        <div className="tags-section__row">
          <h6>Region</h6>
          {keywords
            .filter(keyword => keyword.category === 'region' || keyword.category === 'country')
            .map((keyword, index) => (
              <span className="keyword" key={index}>
                {keyword.keyword}
              </span>
            ))}
        </div>
      )}
      {keywords && (
        <div className="tags-section__row">
          <h6>Keywords</h6>
          {keywords
            .filter(keyword => keyword.category === 'keyword')
            .map((keyword, index) => (
              <span className="keyword" key={index}>
                {keyword.keyword}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};
