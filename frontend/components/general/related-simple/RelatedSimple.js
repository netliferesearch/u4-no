import React from 'react';
import Link from 'next/link';

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
      slugOfType = 'publications/';
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

export const RelatedSimple = ({ items }) => {
  return (
    <div className="c-related-simple">
      <div>
        {items
          ? items.map((item, index) => (
              <div key={index} className="c-related-simple__item">
                {index > 0 && <hr className="u-section-underline--grey" />}
                {item && 
                <Link
                  href={`/${getStringsByType(item).slugOfType}${
                    typeof item.slug === 'string' ? item.slug : item.slug.current
                  }`}
                  className="c-related-simple__link u-link--inText u-text--dark-grey">

                  <span>{item.title}</span>

                </Link>
                }
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
