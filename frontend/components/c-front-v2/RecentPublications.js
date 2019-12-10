import React from 'react';
import { LinkToItem } from '../';
import { ArrowRight } from '../icons';
import BEMHelper from 'react-bem-helper';
import dateToString from '../../helpers/dateToString';

const RecentPublications = ({ resources = [], alt = false }) => {
  const classes = BEMHelper({ name: 'frontpage-section', prefix: 'c-' });
  return (
    <div {...classes('publications')}>
      <h2 className="u-blue-underline">Recent publications</h2>
      {resources
        .map(resource => (resource.target ? resource.target : resource))
        .filter(({ _id = '' }) => _id)
        // loops through lists and return only a set with resources with unique ids
        .reduce((x, y) => (x.map(({ _id }) => _id).includes(y._id) ? x : [...x, y]), [])
        .map(
          (
            {
              title = '',
              _id = '',
              _type = '',
              publicationType = '',
              articleType = '',
              slug = '',
              date = '',
              standfirst = '',
              topics = [],
              imageUrl = false,
              firstName = '',
              surname = '',
            },
            index
          ) => (
            <div className="text" key={_id}>
              <h6 {...classes('publication-type')}>
                {'Publication | '}
                {typeof publicationType === 'string' ? publicationType.substring(3) : ''}
                {!publicationType && typeof articleType === 'string'
                  ? articleType.substring(3)
                  : ''}
              </h6>
              <LinkToItem type={_type} slug={slug}>
                <a>
                  <h3 {...classes('publication-headline')}>{title}</h3>
                </a>
              </LinkToItem>
              <p {...classes('publication-intro')}>{standfirst}</p>
              <p {...classes('date')}>{dateToString({ start: date.utc })}</p>
              <div {...classes('topic')}>
                {topics.map((topic, index) => {
                  return (
                    <span className="topic" key={index}>
                      {topic.title}
                    </span>
                  );
                })}
              </div>
              <hr className="u-section-underline" />
            </div>
          )
        )}
      <h2 className="c-frontpage-section__cta">
        <a href="/search?search=*" {...classes('view-all')}>
          View all <img alt="Close icon" src="/static/arrow-right-slim.svg" />
        </a>
      </h2>
    </div>
  );
};

export default RecentPublications;
