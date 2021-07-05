import React from 'react';
import dateToString from '../../helpers/dateToString';
import LinkToItem from '../LinkToItem';
import { BlogAuthorsShortList } from './blog/BlogAuthorsShortList';
import { Topics } from './Topics';

export const FeaturedPost = ({ featured }) => {
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
              <h4 className="u-secondary-heading">Featured publication</h4>
            </div>
            <div>
              <div>
                {publication.topics &&
                  <Topics title={false} topics={publication.topics} hr={false} linkType={'5'} />}
              </div>
              <h3 className="u-primary-heading">{publication.title}</h3>
              <p className="c-featured-post__intro">{publication.standfirst}</p>
              <p className="c-featured-post__name">
                {publication.authors.length > 0 ? (
                  <BlogAuthorsShortList authors={publication.authors} />
                ) : null}
              </p>
              <p className="c-featured-post__date">
                {publication.date ? dateToString({ start: publication.date.utc }) : null}
              </p>
            </div>
          </div>
        </a>
      </LinkToItem>
    </div>
  );
};

// import React from 'react';
// import dateToString from '../../helpers/dateToString';
// import BEMHelper from 'react-bem-helper';
// import { Link } from '@reach/router';

// const FeaturedPosts = ({ featured }) => {
//   const classes = BEMHelper({ name: 'frontpage-section', prefix: 'c-' });
//   const { publication } = featured;
//   const blog = featured.blog[0];
//   const blogLarge = featured.blog[1];
//   //console.log(publication.slug)
//   return (
//     <div className="c-frontpage-section__content c-frontpage-section__featured">
//       {blog && (
//         <div className="col">
//           <div
//             className="post-image"
//             style={{ backgroundImage: `url('${blog ? blog.imageUrl : ''}?w=700')` }}
//           />
//           <div className="text">
//             <h6 {...classes('publication-type')}>Featured blog post</h6>
//             <a href={`blog/${blog.slug}`} {...classes('publication-headline')}>
//               <h3 {...classes('publication-headline')}>{blog.title}</h3>
//             </a>
//             <p {...classes('publication-intro')}>{blog.standfirst}</p>
//             <p {...classes('date')}>{dateToString({ start: blog.date.utc })}</p>
//             <div {...classes('topic')}>
//               {blog.topics &&
//                 blog.topics.map((topic, index) => {
//                   return (
//                     <span className="topic" key={index}>
//                       {topic.title}
//                     </span>
//                   );
//                 })}
//             </div>
//           </div>
//           <hr className="u-section-underline" />
//         </div>
//       )}
//       {publication && (
//         <div className="col">
//           <div
//             className="post-image"
//             style={{ backgroundImage: `url('${publication ? publication.imageUrl : ''}?w=700')` }}
//           />
//           <div className="text">
//             <h6 {...classes('publication-type')}>Featured publication</h6>
//             <a href={`publications/${publication.slug}`} {...classes('publication-headline')}>
//               <h3 {...classes('publication-headline')}>{publication.title}</h3>
//             </a>
//             <p {...classes('publication-intro')}>{publication.standfirst}</p>
//             <p {...classes('date')}>{dateToString({ start: publication.date.utc })}</p>
//             <div {...classes('topic')}>
//               {publication.topics &&
//                 publication.topics.map((topic, index) => {
//                   return (
//                     <span className="topic" key={index}>
//                       {topic.title}
//                     </span>
//                   );
//                 })}
//             </div>
//           </div>
//           <hr className="u-section-underline" />
//         </div>
//       )}
//       {blogLarge ? (
//         <div className="col full-width-post">
//           <div
//             className="post-image"
//             style={{
//               backgroundImage: `url('${blogLarge ? blogLarge.imageUrl : ''}?w=1600&fit=max')`,
//             }}
//           />
//           <div className="text">
//             <h6 {...classes('publication-type')}>Featured blog post</h6>
//             <a href={`blog/${blogLarge.slug}`} {...classes('publication-headline')}>
//               <h3 {...classes('publication-headline')}>{blogLarge.title}</h3>
//             </a>
//             <p {...classes('publication-intro')}>{blogLarge.standfirst}</p>
//             <p {...classes('date')}>{dateToString({ start: blogLarge.date.utc })}</p>
//             <div {...classes('topic')}>
//               {blogLarge.topics &&
//                 blogLarge.topics.map((topic, index) => {
//                   return (
//                     <span className="topic" key={index}>
//                       {topic.title}
//                     </span>
//                   );
//                 })}
//             </div>
//           </div>
//           <hr className="u-section-underline" />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default FeaturedPosts;
