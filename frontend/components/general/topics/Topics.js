import React from 'react';
import { spacesToDash } from '../../../helpers/stringHelpers';
import uniq from 'lodash/uniq';

/**
 * Topics Link list/Tags list component to list topics
 * Used in LongFormArticle component - publication/:slug page.
 *
 * @param {Boolean} title
 * @param {Array} topics
 * @param {Boolean} hr
 */

export const Topics = ({ title = '', topics = [], hr = false, onDark = false }) => {
  return topics ? (
    <div className="c-topics">
      {hr ? <hr className="u-section-underline--no-margins" /> : null}
      {title ? (
        <h4 className={`u-secondary-heading u-secondary-h4 ${onDark ? 'u-text--white' : ''}`}>
          {title}
        </h4>
      ) : null}
      <div className="c-topics__list">
        {uniq(topics).map((topic, index) =>
          topic.slug && topic.title ? (
            <div key={index} className={`c-btn--tag ${onDark ? 'c-btn--tag--onDark' : ''}`}>
              <a
                href={`/topics/${topic.slug.current ? topic.slug.current : topic.slug}`}
                className="topic--plain"
              >
                <div>{topic.title}</div>
              </a>
            </div>
          ) : typeof topic === 'string' ? (
            <div key={index} className="c-btn--tag">
              <a
                href={`/topics/${spacesToDash(topic)}`}
                className="topic--plain"
                key={index}
              >
                {topic}
              </a>
            </div>
          ) : null
        )}
      </div>
    </div>
  ) : null;
};
