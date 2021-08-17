import React from 'react';
import dateToString from '../helpers/dateToString';
import LinkToItem from './LinkToItem';
import { SectionIntro } from './SectionIntro';
import { getPostType } from '../helpers/getRouteByType';
import { shortSentences } from '../helpers/stringHelpers';
import LocationIcon from './icons/LocationIcon';
import { CalendorIcon } from './icons/CalendorIcon';
import { ArrowNext } from './icons/ArrowNext';
import { BlueCard } from './general/blue-card/BlueCard';

export const LearningEvents = ({ events }) => {
  if (!events || events.length === 0) return null;
  return (
    <div>
      <SectionIntro
        title="Learning and Events"
        // text="Lorem ipsum ipsum lorem"
        slug="/blog"
        label="View blog"
      />

      <div className="c-events-list__row c-events-list__content">
        <div className="c-events-list__col ">
          {events ? events.map((post, index) => <BlueCard post={post} key={index} />) : null}
        </div>
      </div>
    </div>
  );
};
