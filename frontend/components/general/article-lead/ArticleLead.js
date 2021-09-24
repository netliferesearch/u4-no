import React from 'react';

export const ArticleLead = ({ lead = '', abstract = '' }) => {
  return (
    <>
      {lead || abstract ? (
        <div className="c-article__lead c-longform">
          {lead && !abstract && <p className="c-longform-grid__standard">{lead}</p>}
          {/* Legacy publication abstracts come with html included
                so we go and render it out.
          */}
          {!lead && abstract && (
            <div
              className="c-article__lead--abstract c-longform c-longform-grid__standard"
              dangerouslySetInnerHTML={{ __html: abstract }}
            />
          )}
        </div>
      ) : null}
    </>
  );
};
