import React from 'react';

const AuthorList = ({ authors = [] }) => (
  <span>
    By{' '}
    {authors.map(({ firstName = '', surname = '', _id = '' }, index) => (
      <span key={_id}>
        <a href>
          {firstName} {surname}
        </a>
        {/* Add ampersands between the authors. */}
        {authors.length > 1 && index + 1 !== authors.length && <span> & </span>}
      </span>
    ))}
  </span>
);

export default AuthorList;
