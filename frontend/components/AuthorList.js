import React from 'react';

const AuthorList = ({ authors = false }) => (
  <span>
    By{' '}
    {authors &&
      authors
        .filter(author => author)
        .map(author => (author.target ? author.target : author))
        .map(({ firstName = '', surname = '', _id = '', slug = false }, index) => (
          <span key={_id}>
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
    {console.log(authors)}
  </span>
);

export default AuthorList;
