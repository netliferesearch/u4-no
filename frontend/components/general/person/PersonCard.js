import React from 'react';
import Link from 'next/link';
import sanityImageLoader from '../../sanityImageLoader';
import Image from 'next/image';
import { EmailIconSmall } from '../../icons/SocialIcons';

export const PersonCard = ({ person }) => {
  console.log(person.image.asset.url);
  return (
    <div className="c-person-card__wrapper">
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
      <h5 className="u-text--dark-blue">{`${person.firstName} ${person.surname}`}</h5>
      <div>{person.position}</div>
      <div className="c-person-card__email">
        <div className="icon">
          <EmailIconSmall />
        </div>
        <div className="adress">{`${person.email}`}</div>
      </div>
    </div>
  );
};
