import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../../routes';

const classes = BEMHelper({
  name: 'person-basic',
  prefix: 'c-',
});

export const PersonBasic = ({ person, showEmail = true }) => {
  return (
    <div className="c-person-basic">
      <div>
        <div
          {...classes('item-body-img', person.image ? 'light' : 'noimg')}
          style={{
            backgroundImage: `url(${person.image &&
              person.image.asset &&
              person.image.asset.url}?w=200&h=200&fit=crop&crop=top)`,
          }}
        />
      </div>
      <div>
        {person.slug && person.bio ? (
          <Link to={`/the-team/${person.slug.current}`}>
            <a className="c-btn--qua">
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
        {person.email && showEmail && (
          <p>
            <span>Email: </span>
            <a className="u-link-basic" href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export const PersonContactBasic = ({ person, cta = 'Questions about the course?' }) => {
  return (
    <div className="c-person-basic--contact">
      <div>
        <p>{person.position && `${person.position}`}</p>
        {person.slug && person.bio ? (
          <Link to={`/the-team/${person.slug.current}`}>
            <a className="c-btn--qua">
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
      </div>
      <div>
        <div
          {...classes('item-body-img', person.image ? 'light' : 'noimg')}
          style={{
            backgroundImage: `url(${person.image &&
              person.image.asset &&
              person.image.asset.url}?w=200&h=200&fit=crop&crop=top)`,
          }}
        />
      </div>

      {cta && person.email ? (
        <div>
          <p>{cta}</p>
          <p>
            <span>Contact </span>
            <a className="u-link-basic" href={`mailto:${person.email}`}>
              {person.firstName}
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
};
