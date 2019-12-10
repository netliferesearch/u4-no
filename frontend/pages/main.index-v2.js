import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../helpers/data-loader';
import Guidance from '../components/c-front-v2/Guidance';
import CorruptionByTopic from '../components/c-front-v2/CorruptionByTopic';
import FeaturedPosts from '../components/c-front-v2/FeaturedPosts';
import LayoutV2 from '../components/LayoutV2';
import InsightPosts from '../components/c-front-v2/InsightPosts';
import RecentPublications from '../components/c-front-v2/RecentPublications';
import NewsAndEvents from '../components/c-front-v2/NewsAndEvents';
const FrontpageV2 = ({
  data: { frontPage = {}, topics = {}, featured = {}, insights = [], events = [] },
}) => (
  <LayoutV2
    hideLogo={false}
    noSearch={false}
    headComponentConfig={{
      title: 'U4 Anti-Corruption Resource Centre',
      description:
        'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
      url: 'https://www.u4.no',
      image:
        frontPage.ImageUrl ||
        'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
    }}
  >
    <section className="c-frontpage-blue-section">
      <div className="o-wrapper-section">
        <Guidance />
      </div>
    </section>

    <section className="o-wrapper">
      <div className="o-wrapper-section">
        <FeaturedPosts featured={featured} />
      </div>
    </section>

    <section className="o-wrapper">
      <div className="o-wrapper-section">
        <InsightPosts insights={insights} />
      </div>
    </section>

    <section className="o-wrapper u-margin-bottom-large">
      <div className="o-wrapper-section">
        <RecentPublications resources={frontPage.resources} />
      </div>
    </section>

    <section className="c-frontpage-blue-section">
      <div className="o-wrapper-section">
        <CorruptionByTopic topics={topics} />
      </div>
    </section>

    <section className="o-wrapper">
      <div className="o-wrapper-section">
        <NewsAndEvents events={events} />
      </div>
    </section>
  </LayoutV2>
);

FrontpageV2.propTypes = {
  data: PropTypes.shape({
    frontPage: PropTypes.object,
    topics: PropTypes.array,
    featured: PropTypes.object,
    insights: PropTypes.array,
    events: PropTypes.array,
  }).isRequired,
};

export default DataLoader(FrontpageV2, {
  queryFunc: () => ({
    sanityQuery: `{
      "frontPage": *[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]{id,title,sections,"imageUrl": featuredImage.asset->url,
      "resources": resources[]->{_id,_type, "publicationType": publicationType->title, title, date, standfirst, topics[]->{title}, "slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title, "imageUrl": featuredImage.asset->url, pdfFile}[0..2]},
      "topics": *[_type == "topics"] | order(title) {_id, title, slug,  "imageUrl": featuredImage.asset->url},
      "featured": {"publication": *[_type  == "publication" && references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0],
      "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],},
      "insights": *[_type == "blog-post" && !references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],
      "events": *[_type in ["course", "event"]] | order(startDate.utc desc) {_type, title, startDate, lead, "slug": slug.current, topics[]->{title}}[0..2],
    }`,
  }),
  materializeDepth: 0,
});
