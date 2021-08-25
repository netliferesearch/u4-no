import React from 'react';
import dateToString from '../../../helpers/dateToString';
import sanityImageLoader from '../../../helpers/sanityImageLoader';
import Image from 'next/image';
import { Topics } from '../topics/Topics';
import LinkToItem from '../LinkToItem';
import { getPostType } from '../../../helpers/getRouteByType';
import PropTypes from 'prop-types';
import TextClamp from 'react-string-clamp';

export const POST_TYPE = {
  SMALL: 'small', //collapsable in mobile view/normal in desktop
  BLOG: 'blog', //special post for blogs
  PUBLICATION: 'publication', //special post for publication
  LARGE: 'large', //large in desktop, full with image in mobile
};
const ellipsizeLines = {
  [POST_TYPE.SMALL]: 4,
  [POST_TYPE.BLOG]: 3,
  [POST_TYPE.PUBLICATION]: 3,
  [POST_TYPE.LARGE]: 33,
};

const standFirstLines = {
  [POST_TYPE.SMALL]: 3,
  [POST_TYPE.BLOG]: 3,
  [POST_TYPE.PUBLICATION]: 3,
  [POST_TYPE.LARGE]: 33,
};
const renderImage = type => {
  switch (type) {
    case [POST_TYPE.PUBLICATION]:
      return false;
    default:
      return true;
  }
};
export const Post = ({ post, type }) => {
  return (
    <div className={`c-post ${type} ${type === 'large' ? 'u-sticky' : ''}`}>
      <LinkToItem type={post._type} slug={post.slug}>
        <a className="c-post__link u-fake-anchor">
          {post.imageUrl && renderImage(type) && (
            <div className="c-post__post-image u-overlay--light-blue">
              <Image
                loader={sanityImageLoader}
                src={post.imageUrl}
                alt=""
                loading="lazy"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="c-post__post-info">
            {getPostType(post) && (
              <div className="c-post__post-type u-secondary-heading u-secondary-h4 u-detail--blue--small">
                {getPostType(post)}
              </div>
            )}
            <h4 className="c-post__title">
              <TextClamp text={post.title} lines={ellipsizeLines[type]} />
            </h4>
            {post.standfirst && (
              <div className="c-post__article-content u-body">
                <TextClamp text={post.standfirst} lines={standFirstLines[type]} />
              </div>
            )}

            {post.date ? (
              <div className="c-post__date u-body--small">
                {dateToString({ start: post.date.utc })}
              </div>
            ) : null}
          </div>
        </a>
      </LinkToItem>
      {post.topics && <Topics title={false} topics={post.topics} hr={false} />}
    </div>
  );
};

Post.defaultProps = {
  type: POST_TYPE.NORMAL,
  post: {},
};

Post.propTypes = {
  type: PropTypes.string,
  post: PropTypes.any,
};
