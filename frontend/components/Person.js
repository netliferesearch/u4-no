import React from 'react';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';

const classes = BEMHelper({
  name: 'person',
  prefix: 'c-',
});

const Person = ({ person, linkLabel = 'Bio', light = true }) => (
  <div {...classes('item', person.image ? 'light' : 'noimg')}>
    {person.image ? (
      <figure {...classes('item-figure')}>
        <img src={`${person.image.asset.url}?w=600&h=500&fit=crop&crop=focalpoint`} />
      </figure>
    ) : null}
    <div {...classes('item-body', person.image ? 'light' : 'noimg')} style={{ backgroundImage: `url(${person.image && person.image.asset.url}?w=600&h=500&fit=crop&crop=focalpoint)` }}>
      <div>
        <small {...classes('item-subtitle')}>
          {person.position && `${person.position}, `}
          {person.affiliations && person.affiliations.map(i => <span>{i.name}</span>)}
        </small>
        <h3 {...classes('item-title')}>{person.firstName && person.firstName} {person.surname && person.surname}</h3>
      </div>
      <div {...classes('item-meta')}>
        {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
        <br />
        <a href="tel:41044511">+47 410 445 11</a>
      </div>
      {person.slug && person.bio ? (
        <Link to={`/the-team/${person.slug.current}`}>
          <a>
            <span {...classes('item-link')}>{linkLabel}</span> <ArrowRight />
          </a>
        </Link>
      ) : null}
    </div>

  </div>
);

export default Person;
