import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ArrowNext } from '../icons/ArrowNext';
import { Post, POST_TYPE } from '../general/post/Post';
import PropTypes from 'prop-types';

const columnsByType = {
  [POST_TYPE.SMALL]: 3,
  [POST_TYPE.BLOG]: 3,
  [POST_TYPE.PUBLICATION]: 4,
  [POST_TYPE.LARGE]: 3,
};

export const PostCarousel = ({ posts, type, buttonPath, title, minPosts }) => {
  const responsive = {
    0: { items: 1.2 },
    568: { items: 2.2 },
    980: { items: columnsByType[type] },
  };
  //console.log('posts', posts);
  const items = posts && posts.map((post) => (
    <Post key={post._id} type={type} post={post}/>
  ));
  const renderDotsItem = ({ isActive }) => {
    return isActive ? (
      <div className="c-carousel-dots-active"/>
    ) : (
      <div className="c-carousel-dots-deactivated"/>
    );
  };
  return (
    <div className={`c-post-list c-post-list--2col c-post-list--column-${columnsByType[type]}`}>
      <div className="o-wrapper-medium">
      {title && <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">{title}</h4>}
      </div>
      <div className="c-post-list__col">
        <AliceCarousel
          items={items}
          responsive={responsive}
          renderDotsItem={renderDotsItem}
          disableButtonsControls
          disableDotsControls={items.length > minPosts ? false : true}
        />
        <div className="o-wrapper-medium c-view-all">
          <a className="c-btn c-btn--link" href={buttonPath}>
            View all
            <ArrowNext/>
          </a>
        </div>
      </div>
    </div>
  );
};

PostCarousel.defaultProps = {
  posts: [],
  type: '',
  title: '',
  buttonPath: '',
};

PostCarousel.propTypes = {
  posts: PropTypes.array,
  type: PropTypes.string,
  buttonPath: PropTypes.string,
  title: PropTypes.string,
};
