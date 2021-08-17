import React from 'react';
import Link from 'next/link';
import { SectionIntro } from './general/SectionIntro';
import { ArrowNext } from './icons/ArrowNext';
import dateToString from '../helpers/dateToString';

export const TopicCardList = ({ topics }) => {
  return (
    <div className="c-topic-card-list">
      <SectionIntro
        title="Browse our topics"
        // text="A sentence on contextualising the value/use of U4 topics"
        label="View all topics"
        slug="/topics"
      />
      <ul>
        {topics.map((topic, index) => (
          <li key={topic._id} className="c-topic-card-list__item">
            <Link href={`/topics/${topic.slug.current}`}>
              <a>
                <div className="c-topic-card-list__item-text">
                  <div>
                    <h2 className="u-secondary-h2 u-text--white">{topic.title}</h2>
                    <p className="u-body u-text--grey c-topic-paragraph">{topic.longTitle}</p>
                  </div>
                  <p className="c-topic__date  u-body--small">
                    {topic._updatedAt
                      ? 'Updated' + ' ' + dateToString({ start: topic._updatedAt })
                      : null}
                  </p>
                  <div>
                    {/* <Link href={`/topics/${topic.slug.current}`}> */}
                    {/* <div className="c-btn c-btn--secondary">
                      <span>Learn more</span>
                    </div> */}
                    {/* </Link> */}
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="c-topics__link-holder">
        <a className="c-btn c-btn--link " href="/topics">
          View All
          <ArrowNext />
        </a>
      </div>
    </div>
  );
};