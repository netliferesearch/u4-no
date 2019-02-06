import React from 'react';
import { Link } from '../routes';
import buildUrl from '../helpers/buildUrl';

const EditorList = ({
  _id, editors = [], intro = 'Series editor', pluralize = true,
}, index) =>
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
  <span key={_id}>
    <Link href={buildUrl({ _type: 'person', slug })}>
      <a>
        {firstName} {surname}{' '}
      </a>
    </Link>{' '}
    {editors.length > 1 && index + 2 < editors.length && <span>, </span>}
    {editors.length > 1 && index + 2 === editors.length && <span> and </span>}
  </span>
        ))}
    </span>
  );

export default EditorList;
