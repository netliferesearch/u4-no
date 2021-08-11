import { Post, POST_SIZE } from '../general/post/Post';
import React from 'react';

export const FeaturedPosts = ({ featured }) => {
  if (!featured || featured.length === 0) return null;
  return <div className="section-featured-posts">
    <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Featured content</h4>
    <div className="featured-posts">
      <div className="large">
        <Post key={featured[0]._id} size={POST_SIZE.LARGE} post={featured[0]}/>
      </div>
      <div className="small">
        {featured.filter((p, i) => i !== 0).map((post, index) => <Post key={post._id} size={POST_SIZE.SMALL}
                                                                       post={post}/>)}
      </div>
    </div>
  </div>;
};

