import React from 'react';
import Link from 'next/link';
import { SectionIntro } from './SectionIntro';
import { ArrowNext } from './icons/ArrowNext';
import dateToString from '../helpers/dateToString';
import { BlueCard } from './general/blue-card/BlueCard';

export const TopicCardList = ({ topics }) => {
  return (
    <div className="c-topic-card-list">
      <SectionIntro
        title="Corruption by topic"
        // text="A sentence on contextualising the value/use of U4 topics"
        label="View all topics"
        slug="/topics"
      />
      <ul>
        {topics.map((post, index) => (
          <BlueCard post={post} key={index} />
          // <li key={topic._id} className="c-topic-card-list__item">
          //   <Link href={`/topics/${topic.slug.current}`}>
          //     <a>
          //       <div className="c-topic-card-list__item-text">
          //         <div>
          //           <h2 className="u-secondary-h2 u-text--white">{topic.title}</h2>
          //           <p className="u-body u-text--grey c-topic-paragraph">{topic.longTitle}</p>
          //         </div>
          //         <p className="c-topic__date  u-body--small">
          //           {topic._updatedAt
          //             ? 'Updated' + ' ' + dateToString({ start: topic._updatedAt })
          //             : null}
          //         </p>
          //         <div>
          //           {/* <Link href={`/topics/${topic.slug.current}`}> */}
          //           {/* <div className="c-btn c-btn--sec">
          //             <span>Learn more</span>
          //           </div> */}
          //           {/* </Link> */}
          //         </div>
          //       </div>
          //     </a>
          //   </Link>
          // </li>
        ))}
      </ul>
      <div className="c-topic-view-all-holder">
        <a className="c-topic-view-all" href="/topics">
          View All
          <ArrowNext />
        </a>
      </div>
    </div>
  );
};

// import React from 'react';
// import { Link } from '../../routes';

// const CorruptionByTopic = ({ topics }) => {
//   return (
//     <div className="c-frontpage-blue-section__content c-frontpage-blue-section__by-topic">
//       <h2 className="u-blue-underline u-navy-big-headline">Corruption by topic</h2>

//       <div className="cols">
//         <div className="col">
//           <ul>
//             {topics.slice(0, 6).map((topic, index) => (
//               <li key={topic._id}>
//                 <Link route="topic.entry" params={{ slug: topic.slug.current }}>
//                   <a>{topic.title}</a>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="col">
//           <ul>
//             {topics.slice(6, 12).map((topic, index) => (
//               <li key={topic._id}>
//                 <Link route="topic.entry" params={{ slug: topic.slug.current }}>
//                   <a>{topic.title}</a>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="col">
//           <ul>
//             {topics.slice(12, 18).map((topic, index) => (
//               <li key={topic._id}>
//                 <Link route="topic.entry" params={{ slug: topic.slug.current }}>
//                   <a>{topic.title}</a>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CorruptionByTopic;
