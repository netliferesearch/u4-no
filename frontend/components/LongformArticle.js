import React, { useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers/serializers';
import findFootnotes from './findFootnotes';
import footnoteSerializer from './footnoteSerializer';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */

const LongformArticle = ({ content = [], title = '', lead = false }) => {
  useEffect(() => {
    const littlefoot = require('littlefoot').default;
    littlefoot();
  }, []);

  if (!content) return <div />;
  const blocks = content.filter(block => !['reference'].includes(block._type));
  const footnotes = findFootnotes(blocks);
  const footNotesKeys = Object.keys(footnotes);
  return (
    <div className={`c-article-v2 o-wrapper-section c-article-v2__main-text c-longform ${lead ? '' : 'u-drop-cap'}`}>
      <BlockContent blocks={blocks} serializers={serializers} />
      <div>
        <div className="footnotes">
          <ol>
            {footNotesKeys.map(key => (
              <BlockContent
                blocks={footnotes[key]}
                serializers={footnoteSerializer(key)}
                key={key}
              />
            ))}
          </ol>
        </div>
      </div>
      <span id="js-bottom" />
    </div>
  );
};

export default LongformArticle;

// import React, { Fragment } from 'react';
// import BlockContent from '@sanity/block-content-to-react';
// import serializers from './serializers/serializers';
// import findFootnotes from './findFootnotes';
// import footnoteSerializer from './footnoteSerializer';
// import { Littlefoot } from './Littlefoot';

// /**
//  * Here we replace Sanity's react components for rendering basic things like
//  * lists so that we can drop in our classnames
//  * @type {Object}
//  */
// export default function LongformArticle(props) {
//   const { content = [] } = props;
//   if (!content) return <div />;
//   const blocks = content.filter(block => !['reference'].includes(block._type));
//   const footnotes = findFootnotes(blocks);
//   const footNotesKeys = Object.keys(footnotes);
//   return (
//     <main
//       className={`c-article ${blocks.length === 1 ? 'c-longform-grid' : 'c-longform-grid-sub-div'}`}
//     >
//       <BlockContent blocks={blocks} serializers={serializers} />
//       <div>
//         <div className="footnotes">
//           <ol>
//             {footNotesKeys.map((key, index) => {
//               return (
//                 <Fragment key={key}>
//                   <BlockContent blocks={footnotes[key]} serializers={footnoteSerializer(key)} />
//                   {footNotesKeys.length - 1 === index && <Littlefoot />}
//                 </Fragment>
//               );
//             })}
//           </ol>
//         </div>
//       </div>
//     </main>
//   );
// }
