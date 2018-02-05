import React from 'react';
import buildUrl from '../helpers/buildUrl';

const EditorList = ({ _id, editors = [], intro = 'Editor', pluralize = true }, index) =>
  editors.length > 0 && (
    <span key={_id + index}>
      {intro}
      {pluralize && editors.length > 1 ? 's' : ''}
      {': '}
      {editors
        .map(editor => (editor.target ? editor.target : editor))
        .map(({
 _id = '', firstName = '', surname = '', slug = {},
}, index) => (
  <a key={_id + index} href={buildUrl({ _type: 'person', slug })}>
    {firstName} {surname}{' '}
  </a>
        ))}
    </span>
  );

export default EditorList;
