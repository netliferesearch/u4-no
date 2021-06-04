import React from 'react';
import Link from 'next/link';
import BEMHelper from 'react-bem-helper';
import Person from './Person';
import ArrowRight from './icons/ArrowRight'

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
    {title && (
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
    )}
    <div {...classes('wrapper', null)}>
      {members
        .map(member => (member.target ? member.target : member))
        .map(member => (
          <Person key={member._id} light person={member} linkLabel={linkLabel} />
        ))}
    </div>
  </section>
);

export default Team;
