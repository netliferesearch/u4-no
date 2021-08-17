import React from 'react';
import Link from 'next/link';
import { spacesToDash } from '../helpers/stringHelpers';

/**
 * Topics component to list topics
 * Used in LongFormArticle component - publication/:slug page.
 *
 * @param {Boolean} title
 * @param {Array} topics
 * @param {Boolean} hr
 */

export const Topics = ({ title = true, topics = [], hr = false, linkType = 'ter' }) => {
  return topics ? (
    <div className="c-topics">
      {title ? <h4 className="u-primary-heading">Topics</h4> : null}
      {hr ? <hr className="u-section-underline--no-margins" /> : null}
      <div className="c-topics__list">
        {topics.map((topic, index) =>
          topic.slug && topic.title ? (
            <span className="topic" key={index}>
              <a href={`/topics/${topic.slug.current}`}>
                <a className={`c-btn--${linkType}`}>
                  <div>{topic.title}</div>
                </a>
              </a>
              <span>{`${topics.length > 1 && index + 1 < topics.length ? ', ' : ''}`}</span>
            </span>
          ) : !topic.slug && topic.title ? (
            <div key={index} className="c-btn--tag">
              <a href={`/topics/${spacesToDash(topic.title)}`} className="topic--plain" key={index}>
                {topic.title}
                {/* {`${topic.title}${topics.length > 1 && index + 1 < topics.length ? ', ' : ''}`} */}
              </a>
            </div>
          ) : null
        )}
      </div>
    </div>
  ) : null;
};
