import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../../routes';

const classes = BEMHelper({
  name: 'person-simple',
  prefix: 'c-',
});
export const PersonSimple = ({ person }) => {
  return (
    <div className="c-person-simple">
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
              <p {...classes('item-title--name')}>
                {person.firstName && person.firstName} {person.surname && person.surname}
              </p>
            </a>
          </Link>
        ) : (
          <p {...classes('item-title--name')}>
            {person.firstName && person.firstName} {person.surname && person.surname}
          </p>
        )}
        <p>{person.position && `${person.position}`}</p>
        {person.email && <p><span>Email: </span><a href={`mailto:${person.email}`}>{person.email}</a></p>}
      </div>
    </div>
  );
};
