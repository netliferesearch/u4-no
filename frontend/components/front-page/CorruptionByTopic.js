import React from 'react';
import { SectionIntro } from '../general/SectionIntro';
import { ArrowNext } from '../icons/ArrowNext';
import { BlueCard } from '../general/blue-card/BlueCard';

export const TopicCardList = ({ topics, type }) => {
  return (
    <div className="c-topic-card-list">
      <SectionIntro
        title="Browse our topics"
        // text="A sentence on contextualising the value/use of U4 topics"
        label="View all topics"
        slug="/topics"
      />
      <div className="c-topic-card-list__wrapper">
        {topics.map((post, index) => (
          <BlueCard type={type} post={post} key={index} />
        ))}
      </div>
      <div className="c-topics__link-holder">
        <a className="c-btn c-btn--link " href="/topics">
          View All
          <ArrowNext />
        </a>
      </div>
    </div>
  );
};
