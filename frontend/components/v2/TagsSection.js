import React from 'react';

/**
 * TagsSection component to list topics and keywords (keyword categories "regions" and "keywords")
 * Used in BlogEntry component, blog page
 * 
 * @param {array} topics
 * @param {keywords} topics
 */

export const TagsSection = ({ topics = [], keywords = [] }) => {

  return (
    <div className="tags-section">
      <h3 className="title">Tags</h3>
      <div className="tags-section__row">
        {topics &&
          topics.map((topic, index) => (
            <span className="topic" key={index}>
              {topic.title}
            </span>
          ))}
      </div>
      <div className="tags-section__row">
        {keywords && keywords
            .filter(keyword => keyword.category === 'region')
            .map((keyword, index) => (
              <span className="keyword" key={index}>
                {keyword.keyword}
              </span>
            ))}
      </div>
      <div className="tags-section__row">
        {keywords && 
        keywords
          .filter(keyword => keyword.category === 'keyword')
          .map((keyword, index) => (
            <span className="keyword" key={index}>
              {keyword.keyword}
            </span>
          ))}
      </div>
    </div>
  );
};

// link:
// {topics.length > 0 && (
//   <p className="c-longform-grid__standard">
//     Related topics:{' '}
//     {topics.map(({ _ref = '', target = {} }) => (
//       <Link
//         key={_ref}
//         route="topic.entry"
//         params={{ slug: target.slug ? target.slug.current : '' }}
//       >
//         <a className="c-article-header__link-item">{target.title}</a>
//       </Link>
//     ))}
//   </p>
// )}
