import React from 'react';
import BEMHelper from 'react-bem-helper';
import Link from 'next/link';

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
      <div className="c-person-basic__text">
        {person.slug && person.bio ? (
          <Link href={`/the-team/${person.slug.current}`} className="c-btn--link">
            <p {...classes('item-title--name')}>
              {person.firstName && person.firstName} {person.surname && person.surname}
            </p>
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
            <a className="" href={`mailto:${person.email}`}>
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
        {/* <p className="u-secondary-heading">{person.position && `${person.position}`}</p> */}
        {person.slug && person.bio ? (
          <Link href={`/the-team/${person.slug.current}`} className="c-btn--link">
            <span {...classes('item-title--name')}>
              {person.firstName && person.firstName} {person.surname && person.surname}
            </span>
          </Link>
        ) : (
          <span {...classes('item-title--name')}>
            {person.firstName && person.firstName} {person.surname && person.surname}
          </span>
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
          <p className="u-text--grey">{cta}</p>
          <p className="u-text--grey">
            <span>Contact </span>
            <a className="" href={`mailto:${person.email}`}>
              <span>{person.firstName}</span>
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
};
