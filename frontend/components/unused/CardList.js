import React from 'react';
import LinkToItem from '../general/LinkToItem';
import dateToString from '../../helpers/dateToString';
import { SectionIntro } from '../general/SectionIntro';
import { Topics } from '../general/topics/Topics';
import { getPostType } from '../../helpers/getRouteByType';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ArrowNext } from '../icons/ArrowNext';

export const CardList = ({ resources = [], alt = false }) => {
  const responsive = {
    0: { items: 1.2 },
    568: { items: 1.2 },
    980: { items: 3 },
  };

  const renderDotsItem = ({ isActive }) => {
    return isActive ? (
      <div className="c-carousel__dots--active" />
    ) : (
      <div className="c-carousel__dots--deactivated" />
    );
  };
  return (
    <div className="c-card-list">
      <SectionIntro
        title="U4 publications"
        // text="A sentence on the vlaue of publications and how to use them"
        slug="/search?filters=publications-only&sort=year-desc"
        label="View all publications"
      />
      <div className="c-card-list__row">
        <AliceCarousel
          responsive={responsive}
          renderDotsItem={renderDotsItem}
          disableButtonsControls
        >
          {resources
            .map(resource => (resource.target ? resource.target : resource))
            .filter(({ _id = '' }) => _id)
            // loops through lists and return only a set with resources with unique ids
            .reduce((x, y) => (x.map(({ _id }) => _id).includes(y._id) ? x : [...x, y]), [])
            .map(
              ({
                title = '',
                _id = '',
                _type = '',
                slug = '',
                date = '',
                standfirst = '',
                topics = [],
                pdfFile = '',
              }) => (
                <div key={_id} className="c-card-list__item-box">
                  <div className="c-card-list__item" key={_id}>
                    <LinkToItem type={_type} slug={slug}>
                      <a>
                        {/* <div className="c-card-list__pdf-container">
                      {pdfFile && (
                        <div className="c-card-list__pdf-preview">
                          {
                            //useMediaQuery('tablet') && (
                            <Document file={pdfFile}>
                              <Page pageNumber={1} />
                            </Document>
                            //)
                          }
                        </div>
                      )}
                    </div> */}
                        {getPostType(_type) && (
                          <h5 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
                            {getPostType(_type)}
                          </h5>
                        )}
                        <div className="c-card-list__text">
                          <div>
                            <h4 className="u-primary-heading">{title}</h4>
                            <p className="c-featured-post__intro u-body--grey">{standfirst}</p>
                          </div>
                          <div>
                            <p className="c-featured-post__date u-body--small">
                              {date ? dateToString({ start: date.utc }) : null}
                            </p>
                          </div>
                        </div>
                      </a>
                    </LinkToItem>
                  </div>
                  <div>
                    {topics && <Topics title={false} topics={topics} hr={false} />}
                  </div>
                </div>
              )
            )}
        </AliceCarousel>
      </div>
      <div className="c-view-all">
        <a className="c-btn c-btn--link" href="/publications">
          View all
          <ArrowNext />
        </a>
      </div>
    </div>
  );
};
