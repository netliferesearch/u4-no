import React from 'react';
import LinkToItem from '../general/LinkToItem';
import { ArrowNext } from '../icons/ArrowNext';

export const AuthorListBasic = ({ authors = [] }) => {
  return (
    <div className="c-authors-list c-authors-list--basic">
      {authors &&
        authors
          .filter(author => author)
          .map(author => (author.target ? author.target : author))
          .map(
            ({
              _id = Math.random(),
              firstName = '',
              surname = '',
              slug = false,
              affiliations = [],
              position = '',
            }) => (
              <div key={_id} className="c-authors-list__item">
                <span className="c-authors-list__name">
                  {slug &&
                  affiliations.length &&
                  affiliations.some(
                    ({ _ref }) =>
                      _ref === '419c2497-8e24-4599-9028-b5023830c87f' ||
                      _ref === '17ec3576-0afa-4203-9626-a38a16b27c2a' ||
                      _ref === '3babc8f1-9e38-4493-9823-a9352b46585b'
                  ) ? (
                    <LinkToItem type="person" slug={slug.current}>
                      <a className="u-link--inText u-link--inText--arrow">
                        <span>{`${firstName} ${surname}`}</span>
                        <ArrowNext />
                      </a>
                    </LinkToItem>
                  ) : (
                    `${firstName} ${surname}`
                  )}
                </span>
                {position && <span className="c-authors-list__position">{position}</span>}
              </div>
            )
          )}
    </div>
  );
};
