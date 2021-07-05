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
      item.publicationType && (typeof item.publicationType.title === 'string') ? item.publicationType.title : '';
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

const NewsAndEvents = ({ items, title }) => {
  const classes = BEMHelper({ name: 'related-items-list', prefix: 'c-' });
  //console.log('Related items', items);
  return (
    <div className="c-related-items-list">
      <h2 className="">{title}</h2>
      <hr className="u-section-underline" />
      <div className="cols">
        {items
          ? items.map((item, index) => (
              <div className="col" key={index}>
                <div className="text">
                  <div className="top-content">
                    <h6 {...classes('publication-type')}>
                      {getStringsByType(item).typeTitle}
                      {getStringsByType(item).typeSubTitle}
                    </h6>
                    <a
                      href={`/${getStringsByType(item).slugOfType}${
                        typeof item.slug === 'string' ? item.slug : item.slug.current
                      }`}
                      {...classes('publication-headline')}
                    >
                      <h3 {...classes('publication-headline')}>{item.title}</h3>
                    </a>
                    {item.standfirst && <p {...classes('publication-intro')}>{item.standfirst}</p>}
                  </div>
                  <div className="bottom-content">
                    {item.startDate && (
                      <p {...classes('date')}>{dateToString({ start: item.startDate.utc })}</p>
                    )}
                    {item.date && (
                      <p {...classes('date')}>{dateToString({ start: item.date.utc })}</p>
                    )}
                    <div {...classes('topics')}>
                      {item.topics &&
                        item.topics.map((topic, index) => {
                          return (
                            topic.title && (
                              <span className="topic" key={index}>
                                {topic.title}
                              </span>
                            )
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default NewsAndEvents;
