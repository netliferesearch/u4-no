import React from 'react';
import { sortBy } from 'lodash';
import { Link } from '../routes';
import { Footer, Layout } from '../components';
import DataLoader from '../helpers/data-loader';
import { DownArrowButton } from '../components/buttons';

function sortTopics(items, key) {
  return sortBy(items, [key]);
}
const TopicOverview = ({ topics = [] }) => (
  <Layout>
    <div className="o-wrapper-inner u-tl">
      <h1 className="c-topic-index__title">Topics</h1>

      <section id="topics" className="o-wrapper-inner c-topic-index__list">
        {sortTopics(
          topics,
          'title',
        ).map(
          ({
            _id = false,
            title = 'Title is lacking',
            slug = {},
            related = false,
          }) => (
            <div className="c-topic-index__item" key={_id}>
              <Link route="topic.entry" params={{ slug: slug.current }}>
                <a className="c-topic-index__title">{title}</a>
              </Link>
              <svg width={`${related}px`} height="5px" viewBox={`0 0 ${related} 2`} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path d="M167.536783,1 L1,1" id="Line" stroke="#1E2051"></path>
              </svg><span className="c-topic-index__count">{related}</span>
            </div>
          ),
        )}
      </section>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(TopicOverview, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: () => ({
    sanityQuery: '{"topics": *[_type in ["topics"] && !(_id in path "drafts.**") ]{_id, title, slug, "related": count(*[_type in ["publication", "helpdesk"] && references(^._id)])}|order(title asc)}',
  }),
  materializeDepth: 2,
});
