import React from 'react';
import Link from 'next/link';
import sanityImageLoader from '../../../helpers/sanityImageLoader';
import Image from 'next/image';
import { SocialFollow } from '../social/SocialFollow';
import { socialItems } from '../social/socialItems';

export const PERSON_CARD_TYPE = {
  IMAGE_TOP: 'image-top',
  IMAGE_LEFT: 'image-left',
  PROFILE: 'profile',
};

export const PersonCard = ({ person, type }) => {
  return (
    <div className={`c-person-card__wrapper c-person-card--${type}`}>
      {type === PERSON_CARD_TYPE.PROFILE ? (
        <div className="c-person-card__image-wrapper">
          {person.image?.asset?.url ? (
          <Image
            loader={sanityImageLoader}
            src={person.image.asset.url}
            loading="lazy"
            width="176"
            height="176"
            objectFit="cover"
            objectPosition="top center"
            crop="focalpoint"
            auto="format"
            fit="crop"
          />
          ) : ( null )}
        </div>
      ) : (
        <Link href={`/the-team/${person.slug.current}`}>
          <a>
            <div className="c-person-card__image-wrapper">
            {person.image?.asset?.url ? (
              <Image
                loader={sanityImageLoader}
                src={person.image.asset.url}
                loading="lazy"
                width="176"
                height="176"
                objectFit="cover"
                objectPosition="top center"
                crop="focalpoint"
                auto="format"
                fit="crop"
              />
              ) : ( null )}
            </div>
          </a>
        </Link>
      )}
      <div className="c-person-card__info">
        {type === PERSON_CARD_TYPE.PROFILE && (
          <div className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
            U4 team member
          </div>
        )}
        <div>
          {type === PERSON_CARD_TYPE.PROFILE ? (
            <h2>{`${person.firstName} ${person.surname}`}</h2>
          ) : (
            <Link href={`/the-team/${person.slug.current}`}>
              <a>
                <h5 className="u-text--dark-blue">{`${person.firstName} ${person.surname}`}</h5>
              </a>
            </Link>
          )}
          {person.position && (
            <span className="c-person-card__position u-text--grey">{person.position}</span>
          )}
        </div>
        {person.email && (
          <a href={`mailto:${person.email}`}>
            <div className="c-person-card__email">
              <div className="c-person-card__adress">{`Email: ${person.email}`}</div>
            </div>
          </a>
        )}
        {type === PERSON_CARD_TYPE.PROFILE && (
          <div className=" c-person-card__social">
            <SocialFollow
              twitter={person.twitter}
              linkedIn={person.linkedIn}
              faceBook={person.faceBook}
              email={person.email}
              items={socialItems}
            />
          </div>
        )}
      </div>
    </div>
  );
};
