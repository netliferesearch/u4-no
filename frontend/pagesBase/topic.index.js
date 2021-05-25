import React from 'react';
import { sortBy } from 'lodash';
import { Link } from '../routes';
import { Footer, Layout, Newsletter } from '../components';
import DataLoader from '../helpers/data-loader';
import { DownArrowButton } from '../components/buttons';

function sortTopics(items, key) {
  return sortBy(items, [key]);
}
const TopicOverview = ({ data: { topics = [] } }) => (
  <Layout
    topics={topics}
    headComponentConfig={{
      title: 'Topic overview',
    }}
  >
    <div className="o-wrapper u-tc">
      <h1 className="c-topic-heading">Topics</h1>

      <section id="topics" className=" c-topic-index__list u-margin-bottom-huge">
        {sortTopics(
          topics,
          'title',
        ).map(({
 _id = false, title = 'Title is lacking', slug = {}, relatedCount = 0,
}) => (
  <div className="o-layout--middle c-topic-index__item" key={_id}>
    <div className="o-layout__item c-topic-index__item-child u-1/2@tablet u-tr">
      <div className="c-topic-index__left">
        <Link route="topic.entry" params={{ slug: slug.current }}>
          {relatedCount > 0 ? (
            <a className="c-topic-index__title">{title}</a>
                  ) : (
                    <a className="c-topic-index__title">{title}</a>
                  )}
        </Link>
      </div>
    </div>
    <div className="o-layout__item  c-topic-index__item-child  u-1/2@tablet u-tl">
      <div className="c-topic-index__right">
        <svg
          width={`${relatedCount}px`}
          height="5px"
          viewBox={`0 0 ${relatedCount} 2`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path d="M167.536783,1 L1,1" id="Line" stroke="#1E2051" />
        </svg>
        {relatedCount > 0 ? (
          <span className="c-topic-index__count">{relatedCount}</span>
                ) : (
                  <span className="c-topic-index__count">{relatedCount}</span>
                )}
      </div>
    </div>
  </div>
        ))}
      </section>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(TopicOverview, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: () => ({
    sanityQuery:
      '{"topics": *[_type == "topics"]{_id, title, slug, "relatedCount": count(*[_type in ["publication", "helpdesk"] && references(^._id)])}|order(title asc)}',
  }),
  materializeDepth: 0,
});
