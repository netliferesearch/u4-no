import React from 'react';
import { SectionIntro } from '../general/SectionIntro';
import { BlueCard, CONTENT_BY_TYPE } from '../general/blue-card/BlueCard';

export const LearningEvents = ({ events, type }) => {
  if (!events || events.length === 0) return null;
  return (
    <div>
      <SectionIntro
        title="Learning and Events"
        //text="Lorem ipsum ipsum lorem"
        //slug="/blog"
        //label="View blog"
      />

      <div className="c-events-list__row c-events-list__content">
        <div className="c-learning-events__wrapper">
          {events
            ? events.map((post, index) => <BlueCard type={type} post={post} content={CONTENT_BY_TYPE.COURSE} key={index} />)
            : null}
        </div>
      </div>
    </div>
  );
};
