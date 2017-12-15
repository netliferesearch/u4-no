import React from 'react';
import randomKey from '../helpers/randomKey';

const AuthorList = ({ authors = false }) => (
  <span>
    By{' '}
    {authors &&
      authors
        .filter(author => author)
        .map(author => (author.target ? author.target : author))
        .map(({ firstName = '', surname = '', slug = false }, index) => (
          <span key={randomKey()}>
            {slug ? (
              <a href={`/the-team/${slug.current}`}>
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
