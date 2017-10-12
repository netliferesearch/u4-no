import React from 'react';
import { sortBy } from 'lodash';
import { Link } from '../routes';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';

function sortTopics(items, key) {
  return sortBy(items, [key]);
}
const TopicOverview = ({ topics = [] }) => (
  <Layout>
    <div className="o-wrapper-inner">
      <div className="c-overview-page-header">
        <h1 className="c-overview-page__title">
          U4 anti-corruption guides for development practitioners and policymakers
        </h1>
        <p>What you'll find: </p>
        <p>What you won't find: </p>
        <p>Why we built this: </p>
        <p>
          Need to quickly get up to speed on anti-corruption research in sustainable development? We
          want to share our knowledge by providing you with a selection of carefully crafted
          introductions and in-depth articles sorted by topics.
        </p>
      </div>

      <section>
        {sortTopics(
          topics,
          'title',
        ).map(
          ({
            _id = false,
            title = 'Title is lacking',
            explainerText = '',
            featuredImage,
            slug = {},
            subtitle = '',
          }) => (
            <div className="c-duo__item" key={_id}>
              <div className="c-duo__body">
                <h2 className="c-duo__title">
                  <Link route="topic.entry" params={{ slug: slug.current }}>
                    <a className="c-duo__link">{title}</a>
                  </Link>
                </h2>
                <span className="c-duo__subtitle">{subtitle}</span>
                {explainerText && <p className="c-duo__text">{explainerText}</p>}
              </div>
            </div>
          ),
        )}
      </section>
    </div>
  </Layout>
);

export default DataLoader(TopicOverview, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: () => ({
    sanityQuery: '{"topics": *[_type in ["topics"] && !(_id in path "drafts.**") ]}',
  }),
  materializeDepth: 2,
});
