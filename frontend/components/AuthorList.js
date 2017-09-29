import React from 'react';

const AuthorList = ({ authors = [] }) => (
  <div>
    By{' '}
    {authors.map(({ firstName = '', surname = '', _id = '' }, index) => (
      <span>
        <a href key={_id}>
          {firstName} {surname}
        </a>
        {/* Add ampersands between the authors. */}
        {authors.length > 1 && index + 1 !== authors.length && <span> & </span>}
      </span>
    ))}
  </div>
);

export default AuthorList;
