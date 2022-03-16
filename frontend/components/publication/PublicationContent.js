import React from 'react';
import { PublicationNotifications } from './PublicationNotifications';
import { MainPoints } from './MainPoints';
//import { ArticleLead } from '../general/article-lead/ArticleLead';

export const PublicationContent = ({
  //lead = '',
  //abstract = '',
  publicationType = {},
  mainPoints = [],
  headsUp = false,
  updatedVersion = false,
  date = {},
}) => {
  return (
    <div className="c-article__content c-publication__content">
      {headsUp || updatedVersion ? (
        <PublicationNotifications
          headsUp={headsUp}
          updatedVersion={updatedVersion}
          date={date}
          publicationType={publicationType}
        />
      ) : null}
      {mainPoints.length > 0 && <MainPoints items={mainPoints} />}
    </div>
  );
};
