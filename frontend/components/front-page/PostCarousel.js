"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ArrowNext } from '../icons/ArrowNext';
import { Post, POST_TYPE } from '../general/post/Post';
import PropTypes from 'prop-types';
import { ArrowCarousel } from '../icons/ArrowCarousel';
import { BlueCard, CARD_TYPE, CONTENT_BY_TYPE } from '../general/blue-card/BlueCard';
import { getPlaceholder } from '../../helpers/imgloader';
import Link from 'next/link';

const columnsByType = {
  [POST_TYPE.SMALL]: 3,
  [POST_TYPE.BLOG]: 3,
  [POST_TYPE.PUBLICATION]: 4,
  [POST_TYPE.PUBLICATIONS]: 4,
  [POST_TYPE.LARGE]: 3,
  [POST_TYPE.CARD]: 3,
};

export const PostCarousel = ({
  posts,
  type,
  buttonPath,
  title,
  underTitle,
  minPosts,
  publications,
}) => {
  const responsive = {
    0: { items: 1.2 },
    568: { items: 2.2 },
    980: { items: columnsByType[type] },
  };
  const items =
    posts &&
    posts.map((post, index) =>
      type === POST_TYPE.CARD ? (
        <BlueCard
          key={post._id}
          type={CARD_TYPE.MEDIUM}
          post={post}
          content={CONTENT_BY_TYPE.PUBLICATION}
        />
      ) : (
          <Post
            key={post._id}
            type={type}
            post={post}
            placeholder={getPlaceholder(index)}
            publications
          />
      )
    );
  const renderDotsItem = ({ isActive }) => {
    return isActive ? (
      <div className="c-carousel__dots--active" />
    ) : (
      <div className="c-carousel__dots--deactivated" />
    );
  };
  const renderPrevButton = ({ isDisabled }) => (
    <button className="c-carousel__btn c-carousel__btn--prev" disabled={isDisabled}>
      <ArrowCarousel />
    </button>
  );
  const renderNextButton = ({ isDisabled }) => (
    <button className="c-carousel__btn c-carousel__btn--next" disabled={isDisabled}>
      <ArrowCarousel />
    </button>
  );
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if ( typeof window !== 'undefined' ) {
      setIsClient(true);
    }
  }, []);

  return (
    <div
      className={`c-post-list c-carousel c-post-list--2col c-post-list--column-${
        columnsByType[type]
      }`}
    >
      <div className="o-wrapper-medium">
        {title && <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">{title}</h4>}
      </div>
      <div
        className={`c-post-list__col ${items.length < minPosts ? 'c-post-list__col--static' : ''}`}
      >
        <AliceCarousel
          items={items}
          responsive={responsive}
          innerWidth={isClient ? undefined : 980} // default value for SSR 
          renderDotsItem={renderDotsItem}
          disableButtonsControls={items.length > minPosts ? false : true}
          disableDotsControls={items.length > minPosts ? false : true}
          renderPrevButton={renderPrevButton}
          renderNextButton={renderNextButton}
        />
        {type != 'publications' && (
          <div className="o-wrapper-medium c-view-all">
            <Link href={buttonPath} className="c-btn c-btn--link">
              View all<ArrowNext />

            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

PostCarousel.propTypes = {
  posts: PropTypes.array,
  type: PropTypes.string,
  buttonPath: PropTypes.string,
  title: PropTypes.string,
  minPosts: PropTypes.number,
};
