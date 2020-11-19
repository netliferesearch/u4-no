import React from 'react';
import dateToString from '../../helpers/dateToString';
import BEMHelper from 'react-bem-helper';

const getStringsByType = item => {
  const itemType = item._type;
  let typeTitle = '';
  let typeSubTitle = '';
  let slugOfType = '';

  switch (itemType) {
    case 'publication':
      typeTitle = 'Publication | ';
      typeSubTitle =
        item.publicationType && typeof item.publicationType.title === 'string'
          ? item.publicationType.title
          : '';
      slugOfType = 'publication/';
      break;
    case 'course':
      typeTitle = 'Online course';
      typeSubTitle = '';
      slugOfType = 'courses/';
      break;
    case 'event':
      typeTitle = 'Workshop';
      typeSubTitle = '';
      slugOfType = '';
      break;
    case 'blog-post':
      typeTitle = 'Blog post';
      typeSubTitle = '';
      slugOfType = 'blog/';
      break;
    case 'article':
      typeTitle = 'Article';
      // typeSubTitle = typeof item.articleType.title === 'string' ? ' | '+item.articleType.title : '';
      typeSubTitle = '';
      slugOfType = '';
      break;
    default:
      typeTitle = '';
      typeSubTitle = '';
      slugOfType = '';
  }

  return { typeTitle, typeSubTitle, slugOfType };
};

export const RelatedSimple = ({ items, title }) => {
  const classes = BEMHelper({ name: 'related-items-list', prefix: 'c-' });
  return (
    <div className="c-related-simple">
      <h6>{title}</h6>
      <div>
        {items
          ? items.map((item, index) => (
              <div key={index} className="c-related-simple__item">
                <hr className="u-section-underline--no-margins" />
                {/* <h6 {...classes('publication-type')}>
                      {getStringsByType(item).typeTitle}
                      {getStringsByType(item).typeSubTitle}
                    </h6> */}
                <a
                  {...classes('publication-headline')}
                  href={`/${getStringsByType(item).slugOfType}${
                    typeof item.slug === 'string' ? item.slug : item.slug.current
                  }`}
                >
                  <h3>{item.title}</h3>
                </a>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
