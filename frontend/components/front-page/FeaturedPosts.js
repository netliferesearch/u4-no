import { Post, POST_TYPE } from '../general/post/Post';
import React from 'react';
import { getPlaceholder } from '../../helpers/imgloader';

export const FeaturedPosts = ({ featured }) => {
  if (!featured || featured.length === 0) return null;
  return (
    <div className="section-featured-posts">
      <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Featured content</h4>
      <div className="featured-posts">
        <div className="large">
          <Post
            key={featured[0]._id}
            type={POST_TYPE.LARGE}
            post={featured[0]}
            placeholder={getPlaceholder(0)}
          />
        </div>
        <div className="small">
          {featured
            .filter((p, i) => (i !== 0) && p )
            .map((post, index) => (
              <Post
                key={post._id}
                type={POST_TYPE.SMALL}
                post={post}
                placeholder={getPlaceholder(index + 1)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
