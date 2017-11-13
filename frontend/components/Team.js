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
      <div className="o-wrapper">
        <h2 {...classes('title')}>Hi!<br />{title}</h2>
      </div>
    }
    <div {...classes('wrapper', null)}>
      {
        members.map(member =>
          <Person light person={member} linkLabel={linkLabel} />,
        )
      }
      {applyJob &&
      <div className="c-person__item c-person__item--apply">
        <div className="c-person__item-body c-person__item-body--apply">
          <div>
            <h3 className="c-person__item-title--apply">JOBS APPLY</h3>
          </div>
          <Link to="mailto:work@u4.no">
            <a>
               work@u4.no
            </a>
          </Link>
        </div>
      </div>
      }
    </div>
  </section>
);

export default Team;
