import React from 'react';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'team',
  prefix: 'c-',
});

const Team = ({ title, members, featuredImage }) => (
  <section {...classes('')}>
    <div className="o-wrapper">
      <h2 {...classes('title')}>Hi!<br />{title}</h2>
    </div>
    <div {...classes('wrapper', null, 'o-wrapper')}>
      {
        members.map(member =>
          (<div {...classes('item')}>
            {member.featuredImage && (
              <figure {...classes('item-figure')}>
                <img src={member.featuredImage.asset.url} />
              </figure>
            )}
            <div {...classes('item-body')}>
              <h3 {...classes('item-title')}>{member.name}</h3>
              <small {...classes('item-subtitle')}>{member.position}</small>
              <div {...classes('item-meta')}>
                {member.phone}<br />
                {member.email}
              </div>
              <Link>
                <a>
                  <span {...classes('item-link')}>Bio</span>  <ArrowRight />
                </a>
              </Link>
            </div>
          </div>),
        )
      }
    </div>
    <div className="o-wrapper">
      <h2 className="c-statement"><a href="#">The whole U4 team -></a></h2>
    </div>
  </section>
);

export default Team;
