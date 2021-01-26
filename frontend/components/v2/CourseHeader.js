import React from 'react';
import { Share } from './ShareOnSocialMedia';
import { Link } from '../../routes';
import ReactPlayer from 'react-player';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';
import { RegisterForm } from './RegisterForm';

export const CourseHeader = ({ data }) => {
  console.log(data);
  const { title = '', lead = '', featuredImage = '', vimeo = '', topics = [], courseType } = data;
  return data ? (
    <div className="o-wrapper-section-desktop--full c-blog-entry__header">
      <div
        className={`c-blog-entry__intro ${
          featuredImage ? '' : 'c-blog-entry__intro--no-img'
        }`}
      >
        <div>
          <Link route={'/online-courses'}>
            <a className="c-btn--sen">
              <h6>Online course</h6>
            </a>
          </Link>

          <h2 className="u-heading--1">{title}</h2>
          {lead && <p className="c-blog-entry__standfirst">{lead}</p>}
        </div>
        <div className="c-blog-entry__header-row">
          {topics ? (
            <div className="c-blog-entry__topics">
              {topics.map((topic, index) => (
                <span className="topic" key={index}>
                  <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                    <a className="c-btn--ter">
                      <div>{topic.title}</div>
                    </a>
                  </Link>
                  <span>{`${topics.length > 1 && index + 1 < topics.length ? ', ' : ''}`}</span>
                </span>
              ))}
            </div>
          ) : null}
          <div className="c-blog-sidebar__share-container u-hidden--tablet">
            <RegisterForm courseType={courseType}/>
            <Share text={title} />
          </div>
        </div>
      </div>
      {vimeo ? (
        <div className={`u-video ${vimeo.size || ''}`}>
          <ReactPlayer
            controls
            width="100%"
            height="0"
            config={{
              preload: true,
            }}
            style={{
              margin: '0 auto',
            }}
            url={vimeo.src}
          />
        </div>
      ) : featuredImage && featuredImage.asset ? (
        <figure className="c-blog-entry__featured-image u-hidden--tablet">
        <img
          src={`${featuredImage.asset.url}?w=520`}
          alt={featuredImage.asset.altText ? featuredImage.asset.altText : 'Featured image'}
        />
        {/* <figcaption className="u-hidden--desktop">
          <PhotoCaptionCredit featuredImage={featuredImage} />
        </figcaption> */}
      </figure>
        // <div
        //   className="c-blog-entry__featured-image c-blog-entry__featured-image--bg u-hidden--tablet"
        //   style={{ backgroundImage: `url('${featuredImage}?w=518')` }}
        // />
      ) : 
      null}
    </div>
  ) : null;
};
