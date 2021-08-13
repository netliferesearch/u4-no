import React, { useState } from 'react';
import { sortBy } from 'lodash';
import Link from 'next/link';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import DataLoader from '../../helpers/data-loader';
import dateToString from '../../helpers/dateToString';

function sortTopics(items, key) {
  // console.log('items->', items, 'key->', key);
  return sortBy(items, [key]);
}

function sortDate(items) {
  return sortBy(items, function(dateObj) {
    return dateObj._updatedAt;
  }).reverse();
}
const TopicOverview = ({ data: { topics = [] } }) => {
  const [sortType, setSortType] = useState('topics');

  const changeSortType = event => {
    // console.log(event.target.value);
    setSortType(event.target.value);
  };

  return (
    <Layout
      topics={topics}
      headComponentConfig={{
        title: 'Topic overview',
      }}
    >
      <div className="c-topic-index__main-box o-wrapper u-tl">
        <div className="o-wrapper-full-width">
          <div className="c-topic-index__main-title-box o-wrapper-medium">
            <h1 className="u-primary-heading">Research topics</h1>
            <p className="u-body--grey">
              What is corruption? The basics of corruption and anti-corruption efforts for
              sustainable and inclusive development
            </p>
          </div>
          <div className="c-topic-index__seperator" />
        </div>

        <section id="topics" className=" c-topic-index__list o-wrapper-medium u-margin-bottom-huge">
          <p className="c-topic-index__topic-count u-body--small">
            {topics.length} Research topics
          </p>
          <form
            className="c-topic-index__radio-form"
            value={sortType}
            onChange={event => changeSortType(event)}
          >
            <p className="c-topic-index__order-text u-body--grey">Order:</p>
            <label className="c-topic-index__radio-container u-body">
              <input type="radio" value="topics" checked={sortType === 'topics'} />
              {/* <span className="c-topic-index__checkmark" /> */}
              <p className="c-topic-index__sort-type-text">Alphabetically</p>
            </label>
            <label className="c-topic-index__radio-container u-body">
              <input type="radio" value="date" checked={sortType === 'date'} />
              {/* <span className="c-topic-index__checkmark" /> */}
              <p className="c-topic-index__sort-type-text"> Last update</p>
            </label>
          </form>

          <ul className="c-topic-index-list__box">
            {(sortType === 'topics' ? sortTopics(topics, 'title') : sortDate(topics)).map(
              ({
                _id = false,
                title = 'Title is lacking',
                longTitle = '',
                slug = {},
                _updatedAt = '',
                relatedCount = 0,
                _type = '',
              }) => (
                <li key={_id} className="c-topic-index-list__item">
                  <Link href={`/topics/${slug.current}`}>
                    <a>
                      <div className="c-topic-index-list__item-text">
                        <div className="c-topic-index__titles-holder">
                          <h2 className="u-secondary-h2 u-text--white">{title}</h2>
                          <p className="u-body u-text--grey c-topic-index-paragraph">{longTitle}</p>
                        </div>
                        <p className="c-topic-index__date  u-body--small">
                          {_updatedAt
                            ? 'Updated' + ' ' + dateToString({ start: _updatedAt })
                            : null}
                        </p>
                        <div>
                          {/* <Link href={`/topics/${topic.slug.current}`}> */}
                          {/* <div className="c-btn c-btn--sec">
                        <span>Learn more</span>
                      </div> */}
                          {/* </Link> */}
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
                // <div className="o-layout--middle c-topic-index__item" key={_id}>
                //   <div className="o-layout__item c-topic-index__item-child u-1/2@tablet u-tr">
                //     <div className="c-topic-index__left">
                //       <Link href={`/topics/${slug.current}`}>
                //         {relatedCount > 0 ? (
                //           <a className="c-topic-index__title">{title}</a>
                //         ) : (
                //           <a className="c-topic-index__title">{title}</a>
                //         )}
                //       </Link>
                //     </div>
                //   </div>
                //   <div className="o-layout__item  c-topic-index__item-child  u-1/2@tablet u-tl">
                //     <div className="c-topic-index__right">
                //       <svg
                //         width={`${relatedCount}px`}
                //         height="5px"
                //         viewBox={`0 0 ${relatedCount} 2`}
                //         version="1.1"
                //         xmlns="http://www.w3.org/2000/svg"
                //         xmlnsXlink="http://www.w3.org/1999/xlink"
                //       >
                //         <path d="M167.536783,1 L1,1" id="Line" stroke="#1E2051" />
                //       </svg>
                //       {relatedCount > 0 ? (
                //         <span className="c-topic-index__count">{relatedCount}</span>
                //       ) : (
                //         <span className="c-topic-index__count">{relatedCount}</span>
                //       )}
                //     </div>
                //   </div>
                // </div>
              )
            )}
          </ul>
        </section>
      </div>
      <section className="u-bg-dark-blue u-side-padding o-wrapper-full-width">
        <Footer />
      </section>
    </Layout>
  );
};

export default DataLoader(TopicOverview, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: () => ({
    sanityQuery:
      '{"topics": *[_type == "topics"]{_id, title, longTitle, slug, _updatedAt, "relatedCount": count(*[_type in ["publication", "helpdesk"] && references(^._id)])}|order(title asc)}',
  }),
  materializeDepth: 0,
});
