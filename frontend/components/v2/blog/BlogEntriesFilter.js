import React, { useState } from 'react';
import { ArrowDark } from '../../icons/ArrowDark';
/**
 * V2 - Blog filter component to be used in BlogPage component
 * @param {Array} topics
 * @param {function} setFilter
 */

export const BlogEntriesFilter = ({ topics, setFilter, filter }) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const toggleAccordion = index => {
    const newIndex = index === activeAccordion ? -1 : index;
    setActiveAccordion(newIndex);
  };
  const handleClick = (e, filter, topic) => {
    e.preventDefault();
    if (filter) {
      filter.title === topic.title ? setFilter(null) : setFilter(topic);
    } else {
      setFilter(topic);
    }
  };

  return (
    topics && (
      <div className="blog-accordion c-blog-filter">
        <div className="c-accordion">
          <div className="c-accordion__block" onClick={e => toggleAccordion(1)}>
            <div className="c-accordion__container">
              <h3 className="c-blog-filter__title">{filter ? filter.title : 'Filter by topic'} </h3>
              <div className={`c-accordion__content${activeAccordion === 1 ? ' open' : ''}`}>
                <div className="c-accordion__list">
                  <a href="#\" onClick={e => handleClick(e, filter, '')} className="main">
                    All Topics
                  </a>
                  {topics &&
                    topics.map((topic, index) => {
                      return (
                        <a href="#\" key={index} onClick={e => handleClick(e, filter, topic)}>
                          {topic.title}
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className={`c-accordion__arrow${activeAccordion === 1 ? ' open' : ''}`}>
              <ArrowDark />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
