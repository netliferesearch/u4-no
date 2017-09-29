import React from 'react';

const AuthorList = ({ authors = [] }) => (
  <div>
    {authors.map(({ firstName = '', surname = '', _id = '' }) => (
      <a href key={_id}>
        {firstName} {surname}
      </a>
    ))}
  </div>
);

export default AuthorList;
