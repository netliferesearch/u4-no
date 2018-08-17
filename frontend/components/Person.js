import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';

const classes = BEMHelper({
  name: 'person',
  prefix: 'c-',
});

const Person = ({ person, linkLabel = 'Bio', light = true }) => (
  <div {...classes('item', person.image ? 'light' : 'noimg')}>
    <div {...classes('item-body', person.image ? 'light' : 'noimg')}>
      {person.slug && person.bio ? (
        <Link to={`/the-team/${person.slug.current}`}>
          <a
            {...classes('item-body-img', person.image ? 'light' : 'noimg')}
            style={{
              backgroundImage: `url(${person.image && person.image.asset.url}?w=400&q=100)`,
            }}
          />
        </Link>
      ) : (
        <a
          {...classes('item-body-img', person.image ? 'light' : 'noimg')}
          style={{
            backgroundImage: `url(${person.image && person.image.asset.url}?w=400&q=100)`,
          }}
        />
      )}

      <div {...classes('item-body-text')}>
        <div>
          {person.slug && person.bio ? (
            <Link to={`/the-team/${person.slug.current}`}>
              <a>
                <h3 {...classes('item-title')}>
                  {person.firstName && person.firstName} {person.surname && person.surname}
                </h3>
              </a>
            </Link>
          ) : (
            <h3 {...classes('item-title')}>
              {person.firstName && person.firstName} {person.surname && person.surname}
            </h3>
          )}

          <small {...classes('item-subtitle')}>{person.position && `${person.position}`}</small>
        </div>
        <div {...classes('item-meta')}>
          {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
          <br />
          {person.phone && <a href={`tel:${person.phone}`}>+{person.phone}</a>}
        </div>
      </div>
    </div>
  </div>
);

export default Person;
