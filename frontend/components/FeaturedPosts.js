import React from 'react';
import dateToString from '../helpers/dateToString';
import LinkToItem from './LinkToItem';
import { Topics } from './Topics';
import { getPostType } from '../helpers/getRouteByType';

export const FeaturedPost = ({ featured }) => {
  const firstPost = featured[0];
  return (
    <div>
      <div className="u-side-padding-mobile">
        <h4 className=" c-featured-title-text u-secondary-heading u-secondary-h1 u-detail--blue ">
          Featured content
        </h4>
      </div>
      <div className="c-featured-post__list">
        <div className="c-featured-post__list-box-big">
          {firstPost ? (
            <>
              <div className="c-featured-post">
                <LinkToItem type={firstPost._type} slug={firstPost.slug}>
                  <a className={`c-featured-first-post__item c-featured-post__item--big`}>
                    {firstPost.imageUrl ? (
                      <div
                        className="c-featured-first-post__featured-image"
                        style={{
                          backgroundImage: `url(${
                            firstPost.imageUrl
                          }?w=796&h=424&fit=crop&crop=focalpoint)`,
                        }}
                      />
                    ) : null}
                    <div className="c-featured-post__text c-featured-mobile-padding">
                      {/* <div className='c-featured-post__text-holder'> */}
                      {getPostType(firstPost) && (
                        <h5 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
                          {getPostType(firstPost)}
                        </h5>
                      )}

                      <h4 className="u-primary-heading">{firstPost.title}</h4>
                      <p className="c-featured-post__intro u-body--grey u-hidden--tablet">
                        {firstPost.standfirst}
                      </p>
                      {/* <p className="c-featured-post__name">
                 {post.authors.length > 0 ? (
                   <BlogAuthorsShortList authors={post.authors} />
                 ) : null}
               </p> */}
                      <p className="c-featured-post__date u-body--small">
                        {firstPost.date ? dateToString({ start: firstPost.date.utc }) : null}
                      </p>
                      {/* </div> */}
                    </div>
                  </a>
                </LinkToItem>
              </div>
              <div className="c-featured-mobile-padding">
                {firstPost.topics && (
                  <Topics title={false} topics={firstPost.topics} hr={false} linkType={'5'} />
                )}
              </div>
            </>
          ) : null}
        </div>
        <div className="c-featured-post__list-box-small">
          {featured.length > 2
            ? featured.map((post, index) =>
                index !== 0 ? (
                  <div key={index}>
                    <div className="c-featured-post">
                      <LinkToItem type={post._type} slug={post.slug}>
                        <a className={`c-featured-post__item c-featured-post__item--small`}>
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
                              <p className="c-featured-post__intro u-body--grey u-hidden--tablet">
                                {post.standfirst}
                              </p>
                              {/* <p className="c-featured-post__name">
                    {post.authors.length > 0 ? (
                      <BlogAuthorsShortList authors={post.authors} />
                    ) : null}
                  </p> */}
                              <p className="c-featured-post__date u-body--small u-hidden--tablet">
                                {post.date ? dateToString({ start: post.date.utc }) : null}
                              </p>
                            </div>
                          </div>
                        </a>
                      </LinkToItem>
                    </div>
                    <div className="u-hidden--tablet">
                      {post.topics && (
                        <Topics title={false} topics={post.topics} hr={false} linkType={'5'} />
                      )}
                    </div>
                  </div>
                ) : null
              )
            : null}
        </div>
      </div>
    </div>
  );
};
