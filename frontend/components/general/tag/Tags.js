import React from 'react';

const Tag = ({ title }) => {
  return (
      <div className="tag">{title}</div>
  );
};

export const Tags = ({ tags }) => {
  return <div className="tags">
    {tags && tags.map((tag, index) => <Tag key={index} title={tag.title}/>)}
  </div>;
};