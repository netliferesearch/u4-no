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
      <div className="c-person-basic__text">
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
        {/* <p className="u-heading--5">{person.position && `${person.position}`}</p> */}
        {person.slug && person.bio ? (
          <Link to={`/the-team/${person.slug.current}`}>
            <a className="c-btn--qua">
              <span {...classes('item-title--name')}>
                {person.firstName && person.firstName} {person.surname && person.surname}
              </span>
            </a>
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
          <p className="u-grey-text">{cta}</p>
          <p className="u-grey-text">
            <span>Contact </span>
            <a className="u-grey-a" href={`mailto:${person.email}`}>
              <span>{person.firstName}</span>
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export const CourseCoordinator = ({ person, cta = 'Questions about the course?', url = '' }) => {
  return (
    <div className="c-person-basic--contact c-person-basic--coordinator">
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
        <h3 className="u-heading--5">Course coordinator:</h3>
        {person.slug && person.bio ? (
          <Link to={`/the-team/${person.slug.current}`}>
            <a className="c-btn--qua">
              <span {...classes('item-title--name')}>
                {person.firstName && person.firstName} {person.surname && person.surname}
              </span>
            </a>
          </Link>
        ) : (
          <span {...classes('item-title--name')}>
            {person.firstName && person.firstName} {person.surname && person.surname}
          </span>
        )}
        {cta && person.email ? (
          <div>
            <p className="u-grey-text">{cta}</p>
            <p className="u-grey-text">
              <span>Contact </span>
              <a className="u-grey-a" href={`mailto:${person.email}`}>
                <span>{person.firstName}</span>
              </a>
            </p>
          </div>
        ) : null}
        {url ? (
          <div className="">
            <a href={url} target="_blank" className="c-btn c-btn--sec">
              <span>View course leaflet (PDF)</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};
