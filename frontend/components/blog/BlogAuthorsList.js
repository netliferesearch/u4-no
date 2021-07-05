import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import LinkToItem from '../LinkToItem';
import { translate, langCode } from '../../helpers/translate';

export const BlogAuthorsList = ({ authors = [], introkey = 'by', language = 'en' }) => {
  const trans = translate(language);
  const lang = langCode(language);
  return (
    <div className="c-blog-authors-list">
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
                position = '',
                bioShort = [],
                bioShort_fr = [],
                bioShort_es = [],
              },
              index
            ) => (
              <div className="c-blog-authors-list__item" key={_id}>
                <div className="c-blog-authors-list__name">
                    {slug &&
                    affiliations.length &&
                    affiliations.some(
                      ({ _ref }) =>
                        _ref === '419c2497-8e24-4599-9028-b5023830c87f' ||
                        _ref === '17ec3576-0afa-4203-9626-a38a16b27c2a' ||
                        _ref === '3babc8f1-9e38-4493-9823-a9352b46585b'
                    ) ? (
                      <LinkToItem type="person" slug={slug.current}>
                        <a className="c-btn--qua"><span>{`${firstName} ${surname}`}</span></a>
                      </LinkToItem>
                    ) : (
                      `${firstName} ${surname}`
                    )}
                </div>
                {position && (
                  <div className="c-blog-authors-list__position">
                    <span>{position}</span>
                  </div>
                )}

                {/* <div className="c-blog-authors-list__text-block">
                  {lang === 'en' && bioShort && <BlockContent blocks={bioShort} />}
                  {lang === 'fr' && bioShort_fr && <BlockContent blocks={bioShort_fr} />}
                  {lang === 'es' && bioShort_es && <BlockContent blocks={bioShort_es} />}
                </div> */}
              </div>
            )
          )}
    </div>
  );
};

BlogAuthorsList.propTypes = {
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
        position: PropTypes.string,
        bioShort: PropTypes.arrayOf(PropTypes.object),
        bioShort_fr: PropTypes.arrayOf(PropTypes.object),
        bioShort_es: PropTypes.arrayOf(PropTypes.object),
      }),
    })
  ).isRequired,
};
