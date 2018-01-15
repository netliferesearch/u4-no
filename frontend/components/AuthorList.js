import React from 'react';
import randomKey from '../helpers/randomKey';
import buildUrl from '../helpers/buildUrl';

const AuthorList = ({ authors = false }) => (
  <span>
    By{' '}
    {authors &&
      authors
        .filter(author => author)
        .map(author => (author.target ? author.target : author))
        .map(({
 firstName = '', surname = '', slug = false, affiliations = [],
}, index) => (
  <span key={randomKey()}>
    {slug &&
            affiliations.length &&
            affiliations.some(({ _ref }) =>
                _ref === '419c2497-8e24-4599-9028-b5023830c87f' ||
                _ref === '17ec3576-0afa-4203-9626-a38a16b27c2a' ||
                _ref === '3babc8f1-9e38-4493-9823-a9352b46585b') ? (
                  <a href={buildUrl({ _type: 'person', slug: slug.current })}>
                    {firstName} {surname}
                  </a>
            ) : (
              `${firstName} ${surname}`
            )}
    {/* Add delimiters between the authors. */}
    {authors.length > 1 && index + 2 < authors.length && <span>, </span>}
    {authors.length > 1 && index + 2 === authors.length && <span> and </span>}
  </span>
        ))}
  </span>
);

export default AuthorList;
