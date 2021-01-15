import React from 'react';
import { LinkToItem } from '../';

const EditorList = ({ editors = [], intro = 'Series editor', pluralize = true }) =>
  editors.length > 0 && (
    <div className="c-editors-list">
      <h4 className="c-authors-list__title">
        {intro}
        {pluralize && editors.length > 1 ? 's' : ''}
        {':'}
      </h4>
      {editors
        .map(editor => (editor.target ? editor.target : editor))
        .map(({ _id = '', firstName = '', surname = '', slug = {}, position = '' }, affiliations = []) => (
          <div key={_id} className="author c-authors-list__item">
            <div className="c-authors-list__name">
              {_id ? (
                <LinkToItem type="person" slug={slug}>
                  <a className="c-btn--qua">
                    <span>{firstName} {surname}</span>
                  </a>
                </LinkToItem>
              ) : (
                <p>
                  <span>
                    {firstName} {surname}
                  </span>
                </p>
              )}
            </div>
            {position && (
              <div className="c-authors-list__position">
                <span>{position}</span>
              </div>
            )}
            {/* {editors.length > 1 && index + 2 < editors.length && <span>, </span>}
            {editors.length > 1 && index + 2 === editors.length && <span> {`${and}`} </span>} */}
            {/* {affiliations && affiliations[0] ? <p>{affiliations[0].target.name}</p> : null} */}
          </div>
        ))}
    </div>
  );

export default EditorList;
