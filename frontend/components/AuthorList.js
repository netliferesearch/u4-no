import React from 'react';
import PropTypes from 'prop-types';
import { LinkToItem } from './';
import { translate } from '../helpers/translate';

const AuthorList = ({
  authors = [],
  language = '',
  introkey = 'by',
  intro = 'By',
  and = 'and',
}) => {
  const trans = translate(language);

  return (
    <span>
      {`${trans(introkey)} `}
      {authors &&
        authors
          .filter(author => author)
          .map(author => (author.target ? author.target : author))
          .map(
            (
              {
                _id = Math.random(),
                firstName = '',
                surname = '',
                slug = false,
                affiliations = [],
              },
              index
            ) => (
              <span key={_id}>
                {slug &&
                affiliations.length &&
                affiliations.some(
                  ({ _ref }) =>
                    _ref === '419c2497-8e24-4599-9028-b5023830c87f' ||
                    _ref === '17ec3576-0afa-4203-9626-a38a16b27c2a' ||
                    _ref === '3babc8f1-9e38-4493-9823-a9352b46585b'
                ) ? (
                  <LinkToItem type="person" slug={slug.current}>
                    <a>{`${firstName} ${surname}`}</a>
                  </LinkToItem>
                ) : (
                  `${firstName} ${surname}`
                )}
                {/* Add delimiters between the authors. */}
                {authors.length > 1 && index + 2 < authors.length && <span>, </span>}
                {authors.length > 1 && index + 2 === authors.length && (
                  <span> {`${trans('and')}`} </span>
                )}
              </span>
            )
          )}
    </span>
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
