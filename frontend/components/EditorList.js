import React from 'react';
import { LinkToItem } from './';

const EditorList = (
  { _id, editors = [], intro = 'Series editor', pluralize = true, and = 'and' },
  index
) =>
  editors.length > 0 && (
    <span>
      {intro}
      {pluralize && editors.length > 1 ? 's' : ''}
      {': '}
      {editors
        .map(editor => (editor.target ? editor.target : editor))
        .map(({ _id = '', firstName = '', surname = '', slug = {} }, index) => (
          <span key={_id}>
            {_id ? (
              <LinkToItem type="person" slug={slug}>
                <a>
                  {firstName} {surname}
                </a>
              </LinkToItem>
            ) : (
              <span>
                {firstName} {surname}
              </span>
            )}
            {editors.length > 1 && index + 2 < editors.length && <span>, </span>}
            {editors.length > 1 && index + 2 === editors.length && <span> {`${and}`} </span>}
          </span>
        ))}
    </span>
  );

export default EditorList;
