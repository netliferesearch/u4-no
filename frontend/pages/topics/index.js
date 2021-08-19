import React, { useEffect, useState } from 'react';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import DataLoader from '../../helpers/data-loader';
import { CARD_TYPE } from '../../components/general/blue-card/BlueCard';
import { TopicCardList } from '../../components/general/topics/TopicCardList';
import { PageIntro } from '../../components/general/PageIntro';
import {
  sortByDate,
  sortTopics,
  topicsPageContent,
} from '../../components/general/topics/topics-helpers';
import { RadioSort } from '../../components/general/sort/RadioSort';

const TopicsOverview = ({ data: { topics = [] } }) => {
  const [sortType, setSortType] = useState('topics');
  const [sortedTopics, setSortTopics] = useState(topics);

  useEffect(
    () => {
      if (sortType === 'topics') {
        setSortTopics(sortTopics(topics, 'title'));
      } else {
        setSortTopics(sortByDate(topics));
      }
    },
    [sortType]
  );

  const handleChange = event => {
    setSortType(event.target.value);
  };

  return (
    <Layout
      headComponentConfig={{
        title: 'Topic overview',
      }}
    >
      <div className="c-topic-index">
        <section className="o-wrapper-full">
          <div className="o-wrapper-medium">
            <PageIntro title={topicsPageContent.title} text={topicsPageContent.intro} />
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="c-topic-index__list o-wrapper-full">
          <div className="o-wrapper-medium">
            <p className="c-topic-index__topic-count u-body--small u-text--grey">
              {sortedTopics.length} {topicsPageContent.title}
            </p>
            <RadioSort
              sortTypes={topicsPageContent.sort}
              handleChange={handleChange}
              currentSortType={sortType}
            />
            <TopicCardList
              type={CARD_TYPE.TOPIC}
              topics={sortedTopics}
              showIntro={false}
              showLink={false}
            />
          </div>
        </section>
      </div>
      <Footer />
    </Layout>
  );
};

export default DataLoader(TopicsOverview, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: () => ({
    sanityQuery:
      '{"topics": *[_type == "topics"]{_id, _type, title, longTitle, slug, _updatedAt, "relatedCount": count(*[_type in ["publication", "helpdesk"] && references(^._id)])}|order(title asc)}',
  }),
  materializeDepth: 0,
});
