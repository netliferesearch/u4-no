import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../helpers/data-loader';
import { Layout } from '../components/Layout';
import Footer from '../components/Footer';
import PartnerAgencies from '../components/PartnerAgencies';
import { FeaturedPost } from '../components/FeaturedPosts';
import { CTA } from '../components/Guidance';
import { PostList } from '../components/InsightPosts';
import { CardList } from '../components/RecentPublications';
import { FeatureList } from '../components/FeatureList';
import { TopicCardList } from '../components/CorruptionByTopic';

const Frontpage = ({
  data: { frontPage = {}, topics = {}, featured = {}, blogPosts = [], events = [] },
}) => (
  <Layout
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
    <div className="c-frontpage">
      <section className="o-wrapper u-side-padding">
        <div className="o-wrapper-medium">
          <CTA />
        </div>
      </section>
      <hr className="u-section-underline--no-margins" />
      <section className="o-wrapper u-side-padding">
        <div className="o-wrapper-medium">
          <FeaturedPost featured={frontPage.resources} />
        </div>
      </section>
      <hr className="u-section-underline--no-margins" />

      <section className="o-wrapper u-side-padding">
        <div className="o-wrapper-medium">
          <PostList insights={blogPosts} />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <section className="o-wrapper u-side-padding">
        <div className="o-wrapper-medium">
          <CardList resources={featured.publication} />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <section className="o-wrapper u-side-padding">
        <div className="o-wrapper-medium">
          <FeatureList /> <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <section className="o-wrapper u-side-padding">
        <div className="o-wrapper-medium">
          <TopicCardList topics={topics} />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <section className="u-side-padding">
        <PartnerAgencies />
      </section>
      <section className="u-bg-light-grey u-side-padding">
        <Footer />
      </section>
    </div>
  </Layout>
);

Frontpage.propTypes = {
  data: PropTypes.shape({
    frontPage: PropTypes.object,
    topics: PropTypes.array,
    featured: PropTypes.object,
    blogPosts: PropTypes.array,
    events: PropTypes.array,
  }).isRequired,
};

export default DataLoader(Frontpage, {
  queryFunc: () => ({
    sanityQuery: `{
      "frontPage": *[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]{id,title,sections,"imageUrl": featuredImage.asset->url, "resources": resources[]->{_id,_type, "publicationType": publicationType->title, title, date, standfirst, topics[]->{title}, "slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title, "imageUrl": featuredImage.asset->url, "pdfFile": pdfFile.asset->url}[0..2]},
      "topics": *[_type == "topics"] | order(title) {_id, title, longTitle, slug, "imageUrl": featuredImage.asset->url}[0..5],
      "featured": {"publication": *[_type  == "publication"] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..2], "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],},
      "blogPosts": *[_type == "blog-post" && !references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..2],
      "events": *[_type in ["course", "event"]] | order(startDate.utc desc) {_type, title, startDate, lead, "slug": slug.current, topics[]->{title}}[0..2],
    }`,
  }),
  materializeDepth: 0,
});

//
// export default DataLoader(Frontpage, {
//   queryFunc: () => ({
//     sanityQuery: `{
//       "frontPage": *[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]{id,title,sections,"imageUrl": featuredImage.asset->url,"resources": resources[]->{_id,_type, "publicationType": publicationType->title, "articleType": articleType[0]->title, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}},
//       "topics": *[_type == "topics"] | order(title) {_id, title, slug,  "imageUrl": featuredImage.asset->url}
//     }`,
//   }),
//   materializeDepth: 0,
// });
