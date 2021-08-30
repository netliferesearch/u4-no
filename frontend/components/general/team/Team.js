import React from 'react';
import { PersonCard } from '../person/PersonCard';

export const Team = ({ type, members, heading, linkLabel = 'Bio' }) => {
  return (
    <div>
      <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">{heading}</h4>
      <div>
        <div className="c-team__wrapper">
          {members
            .map(member => (member.target ? member.target : member))
            .map(member => (
              <PersonCard
                type={type}
                key={member._id}
                light
                person={member}
                linkLabel={linkLabel}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
