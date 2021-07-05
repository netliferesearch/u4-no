import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { translate, langCode } from '../helpers/translate';

export const AboutAuthor = ({ authors = [], introkey = 'by', language = 'en' }) => {
  const trans = translate(language);
  const lang = langCode(language);
  return (
    <div className="c-blog-authors-list c-about-author">
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
                {index === 0 &&
                ((lang === 'en' && bioShort.length) ||
                  (lang === 'fr' && bioShort_fr.lenth) ||
                  (lang === 'es' && bioShort_es.length)) ? (
                  <div>
                    <hr className="u-section-underline--no-margins" />
                    <h3 className="u-primary-heading">About the author</h3>
                  </div>
                ) : null}
                {/* <div className="c-blog-authors-list__name">
                  <span>
                    {slug &&
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
                    )}
                  </span>
                </div> */}
                {/* {position && (
                  <div classname="c-blog-authors-list__position">
                    <span>{position}</span>
                  </div>
                )} */}
                <div className="c-blog-authors-list__text-block c-article-v2__main-text">
                  {lang === 'en' && bioShort && <BlockContent blocks={bioShort} />}
                  {lang === 'fr' && bioShort_fr && <BlockContent blocks={bioShort_fr} />}
                  {lang === 'es' && bioShort_es && <BlockContent blocks={bioShort_es} />}
                </div>
              </div>
            )
          )}
    </div>
  );
};
