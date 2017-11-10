import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import { Person } from './';
import { ArrowRight } from '../components/icons';

const classes = BEMHelper({
  name: 'team',
  prefix: 'c-',
});

const Team = ({ title, members, light = false, linkLabel = 'Bio', applyJob = false }) => (
  <section {...classes('', light && 'light')}>
    { title &&
      <h2 {...classes('title')}>Hi!<br />{title}</h2>
    }
    <div {...classes('wrapper', null)}>
      {
        members.map(member =>
          <Person light person={member} linkLabel={linkLabel} />,
        )
      }
    </div>
  </section>
);

export default Team;
