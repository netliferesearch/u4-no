import React from 'react';
import { LinkToItem } from '../';

const EditorList = ({ editors = [], intro = 'Series editor', pluralize = true }) =>
  editors.length > 0 && (
    <div>
      <h2>
        {intro}
        {pluralize && editors.length > 1 ? 's' : ''}
      </h2>
      {editors
        .map(editor => (editor.target ? editor.target : editor))
        .map(({ _id = '', firstName = '', surname = '', slug = {} }, affiliations = []) => (
          <div key={_id} className="author">
            {_id ? (
              <LinkToItem type="person" slug={slug}>
                <a>
                  <strong>
                    {firstName} {surname}
                  </strong>
                </a>
              </LinkToItem>
            ) : (
              <p>
                <strong>
                  {firstName} {surname}
                </strong>
              </p>
            )}
            {/* {editors.length > 1 && index + 2 < editors.length && <span>, </span>}
            {editors.length > 1 && index + 2 === editors.length && <span> {`${and}`} </span>} */}
            {affiliations && affiliations[0] ? <p>{affiliations[0].target.name}</p> : null}
          </div>
        ))}
    </div>
  );

export default EditorList;
