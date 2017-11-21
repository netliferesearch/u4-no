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
    <div {...classes('item-body', person.image ? 'light' : 'noimg')}>
      <div
        {...classes('item-body-img', person.image ? 'light' : 'noimg')}
        style={{ backgroundImage: `url(${person.image && person.image.asset.url})` }}
      />
      <div {...classes('item-body-text')}>
        <div>
          <small {...classes('item-subtitle')}>{person.position && `${person.position}`}</small>
          <h3 {...classes('item-title')}>
            {person.firstName && person.firstName} {person.surname && person.surname}
          </h3>
        </div>
        <div {...classes('item-meta')}>
          {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
          <br />
          {person.phone && <a href={`tel:${person.phone}`}>+{person.phone}</a>}
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
  </div>
);

export default Person;
