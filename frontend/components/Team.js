import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import { Person } from './';

const classes = BEMHelper({
  name: 'team',
  prefix: 'c-',
});

const Team = ({ title, members, linkLabel = 'Bio' }) => (
  <section {...classes('')}>
    <div className="o-wrapper">
      <h2 {...classes('title')}>Hi!<br />{title}</h2>
    </div>
    <div {...classes('wrapper', null, 'o-wrapper')}>
      {
        members.map(member =>
          <Person person={member} linkLabel={linkLabel} />,
        )
      }
    </div>
    <div className="o-wrapper">
      <h2 className="c-topic-section__title"><a href="#">The whole U4 team -></a></h2>
    </div>
  </section>
);

export default Team;
