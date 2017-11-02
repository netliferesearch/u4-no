import React from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'frontpage-feature',
  prefix: 'c-',
});

const FrontpageFeature = ({ topics = {} }) => (
  <div {...classes()}>
    <section className="o-wrapper-inner o-wrapper--padded">
      <h3 {...classes('heading')}>Knowledge on</h3>
      <ul {...classes('list')}>
        {topics.map(topic =>
          (<li {...classes('list-item')}>
            <Link route="topic.entry" params={{ slug: topic.slug.current }}>
              <a {...classes('link')}>
                {topic.title}
              </a>
            </Link>
          </li>),
        )}
      </ul>
    </section>
  </div>
);

export default FrontpageFeature;
