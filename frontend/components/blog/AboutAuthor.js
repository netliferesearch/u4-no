import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { translateField, langCode } from '../../helpers/translate';
import LinkToItem from '../general/LinkToItem';

export const AboutAuthor = ({ authors = [], introkey = 'by', language = 'en' }) => {
  const lang = langCode(language);
  const transField = translateField(language);

  return (
    <div className="c-about-author">
      {authors &&
        authors
          .filter(author => author)
          .map(author => (author.target ? author.target : author))
          .map( ( author, index ) => {
              const {
                _id = Math.random(),
                firstName = '',
                surname = '',
                slug = false,
                affiliations = [],
                position = '',
                bioShort = [],
              } = author;
              
              return (
              <div className="c-about-author__item" key={_id}>
                {(index === 0 && bioShort.length) ? (
                  <div>
                    <h4 className="u-primary-heading u-text--dark-blue">
                      About the author{`${authors.length > 1 ? 's' : ''}`}
                    </h4>
                  </div>
                ) : null}
                <div className="c-about-author__name">
                  <span>
                    {slug &&
                    affiliations.length &&
                    affiliations.some(
                      ({ _id }) =>
                        _id === '419c2497-8e24-4599-9028-b5023830c87f' ||
                        _id === '17ec3576-0afa-4203-9626-a38a16b27c2a' ||
                        _id === '3babc8f1-9e38-4493-9823-a9352b46585b'
                    ) ? (
                      <LinkToItem type="person" slug={slug.current}>
                        <a>{`${firstName} ${surname}`}</a>
                      </LinkToItem>
                    ) : (
                      `${firstName} ${surname}`
                    )}
                  </span>
                </div>
                {/* {position && (
                  <div classname="c-about-author__position">
                    <span>{position}</span>
                  </div>
                )} */}
                <div className="c-longform">
                  <BlockContent blocks={bioShort.length > 0 ? transField(author,'bioShort') : []} />
                </div>
              </div>
            )}
          )}
    </div>
  );
};
