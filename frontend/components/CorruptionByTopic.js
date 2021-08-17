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
        ))}
      </ul>
      <div className="c-topics__link-holder">
        <a className="c-btn c-btn--link " href="/topics">
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
