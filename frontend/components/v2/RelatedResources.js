import React from 'react';
import dateToString from '../../helpers/dateToString';
import BEMHelper from 'react-bem-helper';

const RelatedResources = ({ resources }) => {
  const classes = BEMHelper({ name: 'publication-section', prefix: 'c-' });
  return (
    <div className="o-wrapper-section c-publication-section">
      <h2 className="u-blue-underline">Related</h2>
      <hr className="u-section-underline" />
      <div {...classes('cols')}>
        {resources.map((resource, index) => (
          <div className="col" key={index}>
            {console.log("resource",resource)}
            <div className="text">
              <div className="top-content">
                <h6 {...classes('publication-type')}>
                  {resource._type === 'course' ? 'Online course' : 'Workshop'}
                </h6>
                <a
                  href={`${resource._type === 'course' ? 'courses/' : '/'}${resource.slug.current}`}
                  {...classes('publication-headline')}
                >
                  <h3 {...classes('publication-headline')}>{resource.title}</h3>
                </a>
                <p {...classes('publication-intro')}>{resource.lead}</p>
              </div>
              <div className="bottom-content">
                {/* TODO get the date to show */}
                {/* <p {...classes('date')}>{dateToString({ start: resource.date.utc })}</p> */}
                <div {...classes('topic')}>
                  {resource.topics &&
                    resource.topics.map((topic, index) => {
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

export default RelatedResources;
