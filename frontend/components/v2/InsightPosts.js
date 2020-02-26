import React from 'react';
import dateToString from '../../helpers/dateToString';
import BEMHelper from 'react-bem-helper';
import { Link } from '@reach/router';

const InsightPosts = ({ insights }) => {
  const classes = BEMHelper({ name: 'frontpage-section', prefix: 'c-' });
  return (
    <div className="c-frontpage-section__content c-frontpage-section__insights">
      <div className="sidebar">
        <h2 className="u-blue-underline u-navy-big-headline">Insights from our blog</h2>
        <div className="bottom">
          <p>A nice sentence about our blog – what is the purpose and what readers can expect.</p>
          <a
            href="/blog"
            {...classes('view-all')}
          >
            View all <img alt="Close icon" src="/static/arrow-right-slim.svg" />
          </a>
        </div>
      </div>
      <div className="col">
        {insights.map((post, index) => (
          <div className="col row" key={index}>
            <div
              className="post-image"
              style={{ backgroundImage: `url('${post.imageUrl}?w=800')` }}
            />
            <div className="text">
              <h6 {...classes('publication-type')}>Blog post</h6>
              <a href={`blog/${post.slug}`} {...classes('publication-headline')}>
                <h3 {...classes('publication-headline')}>{post.title}</h3>
              </a>
              <p {...classes('publication-intro')}>{post.standfirst}</p>
              <p {...classes('date')}>{dateToString({ start: post.date.utc })}</p>
              <div {...classes('topic')}>
                {post.topics &&
                  post.topics.map((topic, index) => {
                    return (
                      <span className="topic" key={index}>
                        {topic.title}
                      </span>
                    );
                  })}
              </div>
            </div>
            <hr className="u-section-underline" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightPosts;
