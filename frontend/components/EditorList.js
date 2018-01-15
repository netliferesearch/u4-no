import React from 'react';
import buildUrl from '../helpers/buildUrl';

const EditorList = ({ editors = [], intro = 'Editor', pluralize = true }) =>
  editors.length > 0 && (
    <span>
      {intro}
      {pluralize && editors.length > 1 ? 's' : ''}
      {': '}
      {editors
        .map(editor => (editor.target ? editor.target : editor))
        .map(({
 _id = '', firstName = '', surname = '', slug = {},
}) => (
  <a key={_id} href={buildUrl({ _type: 'person', slug })}>
    {firstName} {surname}{' '}
  </a>
        ))}
    </span>
  );

export default EditorList;
