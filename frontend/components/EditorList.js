import React from 'react';

const EditorList = ({ editors }) => {
  return editors.length > 0 && (
    <span>
      Series editor{editors.length > 1 ? 's' : ''}{' '}
      {editors.map(({ _id = '', firstName = '', surname = '' }) => (
        <a key={_id} href="/">
          {firstName} {surname}{' '}
        </a>
      ))}
    </span>
  )
};

export default EditorList;
