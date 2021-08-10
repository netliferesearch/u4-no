import { SectionTitle } from '../general/typography/SectionTitle';
import { Post } from '../general/post/Post';
import React from 'react';

export const FeaturedPosts = ({ featured }) => {
  console.log('featured', featured)
  return <div className="featured">
    <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Featured content</h4>
    <div>
      {featured.map((post) => <Post key={post._id} post={post} />)}
    </div>
  </div>;
};

