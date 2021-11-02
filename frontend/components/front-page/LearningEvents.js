import React from 'react';
import { SectionIntro } from '../general/SectionIntro';
import { BlueCard, CONTENT_BY_TYPE, CARD_TYPE } from '../general/blue-card/BlueCard';

export const LearningEvents = ({ events, type, title = 'Learning and Events', text = '' }) => {
  if (!events || events.length === 0) return null;

  let eventRemainder = events.length;
  switch (eventRemainder % 3) {
    case 1:
      eventRemainder = 'column-1';
      break;
    case 2:
      eventRemainder = 'column-2';
      break;
    case 0:
      eventRemainder = 'column-3';
      break;
  }
  events.length === 4 ? (eventRemainder = 'column-all-2') : eventRemainder;
  return (
    <div>
      <SectionIntro title={title} text={text} />
      <div className="c-events-list__row c-events-list__content">
        <div className={`c-learning-events__wrapper c-learning-events__grid ${eventRemainder}`}>
          {events
            ? events.map((post, index) => (
                <BlueCard
                  type={index == 0 && eventRemainder == 'column-1' ? CARD_TYPE.FULL : type}
                  post={post}
                  key={index}
                  content={CONTENT_BY_TYPE.COURSE}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
