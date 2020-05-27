import React from 'react';
import BEMHelper from 'react-bem-helper';
import languageName from '../../helpers/languageName';
import { LinkToItem } from '../';
import { AuthorList, EditorList } from './';
import dateToString from '../../helpers/dateToString';

const classes = BEMHelper({
  name: 'article-sidebar',
  prefix: 'c-',
});

const PublicationSidebar = ({
  className = '',
  publicationType = {},
  publicationNumber = '',
  authors = [],
  editors = [],
  reference = '',
  translations = {},
  date = {},
  updatedVersion = false,
}) => (
  <div {...classes('', null, className)}>
    <div {...classes('item')}>
      <p>
        <strong>{dateToString({ start: date.utc })}</strong>
      </p>
      {updatedVersion ? <p>Updated {dateToString({ start: updatedVersion.date.utc })}</p> : null}
    </div>
    {authors.length ? (
      <div {...classes('item')}>
        <AuthorList authors={authors} />
      </div>
    ) : null}
    {editors.length ? (
      <div {...classes('item')}>
        <EditorList
          editors={editors}
          intro={publicationType._id === 'pubtype-3' ? 'Reviewed by' : 'Series editor'}
          pluralize={publicationType._id !== 'pubtype-3'}
        />
      </div>
    ) : null}
    {/* {bibliographicReference({ publicationType, publicationNumber, reference })} */}

    {translations.length > 0 && (
      <p>
        Available in{' '}
        {translations.map(
          (item = {}, index) =>
            item.slug &&
            item.title && (
              <LinkToItem type="publication" slug={item.slug} key={item._id}>
                <span>
                  <a {...classes('language')}>{languageName({ langcode: item.language })}</a>
                  {index + 2 < translations.length && <span>, </span>}
                  {index + 2 === translations.length && <span> and </span>}
                </span>
              </LinkToItem>
            )
        )}
        {'.'}
      </p>
    )}
  </div>
);

export default PublicationSidebar;
