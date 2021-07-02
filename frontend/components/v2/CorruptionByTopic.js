import React from 'react';
import Link from 'next/link';
import { SectionIntro } from './SectionIntro';

export const TopicCardList = ({ topics }) => {
  return (
    <div className="c-topic-card-list">
      <SectionIntro
        title="Corruption by topic"
        text="A sentence on contextualising the value/use of U4 topics"
        label="View all topics"
        slug="/topics"
      />
      <ul>
        {topics.map((topic, index) => (
          <li key={topic._id} className="c-topic-card-list__item">
            <Link href={`/topics/${topic.slug.current}`}>
              <a>
                <div className="c-topic-card-list__item-text">
                  <div>
                    <h3 className="u-heading--5 u-text--blue">{topic.title}</h3>
                    <p className="u-text--15 u-text--grey">{topic.longTitle}</p>
                  </div>
                  <div>
                    <Link href={`/topics/${topic.slug.current}`}>
                      <a className="c-btn c-btn--sec">
                        <span>Learn more</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
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
