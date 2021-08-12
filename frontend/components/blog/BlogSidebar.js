import React, { useState } from 'react';
import { BlogAuthorsList } from './BlogAuthorsList';
import dateToString from '../../helpers/dateToString';
import { DownloadPdf } from '../DownloadDropdown';
import { Share } from '../general/social/SocialShare';
import { TagsSection } from '../TagsSection';
import { RelatedSimple } from '../RelatedSimple';
import { Keywords } from '../Keywords';
import LinkToItem from '../LinkToItem';
import { Translations } from '../Translations';
import { format, isAfter } from 'date-fns';
import languageName from '../../helpers/languageName';
/**
 * V2 - Sidebar component to be used in BlogEntry component
 * @param {object} data
 */

export const BlogSidebar = ({ data, side }) => {
  const {
    title = '',
    authors = [],
    date = {},
    _updatedAt = '',
    relatedContent = '',
    topics = '',
    keywords = '',
    language = '',
    translation = {},
    slug = '',
  } = data;

 const showUpdated = isAfter(format(new Date(_updatedAt)),format(new Date(date.utc)));
 // console.log("showUpdated",showUpdated);

  return data ? (
    <div className="c-blog-sidebar">
      {side === 'left' ? (
        <div className=" c-blog-sidebar--left">
          <div className="c-blog-sidebar__date">
            {date && date.utc && (
              <span className="c-blog-sidebar__row--regular">
                {dateToString({ start: date.utc })}
              </span>
            )}
            {_updatedAt && showUpdated && (
              <span className="c-blog-sidebar__row--regular">
                Updated {dateToString({ start: _updatedAt })}
              </span>
            )}
          </div>
          {authors.length ? (
            <BlogAuthorsList
              authors={authors}
              //language={language}
            />
          ) : null}
          {translation.slug && (
            <div className="c-blog-sidebar__translation u-hidden--tablet">
              Also available in{' '}
              <LinkToItem type="blog-post" slug={translation.slug} key={translation._id}>
                <span>
                  <a className="c-btn c-btn--qua">
                    {languageName({ langcode: translation.language })}
                  </a>
                </span>
              </LinkToItem>
            </div>
          )}
          <div className="u-hidden--desktop">
            <Share text={title} />
            {translation.slug && (
              <div className="c-blog-sidebar__translation">
                Also available in{' '}
                <LinkToItem type="blog-post" slug={translation.slug} key={translation._id}>
                  <span>
                    <a className="c-btn c-btn--qua">
                      {languageName({ langcode: translation.language })}
                    </a>
                  </span>
                </LinkToItem>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {side === 'right' ? (
        <div className="c-blog-sidebar--right">
          {keywords.length > 0 ? <Keywords title={true} keywords={keywords} hr={true} /> : null}
          {relatedContent.length > 0 ? (
            <RelatedSimple items={relatedContent} title={'Related'} />
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
};
