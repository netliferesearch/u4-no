import React from 'react';

const AuthorList = ({ authors = false }) => (
  <span>
    By{' '}
    {authors &&  authors.filter(author => author).map(({ firstName = '', surname = '', _id = '', slug = false }, index) => (
      <span key={_id}>
        {slug ? <a href={`/the-team/${slug.current}`}>
          {firstName} {surname}
        </a> : `${firstName} ${surname}` }
        {/* Add ampersands between the authors. */}
        {authors.length > 1 && index + 1 !== authors.length && <span> & </span>}
      </span>
    ))}
  </span>
);

export default AuthorList;
