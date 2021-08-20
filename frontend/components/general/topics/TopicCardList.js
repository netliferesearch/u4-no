import React from 'react';
import { SectionIntro } from '../SectionIntro';
import { ArrowNext } from '../../icons/ArrowNext';
import { BlueCard } from '../blue-card/BlueCard';

export const TopicCardList = ({ topics, type, title = 'Browse our topics', showIntro = true, showLink = true }) => {
  return (
    <div className="c-topic-card-list">
      {showIntro && (
        <SectionIntro title={title} />
      )}
      <div className="c-topic-card-list__wrapper">
        {topics.map((post, index) => (
          <BlueCard type={type} post={post} key={index} />
        ))}
      </div>
      {showLink && (
        <div className="c-topics__link-holder">
          <a className="c-btn c-btn--link " href="/topics">
            View All
            <ArrowNext />
          </a>
        </div>
      )}
    </div>
  );
};
