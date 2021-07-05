import React from 'react';
import LinkToItem from './LinkToItem';

const EditorList = ({ editors = [], intro = 'Series editor', pluralize = true }) =>
  editors.length > 0 && (
    <div className="c-editors-list">
      <h4 className="c-authors-list__title">
        {intro}
        {pluralize && editors.length > 1 ? 's' : ''}
        {':'}
      </h4>
      {editors
        .map(editor => (editor.target ? editor.target : editor))
        .map(({ _id = '', firstName = '', surname = '', slug = {}, position = '' }, affiliations = []) => (
          <div key={_id} className="author c-authors-list__item">
            <div className="c-authors-list__name">
              {_id ? (
                <LinkToItem type="person" slug={slug}>
                  <a className="c-btn--qua">
                    <span>{firstName} {surname}</span>
                  </a>
                </LinkToItem>
              ) : (
                <p>
                  <span>
                    {firstName} {surname}
                  </span>
                </p>
              )}
            </div>
            {position && (
              <div className="c-authors-list__position">
                <span>{position}</span>
              </div>
            )}
            {/* {editors.length > 1 && index + 2 < editors.length && <span>, </span>}
            {editors.length > 1 && index + 2 === editors.length && <span> {`${and}`} </span>} */}
            {/* {affiliations && affiliations[0] ? <p>{affiliations[0].target.name}</p> : null} */}
          </div>
        ))}
    </div>
  );

export default EditorList;


// import React from 'react';
// import LinkToItem from './LinkToItem';
// import { translate, translateField } from '../helpers/translate';

// const EditorList = (
//   {
//     _id,
//     editors = [],
//     language = '',
//     pubtype = 'pubtype-1',
//     intro = 'Series editor',
//     introkey = 'series_editor',
//     pluralize = true,
//     and = 'and',
//   },
//   index
// ) => {
//   const trans = translate(language);
//   const transField = translateField(language);
//   return (
//     editors.length > 0 && (
//       <span>
//         {pubtype === 'pubtype-3'
//           ? trans('reviewed_by')
//           : editors.length > 1
//           ? trans('series_editors')
//           : trans('series_editor')}
//         {': '}
//         {editors
//           .map(editor => (editor.target ? editor.target : editor))
//           .map((person, index) => (
//             <span key={index}>
//               {_id ? (
//                 <LinkToItem type="person" slug={person.slug}>
//                   <a>
//                     {transField(person, 'firstName')} {transField(person, 'surname')}
//                   </a>
//                 </LinkToItem>
//               ) : (
//                 <span>
//                   {transField(person, 'firstName')} {transField(person, 'surname')}
//                 </span>
//               )}
//               {editors.length > 1 && index + 2 < editors.length && <span>, </span>}
//               {editors.length > 1 && index + 2 === editors.length && (
//                 <span> {`${trans('and')}`} </span>
//               )}
//             </span>
//           ))}
//       </span>
//     )
//   );
// };

// export default EditorList;
