import React from 'react';
import Link from 'next/link';
import BEMHelper from 'react-bem-helper';
import Person from './Person';
import { PersonCard } from './general/person/PersonCard';
import ArrowRight from './icons/ArrowRight';

const classes = BEMHelper({
  name: 'team',
  prefix: 'c-',
});

const Team = ({
  title,
  members,
  light = false,
  linkLabel = 'Bio',
  applyJob = false,
  sayHi = true,
}) => (
  <section {...classes('', light && 'light')}>
    {/* {title && (
      <div className="o-wrapper">
        <h2 {...classes('title')}>
          {sayHi && (
            <span>
              Hi!
              <br />
            </span>
          )}
          {title}
        </h2>
      </div>
    )} */}
    <div>
      <div className="c-team__wrapper">
        {members
          .map(member => (member.target ? member.target : member))
          .map(member => (
            <PersonCard key={member._id} light person={member} linkLabel={linkLabel} />
          ))}
      </div>
    </div>
  </section>
);

export default Team;
