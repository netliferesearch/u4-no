import React from 'react';
import { Link } from '../../routes';

/**
 * Topics component to list topics
 * Used in LongFormArticle component - publication/:slug page.
 *
 * @param {Boolean} title
 * @param {Array} topics
 * @param {Boolean} hr
 */

export const Topics = ({ title = true, topics = [], hr = false }) => {
  return topics ? (
    <div className="c-topics">
      {title ? <h4 className="u-headline--ter">Topics</h4> : null}
      {hr ? <hr className="u-section-underline--no-margins" /> : null}
      <div className="c-topics__list">
        {topics.map((topic, index) => (
          <span className="topic" key={index}>
            <Link route="topic.entry" params={{ slug: topic.slug.current }}>
              <a className="c-btn--ter">
                <div>{topic.title}</div>
              </a>
            </Link>
            <span>{`${topics.length > 1 && index + 1 < topics.length ? ', ' : ''}`}</span>
          </span>
        ))}
      </div>
    </div>
  ) : null;
};
