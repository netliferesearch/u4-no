import React from 'react';
import { SectionIntro } from '../SectionIntro';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ArrowNext } from '../icons/ArrowNext';
import { Post, POST_SIZE } from '../general/post/Post';
import PropTypes from 'prop-types';

export const PostList = ({ insights }) => {
  const responsive = {
    0: { items: 1.2 },
    568: { items: 1.2 },
    980: { items: 3 },
  };
  console.log('insights', insights);
  const renderDotsItem = ({ isActive }) => {
    return isActive ? (
      <div className="c-carousel-dots-active"/>
    ) : (
      <div className="c-carousel-dots-deactivated"/>
    );
  };
  return (
    <div className="c-post-list c-post-list--2col">
      <SectionIntro
        title="Latest from the blog"
        slug="/blog"
        label="View blog"
      />

      <div className="c-post-list__col">
        <AliceCarousel
          responsive={responsive}
          renderDotsItem={renderDotsItem}
          disableButtonsControls
        >
          {insights && insights.map((post) => (
            <Post key={post._id} size={POST_SIZE.NORMAL} post={post}/>
          ))}
        </AliceCarousel>
        <div className="c-view-all">
          <a className="c-topic-view-all" href="/blog">
            View all
            <ArrowNext/>
          </a>
        </div>
      </div>
    </div>
  );
};

PostList.defaultProps = {
  insights: [],
};

PostList.propTypes = {
  insights: PropTypes.array,
};
