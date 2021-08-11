import React from 'react';
import dateToString from '../../../helpers/dateToString';
import sanityImageLoader from '../../sanityImageLoader';

import Image from 'next/image';
import { Topics } from '../../Topics';
import LinkToItem from '../../LinkToItem';
import { getPostType } from '../../../helpers/getRouteByType';

export const POST_SIZE = {
  SMALL:'small', //collapsable in mobile view/normal in desktop
  NORMAL:'normal', //normal size both in mobile and desktop
  LARGE:'large', //large in desktop, full with image in mobile
}

export const Post = ({ post, size }) => {
  return <LinkToItem type={post._type} slug={post.slug}>
    <div className={`post ${size}`}>
      <div className={`post-image`}>
        <Image
          loader={sanityImageLoader}
          src={post.imageUrl}
          alt=""
          loading="lazy"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="post-info">
        {getPostType(post) && <div
          className="u-secondary-heading u-secondary-h4 u-detail--blue--small post-type">{getPostType(post)}</div>}
        <h4 className="post-title">{post.title}</h4>
        <div className="u-body articleContent">{post.standfirst}</div>
        <div className="articleDate u-body--small">{dateToString({ start: post.date.utc })}</div>
      </div>
      {post.topics && (
        <Topics title={false} topics={post.topics} hr={false} linkType={'5'}/>
      )}
    </div>
  </LinkToItem>;
};