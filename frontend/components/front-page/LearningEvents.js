import React from 'react';
import { SectionIntro } from '../general/SectionIntro';
import { BlueCard, CONTENT_BY_TYPE } from '../general/blue-card/BlueCard';

export const LearningEvents = ({ events, type, title = 'Learning and Events', text = '' }) => {
  if (!events || events.length === 0) return null;
  return (
    <div>
      <SectionIntro title={title} text={text}/>
      <div className="c-events-list__row c-events-list__content">
        <div
          className={`c-learning-events__wrapper c-learning-events__grid ${
            events.length === 1
              ? 'c-learning-events__grid--1'
              : events.length === 2
              ? 'c-learning-events__grid--2'
              : ''
          }`}
        >
          {events
            ? events.map((post, index) => (
                <BlueCard type={type} post={post} key={index} content={CONTENT_BY_TYPE.COURSE} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
