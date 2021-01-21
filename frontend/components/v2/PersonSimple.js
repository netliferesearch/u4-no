import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../../routes';

const classes = BEMHelper({
  name: 'person',
  prefix: 'c-',
});
export const PersonSimple = ({ person }) => {
  return (
    <div className="c-person">
      <div>
        <div
          {...classes('item-body-img', person.image ? 'light' : 'noimg')}
          style={{
            backgroundImage: `url(${person.image &&
              person.image.asset &&
              person.image.asset.url}?w=98&h=98&fit=crop&crop=top)`,
          }}
        />
      </div>
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
        <p>{person.position && `${person.position}`}</p>
        {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
      </div>
    </div>
  );
};
