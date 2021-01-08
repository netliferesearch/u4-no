import React from 'react';
import PropTypes from 'prop-types';
import { LinkToItem } from '../..';

export const BlogAuthorsShortList = ({ authors = [] }) => {
  return (
    <span className="c-blog-authors-list--short">
      {authors &&
        authors
          .filter(author => author)
          .map(author => (author.target ? author.target : author))
          .map(
            (
              {
                _id = Math.random(),
                firstName = '',
                surname = '',
                slug = false,
                affiliations = [],
              },
              index
            ) => (
              <span className="c-blog-authors-list__item" key={_id}>
                <span>
                  {/* {slug &&
                      affiliations.length &&
                      affiliations.some(
                        ({ _ref }) =>
                          _ref === '419c2497-8e24-4599-9028-b5023830c87f' ||
                          _ref === '17ec3576-0afa-4203-9626-a38a16b27c2a' ||
                          _ref === '3babc8f1-9e38-4493-9823-a9352b46585b'
                      ) ? (
                        <LinkToItem type="person" slug={slug.current}>
                          <a>{`${firstName} ${surname}`}</a>
                        </LinkToItem>
                      ) : (
                        `${firstName} ${surname}`
                      )} */}
                  {slug && `${firstName} ${surname}`}
                  {index < authors.length - 1 ? ', ' : ''}
                </span>
              </span>
            )
          )}
    </span>
  );
};

BlogAuthorsShortList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      surname: PropTypes.string,
      slug: PropTypes.shape({
        current: PropTypes.string,
      }),
      affiliations: PropTypes.arrayOf(PropTypes.object),
      target: PropTypes.shape({
        firstName: PropTypes.string,
        surname: PropTypes.string,
        slug: PropTypes.shape({
          current: PropTypes.string,
        }),
        affiliations: PropTypes.arrayOf(PropTypes.object),
      }),
    })
  ).isRequired,
};
