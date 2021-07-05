import React from 'react';
import dateToString from '../helpers/dateToString';
import LinkToItem from './LinkToItem';
import { BlogAuthorsShortList } from './blog/BlogAuthorsShortList';
import { Topics } from './Topics';
import { getPostType } from '../helpers/getRouteByType';

export const FeaturedPost = ({ featured }) => {
  console.log(featured);
  const { publication } = featured;
  return (
    <div className="c-featured-post">
      <LinkToItem type={publication._type} slug={publication.slug}>
        <a className={`c-featured-post__item c-featured-post__item--full-width`}>
          {publication.imageUrl ? (
            <div
              className="c-featured-post__featured-image"
              style={{
                backgroundImage: `url(${
                  publication.imageUrl
                }?w=523&h=408&fit=crop&crop=focalpoint)`,
              }}
            />
          ) : null}
          <div className="c-featured-post__text">
            <div>
              <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">
                Featured content
              </h4>
            </div>
            <div>
              {getPostType(publication) && (
                <h5 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
                  {getPostType(publication)}
                </h5>
              )}

              <h4 className="u-primary-heading">{publication.title}</h4>
              <p className="c-featured-post__intro u-body--grey">{publication.standfirst}</p>
              {/* <p className="c-featured-post__name">
                {publication.authors.length > 0 ? (
                  <BlogAuthorsShortList authors={publication.authors} />
                ) : null}
              </p> */}
              <p className="c-featured-post__date u-body--small">
                {publication.date ? dateToString({ start: publication.date.utc }) : null}
              </p>
              <div>
                {publication.topics && (
                  <Topics title={false} topics={publication.topics} hr={false} linkType={'5'} />
                )}
              </div>
            </div>
          </div>
        </a>
      </LinkToItem>
    </div>
  );
};
