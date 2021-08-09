import React from 'react';
import Link from 'next/link';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import { ArrowNext } from './icons/ArrowNext';
// import HomePageHero from '../public/HomePageHero';

export const CTA = ({img = ''}) => {
  return (
    <div
      className="c-cta"
      style={{
        backgroundImage: `linear-gradient(
          90deg
          , rgb(0 0 0 / 57%) 2.51%, rgb(11 11 11 / 54%) 25.95%, rgb(11 11 11 / 59%) 45.68%, rgba(255, 255, 255, 0) 99.64%),url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        height: '650px',
      }}
    >
      <div className="o-wrapper-medium">
        <h1 className="u-primary-heading ">
          Inform your work with U4’s quality research and practical guidance
        </h1>
        <p className="c-cta-paragraph">
          Sustainable and inclusive development starts where corruption ends
        </p>
        <Link href="/about-u4">
          <a className="c-btn c-hyperlink">
            Learn more about u4
            <ArrowNext />
          </a>
        </Link>
      </div>
    </div>
  );
};

// const Guidance = () => {
//   return (
//     <div className="c-frontpage-blue-section__content c-frontpage-blue-section__guidance">
//       <div className="col col-1">
//         <h2>Inform your work with U4’s quality research and practical guidance.</h2>
//         <p>
//           The U4 Anti-Corruption Resource Centre works to reduce the harmful impact of corruption on
//           society. We share research and evidence to help international development actors get
//           sustainable results.
//         </p>
//       </div>
//       <div className="col cols">
//         <div className="col">
//           <ul>
//             <li>
//               <a href="/topics">
//                 Corruption by topic <ArrowRight />
//               </a>
//             </li>
//             <li>
//               <a href="/search?filters=publications-only&sort=year-desc">
//                 All resources <ArrowRight />
//               </a>
//             </li>
//             <li>
//               <a href="/terms">
//                 Glossary <ArrowRight />
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="col">
//           <ul>
//             <li>
//               <a href="/online-courses">
//                 Online courses <ArrowRight />
//               </a>
//             </li>
//             <li>
//               <a href="/helpdesk">
//                 Helpdesk <ArrowRight />
//               </a>
//             </li>
//             <li>
//               <a href="/workshops-and-events">
//                 Workshops &amp; events <ArrowRight />
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Guidance;
