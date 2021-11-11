import React from 'react';
import PropTypes from 'prop-types';
import LinkToItem from '../general/LinkToItem';

const AuthorList = ({ authors = [], intro = 'Author', pluralize = true }) => {
  return (
    <div className="c-authors-list">
      <h4 className="c-authors-list__title">
        {intro}
        {pluralize && authors.length > 1 ? 's' : ''}
      </h4>
      {authors &&
        authors
          .filter(author => author)
          .map(author => (author.target ? author.target : author))
          .map(
            ({
              _id = Math.random(),
              firstName = '',
              surname = '',
              slug = false,
              affiliations = [],
              position = '',
              bioShort = [],
              bioShort_fr = [],
              bioShort_es = [],
            }) => (
              <div key={_id} className="author c-authors-list__item">
                <div className="c-authors-list__name">
                  <span>{`${firstName} ${surname}`}</span>
                </div>
              </div>
            )
          )}
    </div>
  );
};
AuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      surname: PropTypes.string,
      slug: PropTypes.shape({
        current: PropTypes.string,
      }),
      affiliations: PropTypes.arrayOf(PropTypes.object),
      target: PropTypes.shape({
        firstName: PropTypes.string,
        surname: PropTypes.string,
        slug: PropTypes.shape({
          current: PropTypes.string,
        }),
        affiliations: PropTypes.arrayOf(PropTypes.object),
      }),
    })
  ).isRequired,
};

export default AuthorList;

// import React from 'react';
// import PropTypes from 'prop-types';
// import LinkToItem from './LinkToItem';
// import { translate, translateField } from '../helpers/translate';

// const AuthorList = ({
//   authors = [],
//   language = '',
//   introkey = 'by',
//   intro = 'By',
//   and = 'and',
// }) => {
//   const trans = translate(language);
//   const transField = translateField(language);
//   return (
//     authors && (
//       <span>
//         {authors.length > 1 ? trans('by_plural') : trans('by')}{' '}
//         {authors
//           .filter(author => author)
//           .map(author => (author.target ? author.target : author))
//           .map((person, index) => {
//             return (
//               <span key={person._id}>
//                 {person.slug &&
//                 person.affiliations &&
//                 person.affiliations.some(
//                   ({ _ref }) =>
//                     _ref === '419c2497-8e24-4599-9028-b5023830c87f' ||
//                     _ref === '17ec3576-0afa-4203-9626-a38a16b27c2a' ||
//                     _ref === '3babc8f1-9e38-4493-9823-a9352b46585b'
//                 ) ? (
//                   <LinkToItem type="person" slug={person.slug.current}>
//                     <a>{`${transField(person, 'firstName')} ${transField(person, 'surname')}`}</a>
//                   </LinkToItem>
//                 ) : (
//                   `${transField(person, 'firstName')} ${transField(person, 'surname')}`
//                 )}
//                 {/* Add delimiters between the authors. */}
//                 {authors.length > 1 && index + 2 < authors.length && <span>, </span>}
//                 {authors.length > 1 && index + 2 === authors.length && (
//                   <span> {`${trans('and')}`} </span>
//                 )}
//               </span>
//             );
//           })}
//       </span>
//     )
//   );
// };
// AuthorList.propTypes = {
//   authors: PropTypes.arrayOf(
//     PropTypes.shape({
//       firstName: PropTypes.string,
//       surname: PropTypes.string,
//       slug: PropTypes.shape({
//         current: PropTypes.string,
//       }),
//       affiliations: PropTypes.arrayOf(PropTypes.object),
//       target: PropTypes.shape({
//         firstName: PropTypes.string,
//         surname: PropTypes.string,
//         slug: PropTypes.shape({
//           current: PropTypes.string,
//         }),
//         affiliations: PropTypes.arrayOf(PropTypes.object),
//       }),
//     })
//   ).isRequired,
// };

// export default AuthorList;
