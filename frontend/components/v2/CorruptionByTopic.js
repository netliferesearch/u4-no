import React from 'react';
import Link from 'next/link';

const CorruptionByTopic = ({ topics }) => {
  return (
    <div className="c-frontpage-blue-section__content c-frontpage-blue-section__by-topic">
      <h2 className="u-blue-underline u-navy-big-headline">Corruption by topic</h2>

      <div className="cols">
        <div className="col">
          <ul>
            {topics.slice(0, 6).map((topic, index) => (
              <li key={topic._id}>
                <Link href={`/topics/${topic.slug.current}`}>
                  <a>{topic.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <ul>
            {topics.slice(6, 12).map((topic, index) => (
              <li key={topic._id}>
                <Link href={`/topics/${topic.slug.current}`}>
                  <a>{topic.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <ul>
            {topics.slice(12, 18).map((topic, index) => (
              <li key={topic._id}>
                <Link href={`/topics/${topic.slug.current}`}>
                  <a>{topic.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CorruptionByTopic;
