import React from 'react';
import dateToString from '../../helpers/dateToString';
import BEMHelper from 'react-bem-helper';

const NewsAndEvents = ({ events }) => {
  const classes = BEMHelper({ name: 'frontpage-section', prefix: 'c-' });
  return (
    <div className="c-frontpage-section__content c-frontpage-section__events">
      <h2 className="u-blue-underline">News &amp; events</h2>
      <hr className="u-section-underline" />
      <div className="cols">
        {events.map((event, index) => (
          <div className="col" key={index}>
            <div className="text">
              <h6 {...classes('publication-type')}>
                {event._type === 'course' ? 'Online course' : 'Workshop'}
              </h6>
              <a href={event.slug} {...classes('publication-headline')}>
                <h3>{event.title}</h3>
              </a>
              <p {...classes('publication-intro')}>{event.lead}</p>
              <div className="bottom-content">
                <p {...classes('date')}>{dateToString({ start: event.startDate.utc })}</p>
                <div {...classes('topic')}>
                  {event.topics.map((topic, index) => {
                    return (
                      <span className="topic" key={index}>
                        {topic.title}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAndEvents;
