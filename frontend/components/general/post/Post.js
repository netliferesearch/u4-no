import React from 'react';
import dateToString from '../../../helpers/dateToString';
import sanityImageLoader from '../../sanityImageLoader';

import Image from 'next/image';
import { Topics } from '../../Topics';
import LinkToItem from '../../LinkToItem';
import { getPostType } from '../../../helpers/getRouteByType';
import PropTypes from 'prop-types';

export const POST_SIZE = {
  SMALL: 'small', //collapsable in mobile view/normal in desktop
  NORMAL: 'normal', //normal size both in mobile and desktop
  LARGE: 'large', //large in desktop, full with image in mobile
};

export const Post = ({ post, size }) => {
  return <LinkToItem type={post._type} slug={post.slug}>
    <a className={`c-post ${size}`}>

        {post.imageUrl && <div className="c-post__post-image">
          <Image
            loader={sanityImageLoader}
            src={post.imageUrl}
            alt=""
            loading="lazy"
            layout="fill"
            objectFit="cover"
          />
        </div>}
        <div className="c-post__post-info">
          {getPostType(post) && <div
            className="c-post__post-type u-secondary-heading u-secondary-h4 u-detail--blue--small">{getPostType(post)}</div>}
          <h4 className="c-post__title">{post.title}</h4>
          <div className="c-post__article-content u-body">{post.standfirst}</div>
          <div className="c-post__date u-body--small">{dateToString({ start: post.date.utc })}</div>
        </div>
        {post.topics && (
          <Topics title={false} topics={post.topics} hr={false} linkType={'5'}/>
        )}
    </a>
  </LinkToItem>;
};

Post.defaultProps = {
  size: POST_SIZE.NORMAL,
  post: {},
};

Post.propTypes = {
  size: PropTypes.string,
  post: PropTypes.any,
};