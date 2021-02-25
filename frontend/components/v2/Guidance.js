import React from 'react';
import { Link } from '../../routes';

export const CTA = () => {
  return (
    <div className="c-cta">
      <h2 className="u-heading--2">Inform your work with U4’s quality research and practical guidance</h2>
      <p className="u-standfirst u-text--grey">Sustainable and inclusive development starts where corruption ends</p>
      <Link route="/about-u4">
        <a className="c-btn c-btn--pri">
          <span>Learn more about us</span>
        </a>
      </Link>
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
