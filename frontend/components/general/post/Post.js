import React from 'react';
import dateToString from '../../../helpers/dateToString';
import sanityImageLoader from '../../../helpers/sanityImageLoader';
import Image from 'next/image';
import { Topics } from '../topics/Topics';
import LinkToItem from '../LinkToItem';
import { getPostType } from '../../../helpers/getRouteByType';
import PropTypes from 'prop-types';
import TextClamp from 'react-string-clamp';
import { imgLoader } from '../../../helpers/imgloader';
import { Document, Page } from 'react-pdf/build/entry.noworker';

export const POST_TYPE = {
  SMALL: 'small', // collapsable in mobile view/normal in desktop
  BLOG: 'blog', // special post for blogs
  PUBLICATION: 'publication', // special post for publication
  LARGE: 'large', // large in desktop, full with image in mobile
  CARD: 'card', // render BlueCard onstead of Post
  SEARCH: 'search', // displaying in search results
  PUBLICATIONS: 'publications', // displaying in publications page results
};
const ellipsizeLines = {
  [POST_TYPE.SMALL]: 4,
  [POST_TYPE.BLOG]: 3,
  [POST_TYPE.PUBLICATION]: 3,
  [POST_TYPE.LARGE]: 33,
  [POST_TYPE.SEARCH]: 5,
  [POST_TYPE.PUBLICATIONS]: 3,
};

const standFirstLines = {
  [POST_TYPE.SMALL]: 3,
  [POST_TYPE.BLOG]: 3,
  [POST_TYPE.PUBLICATION]: 3,
  [POST_TYPE.LARGE]: 33,
  [POST_TYPE.SEARCH]: 4,
  [POST_TYPE.PUBLICATIONS]: 2,
};
const renderImage = type => {
  switch (type) {
    case [POST_TYPE.PUBLICATION]:
      return false;
    default:
      return true;
  }
};

const fullTitle = ({ title, subtitle }) => {
  if (title && subtitle) {
    return '.!?'.includes(title.slice(-1)) ? `${title} {subtitle}` : `${title}. ${subtitle}`;
  }
  return title;
};

export const Post = ({ post, type, placeholder, showImage = true }) => {
  return (
    <div className={`c-post ${type} ${type === 'large' ? 'u-sticky' : ''}`}>
      {type === 'search' && (post.pdfFile || post.legacypdf) && (
        <div className="pdf-preview">
          <Document file={post.pdfFile || post.legacypdf}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
      <div>
        <LinkToItem type={post._type} slug={post.slug || post.url}>
          <a className="c-post__link u-fake-anchor">
            {showImage && post.imageUrl && renderImage(type) ? (
              <div className={`c-post__post-image ${type} u-overlay--light-blue`}>
                <Image
                  loader={sanityImageLoader}
                  src={post.imageUrl}
                  alt=""
                  loading="lazy"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <div className="c-post__post-image u-overlay--light-blue">
                <Image
                  loader={imgLoader}
                  src={placeholder}
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
                <TextClamp text={fullTitle(post) || post.topicTitle} lines={ellipsizeLines[type]} />
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
        {post.filedUnderTopicNames && (
          <Topics title={false} topics={post.filedUnderTopicNames} hr={false} />
        )}
      </div>
    </div>
  );
};

Post.defaultProps = {
  type: POST_TYPE.BLOG,
  post: {},
  placeholder: '',
};

Post.propTypes = {
  type: PropTypes.string,
  post: PropTypes.any,
  placeholder: PropTypes.string,
};
