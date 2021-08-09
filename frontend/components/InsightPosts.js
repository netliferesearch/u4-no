import React from 'react';
import dateToString from '../helpers/dateToString';
import LinkToItem from './LinkToItem';
import { BlogAuthorsShortList } from './blog/BlogAuthorsShortList';
import { SectionIntro } from './SectionIntro';
import { Topics } from './Topics';
import { getPostType } from '../helpers/getRouteByType';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ArrowNext } from './icons/ArrowNext';

export const PostList = ({ insights }) => {
  const responsive = {
    0: { items: 1.2 },
    568: { items: 1.2 },
    980: { items: 3 },
  };

  const renderDotsItem = ({ isActive }) => {
    return isActive ? (
      <div className="c-carousel-dots-active" />
    ) : (
      <div className="c-carousel-dots-deactivated" />
    );
  };
  return (
    <div className="c-post-list c-post-list--2col">
      <SectionIntro
        title="Latest from the blog"
        // text="Lorem ipsum ipsum lorem"
        slug="/blog"
        label="View blog"
      />

      {/* <div className="c-post-list__row c-post-list__content"> */}
      {/* <div className="c-post-list__col--1">
          {firstPost ? (
            <LinkToItem type={firstPost._type} slug={firstPost.slug}>
              <a className={`c-featured-post__item c-featured-post__item--big`}>
                {firstPost.imageUrl ? (
                  <div
                    className="c-featured-post__featured-image"
                    style={{
                      backgroundImage: `url(${
                        firstPost.imageUrl
                      }?w=523&h=408&fit=crop&crop=focalpoint)`,
                    }}
                  />
                ) : null}
                <div className="c-featured-post__text">
                  <div>
                    <div>
                      {firstPost.topics && (
                        <Topics title={false} topics={firstPost.topics} hr={false} linkType={'5'} />
                      )}
                    </div>
                    <h3 className="u-primary-heading">{firstPost.title}</h3>
                    <p className="c-featured-post__intro u-body--grey">{firstPost.standfirst}</p>
                    <p className="c-featured-post__name">
                      {firstPost.authors.length > 0 ? (
                        <BlogAuthorsShortList authors={firstPost.authors} />
                      ) : null}
                    </p>
                    <p className="c-featured-post__date u-body--small">
                      {firstPost.date ? dateToString({ start: firstPost.date.utc }) : null}
                    </p>
                  </div>
                </div>
              </a>
            </LinkToItem>
          ) : null}
        </div> */}

      <div className="c-post-list__col">
        <AliceCarousel
          responsive={responsive}
          renderDotsItem={renderDotsItem}
          disableButtonsControls
        >
          {insights
            ? insights.map((post, index, { length }) => (
                <div key={index} className="c-blog-post__item-box">
                  <LinkToItem type={post._type} slug={post.slug} key={index}>
                    <a className={`c-blog-post__item c-blog-post__item--small`}>
                      {post.imageUrl ? (
                        <div
                          className="c-featured-post__featured-image"
                          style={{
                            backgroundImage: `url(${
                              post.imageUrl
                            }?w=523&h=408&fit=crop&crop=focalpoint)`,
                          }}
                        />
                      ) : null}
                      <div className="c-featured-post__text">
                        <div>
                          <div>
                            {getPostType(post) && (
                              <h5 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
                                {getPostType(post)}
                              </h5>
                            )}
                            <h4 className="u-primary-heading">{post.title}</h4>
                          </div>
                          <p className="c-featured-post__intro u-body--grey">{post.standfirst}</p>
                          <p className="c-featured-post__date u-body--small">
                            {post.date ? dateToString({ start: post.date.utc }) : null}
                          </p>
                        </div>
                      </div>
                    </a>
                  </LinkToItem>

                  <div>
                    {post.topics && (
                      <Topics title={false} topics={post.topics} hr={false} linkType={'5'} />
                    )}
                  </div>
                </div>
              ))
            : null}
        </AliceCarousel>
        <div className="c-view-all">
          <a className="c-topic-view-all" href="/blog">
            View all
            <ArrowNext />
          </a>
        </div>
      </div>
    </div>
    // </div>
  );
};

// const InsightPosts = ({ insights }) => {
//   const classes = BEMHelper({ name: 'frontpage-section', prefix: 'c-' });
//   return (
//     <div className="c-frontpage-section__content c-frontpage-section__insights">
//       <div className="sidebar">
//         <h2 className="u-blue-underline u-navy-big-headline">Insights from our blog</h2>
//         <div className="bottom">
//           <p>A nice sentence about our blog – what is the purpose and what readers can expect.</p>
//           <a
//             href="/blog"
//             {...classes('view-all')}
//           >
//             View all <img alt="Close icon" src="/static/arrow-right-slim.svg" />
//           </a>
//         </div>
//       </div>
//       <div className="col">
//         {insights.map((post, index) => (
//           <div className="col row" key={index}>

//             <div className="text">
//               <h6 {...classes('publication-type')}>Blog post</h6>
//               <a href={`blog/${post.slug}`} {...classes('publication-headline')}>
//                 <h3 {...classes('publication-headline')}>{post.title}</h3>
//               </a>
//               <p {...classes('publication-intro')}>{post.standfirst}</p>
//               <p {...classes('date')}>{dateToString({ start: post.date.utc })}</p>
//               <div {...classes('topic')}>
//                 {post.topics &&
//                   post.topics.map((topic, index) => {
//                     return (
//                       <span className="topic" key={index}>
//                         {topic.title}
//                       </span>
//                     );
//                   })}
//               </div>
//             </div>

//             <div
//               className="post-image"
//               style={{ backgroundImage: `url('${post.imageUrl ? post.imageUrl : ''}?w=800')` }}
//             />

//             <hr className="u-section-underline" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InsightPosts;
