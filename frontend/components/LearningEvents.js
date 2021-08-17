import React from 'react';
import dateToString from '../helpers/dateToString';
import LinkToItem from './general/LinkToItem';
import { SectionIntro } from './general/SectionIntro';
import { getPostType } from '../helpers/getRouteByType';
import { shortSentences } from '../helpers/stringHelpers';
import LocationIcon from './icons/LocationIcon';
import { CalendorIcon } from './icons/CalendorIcon';
import { ArrowNext } from './icons/ArrowNext';

export const LearningEvents = ({ events }) => {
  return (
    <div className="c-events-list ">
      <SectionIntro
        title="Learning and Events"
        // text="Lorem ipsum ipsum lorem"
        slug="/blog"
        label="View blog"
      />

      <div className="c-events-list__row c-events-list__content">
        <div className="c-events-list__col ">
          {events
            ? events.map((post, index) => (
                <LinkToItem type={post._type} slug={post.slug} key={index}>
                  <a className={` c-events__item--small c-events-box`}>
                    <div className="c-featured-post__text " style={{ height: '100%' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}>
                        <div>
                          {getPostType(post) && (
                            <h5 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
                              {getPostType(post)}
                            </h5>
                          )}
                          <h3 className="">{post.title}</h3>
                        </div>
                        <p className="c-featured-post__intro u-body--grey c-event-intro-text">
                          {post.lead}
                        </p>

                        <div style={{ alignSelf: 'flex-end', width: '100%' }}>
                          {/* <p className="c-events-location u-body--small">
                            <LocationIcon /> {post.startDate.timezone}
                          </p> */}
                          <p className="c-featured-post__date c-events-date u-body--small">
                            <CalendorIcon />
                            {post.startDate ? dateToString({ start: post.startDate.utc }) : null}
                          </p>
                          <div className="c-view-more">
                            <a className="c-events-view-more" href="/publications">
                              View more
                              <ArrowNext />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </LinkToItem>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
