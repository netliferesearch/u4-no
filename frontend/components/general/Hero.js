import React from 'react';
import Image from 'next/image';
import sanityImageLoader from '../../helpers/sanityImageLoader';
import { Topics } from '../../components/general/topics/Topics';
import { BreadCrumbV2 } from '../../components/general/BreadCrumbV2';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';
import { PageIntro } from './PageIntro';

export const Hero = ({
  contentType = '',
  image = {},
  title,
  text,
  topics,
  parentSlug = '',
  parentTitle = '',
  grandParentSlug = '',
  grandParentTitle = '',
  onDark = true,
}) => {
  return (
    <div className="c-hero">
      {image && image.asset ? (
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
      ) : (
        <div className={` ${onDark ? 'c-hero-image u-bg--dark-blue' : ''}`} />
      )}
      <div className="c-hero__content o-wrapper-medium">
        <BreadCrumbV2
          title={parentTitle}
          parentSlug={parentSlug}
          grandParentSlug={grandParentSlug}
          grandParentTitle={grandParentTitle}
          home
          onDark={onDark}
        />
        <div className="c-hero__text">
          {contentType && (
            <h4
              className={`u-secondary-heading u-secondary-h4 u-detail--blue--small ${
                onDark ? 'u-text--white' : ''
              }`}
            >
              {contentType}
            </h4>
          )}
          <div className="c-hero__row">
            <PageIntro title={title} text={text} onDark={onDark} />
            {topics.length > 0 ? (
              <Topics title="Related topics" topics={topics} hr onDark={onDark} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
