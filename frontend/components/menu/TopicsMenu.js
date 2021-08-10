import React from 'react';
import { MenuItem } from './MenuItem';

export const TopicsMenu = ({ topics = [] }) => {
  return (
    <div className="c-menu__topics">
      <ul className="c-menu__list">
        {topics.slice(0, 9).map(topic => (
          <MenuItem key={topic._id} label={topic.title} slug={`/topics/${topic.slug.current}`} />
        ))}
      </ul>
      <ul className="c-menu__list">
        {topics.slice(9, 18).map(topic => (
          <MenuItem key={topic._id} label={topic.title} slug={`/topics/${topic.slug.current}`} />
        ))}
      </ul>
      <ul className="c-menu__list">
        {topics.slice(18).map(topic => (
          <MenuItem key={topic._id} label={topic.title} slug={`/topics/${topic.slug.current}`} />
        ))}
      </ul>
    </div>
  );
};
