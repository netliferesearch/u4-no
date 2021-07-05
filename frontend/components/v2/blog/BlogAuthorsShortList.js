import React from 'react';
import PropTypes from 'prop-types';

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
              },
              index
            ) => (
              <span className="c-blog-authors-list__item" key={_id}>
                <span>
                  {`${firstName} ${surname}`}
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
