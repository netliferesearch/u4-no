import React from 'react';
import LinkToItem from '../';
import dateToString from '../../helpers/dateToString';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { SectionIntro } from './SectionIntro';
import { Topics } from './Topics';
//import useMediaQuery from '../../helpers/useMediaQuery';

export const CardList = ({ resources = [], alt = false }) => {
  return (
    <div className="c-card-list">
      <SectionIntro
        title="U4 publications"
        text="A sentence on the vlaue of publications and how to use them"
        slug="/search?filters=publications-only&sort=year-desc"
        label="View all publications"
      />
      <div className="c-card-list__row">
        {resources
          .map(resource => (resource.target ? resource.target : resource))
          .filter(({ _id = '' }) => _id)
          // loops through lists and return only a set with resources with unique ids
          .reduce((x, y) => (x.map(({ _id }) => _id).includes(y._id) ? x : [...x, y]), [])
          .map(
            ({
              title = '',
              _id = '',
              _type = '',
              slug = '',
              date = '',
              standfirst = '',
              topics = [],
              pdfFile = '',
            }) => (
              <div className="c-card-list__item" key={_id}>
                <LinkToItem type={_type} slug={slug}>
                  <a>
                    <div className="c-card-list__pdf-container">
                      {pdfFile && (
                        <div className="c-card-list__pdf-preview">
                          {
                            //useMediaQuery('tablet') && (
                            <Document file={pdfFile}>
                              <Page pageNumber={1} />
                            </Document>
                            //)
                          }
                        </div>
                      )}
                    </div>
                    <div className="c-card-list__text">
                      <div>
                        <div>
                          {topics && (
                            <Topics title={false} topics={topics} hr={false} linkType={'5'} />
                          )}
                        </div>
                        <h3 className="u-heading--3">{title}</h3>
                        <p className="c-featured-post__intro">{standfirst}</p>
                      </div>
                      <div>
                        <p className="c-featured-post__date">
                          {date ? dateToString({ start: date.utc }) : null}
                        </p>
                      </div>
                    </div>
                  </a>
                </LinkToItem>
              </div>
            )
          )}
      </div>
    </div>
  );
};

// import React from 'react';
// import { LinkToItem } from '../';
// import BEMHelper from 'react-bem-helper';
// import dateToString from '../../helpers/dateToString';
// import { Document, Page } from 'react-pdf/build/entry.noworker';
// //import useMediaQuery from '../../helpers/useMediaQuery';

// const RecentPublications = ({ resources = [], alt = false }) => {
//   const classes = BEMHelper({ name: 'frontpage-section', prefix: 'c-' });
//   return (
//     <div {...classes('publications')}>
//       <h2 className="u-blue-underline u-navy-big-headline">Recent publications</h2>
//       <hr className="u-section-underline" />
//       {resources
//         .map(resource => (resource.target ? resource.target : resource))
//         .filter(({ _id = '' }) => _id)
//         // loops through lists and return only a set with resources with unique ids
//         .reduce((x, y) => (x.map(({ _id }) => _id).includes(y._id) ? x : [...x, y]), [])
//         .map(
//           ({
//             title = '',
//             _id = '',
//             _type = '',
//             publicationType = '',
//             articleType = '',
//             slug = '',
//             date = '',
//             standfirst = '',
//             topics = [],
//             pdfFile = '',
//           }) => (
//             <div className="text" key={_id}>
//               <div className="left-side">
//                 <h6 {...classes('publication-type')}>
//                   {'Publication | '}
//                   {typeof publicationType === 'string' ? publicationType.substring(3) : ''}
//                   {!publicationType && typeof articleType === 'string'
//                     ? articleType.substring(3)
//                     : ''}
//                 </h6>
//                 <LinkToItem type={_type} slug={slug}>
//                   <a>
//                     <h3 {...classes('publication-headline')}>{title}</h3>
//                   </a>
//                 </LinkToItem>
//                 <p {...classes('publication-intro')}>{standfirst}</p>
//                 <p {...classes('date')}>{dateToString({ start: date.utc })}</p>
//                 <div {...classes('topic')}>
//                   {topics &&
//                     topics.map((topic, index) => {
//                       return (
//                         <span className="topic" key={index}>
//                           {topic.title}
//                         </span>
//                       );
//                     })}
//                 </div>
//               </div>
//               {pdfFile && (
//                 <div className="pdf-preview">
//                   {
//                     //useMediaQuery('tablet') && (
//                     <Document file={pdfFile}>
//                       <Page pageNumber={1} />
//                     </Document>
//                     //)
//                   }
//                 </div>
//               )}

//               <hr className="u-section-underline" />
//             </div>
//           )
//         )}
//       <h2 className="c-frontpage-section__cta">
//         <a href="/search?search=*" {...classes('view-all')}>
//           View all <img alt="Close icon" src="/static/arrow-right-slim.svg" />
//         </a>
//       </h2>
//     </div>
//   );
// };

// export default RecentPublications;
