import React from 'react';
import dateToString from '../helpers/dateToString';
import LinkToItem from './LinkToItem';
import { BlogAuthorsShortList } from './blog/BlogAuthorsShortList';
import { Topics } from './Topics';
import { getPostType } from '../helpers/getRouteByType';

export const FeaturedPost = ({ featured }) => {
  return (
    <div>
      <div>
        <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Featured content</h4>
      </div>
      <div className="c-featured-post__list">
        {featured
          ? featured.map((post, index) => (
              <div key={index} className="c-featured-post">
                <LinkToItem type={post._type} slug={post.slug}>
                  <a className={`c-featured-post__item ${index === 0 ? "c-featured-post__item--full-width" : ""}`}>
                    {post.imageUrl ? (
                      <div
                        className="c-featured-post__featured-image"
                        style={{
                          backgroundImage: `url(${
                            post.imageUrl
                          }?w=796&h=424&fit=crop&crop=focalpoint)`,
                        }}
                      />
                    ) : null}
                    <div className="c-featured-post__text">
                      <div>
                        {getPostType(post) && (
                          <h5 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
                            {getPostType(post)}
                          </h5>
                        )}

                        <h4 className="u-primary-heading">{post.title}</h4>
                        <p className="c-featured-post__intro u-body--grey">{post.standfirst}</p>
                        {/* <p className="c-featured-post__name">
                    {post.authors.length > 0 ? (
                      <BlogAuthorsShortList authors={post.authors} />
                    ) : null}
                  </p> */}
                        <p className="c-featured-post__date u-body--small">
                          {post.date ? dateToString({ start: post.date.utc }) : null}
                        </p>
                        <div>
                          {post.topics && (
                            <Topics title={false} topics={post.topics} hr={false} linkType={'5'} />
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </LinkToItem>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
