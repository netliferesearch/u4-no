import React from 'react';
import { spacesToDash } from '../../../helpers/stringHelpers';

/**
 * Topics Link list/Tags list component to list topics
 * Used in LongFormArticle component - publication/:slug page.
 *
 * @param {Boolean} title
 * @param {Array} topics
 * @param {Boolean} hr
 */

export const Topics = ({ title = '', topics = [], hr = false }) => {
  return topics ? (
    <div className="c-topics">
      {title ? <h4 className="u-primary-heading">{title}</h4> : null}
      {hr ? <hr className="u-section-underline--no-margins" /> : null}
      <div className="c-topics__list">
        {topics.map((topic, index) =>
          topic.slug && topic.title ? (
            <div key={index} className="c-btn--tag">
              <a href={`/topics/${topic.slug.current}`} className="topic--plain">
                <div>{topic.title}</div>
              </a>
              {/* <span>{`${topics.length > 1 && index + 1 < topics.length ? ', ' : ''}`}</span> */}
            </div>
          ) : !topic.slug && topic.title ? (
            <div key={index} className="c-btn--tag">
              <a href={`/topics/${spacesToDash(topic.title)}`} className="topic--plain" key={index}>
                {topic.title}
              </a>
            </div>
          ) : null
        )}
      </div>
    </div>
  ) : null;
};
