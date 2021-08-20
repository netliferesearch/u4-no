import React from 'react';
import Image from 'next/image';
import sanityImageLoader from '../../components/sanityImageLoader';
import { Topics } from '../../components/general/topics/Topics';
import { BreadCrumbV2 } from '../../components/general/BreadCrumbV2';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';
import { PageIntro } from './PageIntro';

export const Hero = ({ contentType = '', image = {}, title, text, topics }) => {
  return (
    <div className="c-hero">
      {image ? (
        <figure className="c-hero-image">
          <Image
            loader={sanityImageLoader}
            src={image.asset.url}
            alt={image.asset.altText ? image.asset.altText : ''}
            layout="fill"
            objectFit="cover"
            objectPosition="center 30%"
            priority="true"
          />
          <PhotoCaptionCredit image={image} showCaption={false} />
        </figure>
      ) : null}
      <div className="c-hero__content o-wrapper-medium">
        <BreadCrumbV2 title={`Topics`} parentSlug={'/topics'} home={true} onDark={true} />
        <div className="c-hero__text">
          {contentType && (
            <h4
              className={`u-secondary-heading u-secondary-h4 u-detail--blue--small u-text--white`}
            >
              {contentType}
            </h4>
          )}
          <div className="c-hero__row">
            <PageIntro title={title} text={text} onDark={true} />
            <Topics title="Related topics" topics={topics} hr={true} onDark={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
