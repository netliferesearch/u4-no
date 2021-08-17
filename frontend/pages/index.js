import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../helpers/data-loader';
import { Layout } from '../components/Layout';
import Footer from '../components/general/footer/Footer';
import PartnerAgencies from '../components/front-page/PartnerAgencies';
import { CTA } from '../components/front-page/CTA';
import { FeatureList } from '../components/general/FeatureList';
import { TopicCardList } from '../components/CorruptionByTopic';
import { LearningEvents } from '../components/LearningEvents';
import { FeaturedPosts } from '../components/front-page/FeaturedPosts';
import { POST_TYPE } from '../components/general/post/Post';
import { PostCarousel } from '../components/front-page/PostCarousel';
import { heroData } from '../components/front-page/data';

const Frontpage = ({
  data: {
    // allFrontPages = [],
    // ORGfrontPage = {},
    frontPage = {},
    topics = {},
    featured = {},
    blogPosts = [],
    events = [],
  },
}) => (
  <Layout
    hideLogo={false}
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
      {/* {console.log('allFronts', allFrontPages)}
      {console.log('ORGfrontPage', ORGfrontPage)} */}
      {/* {console.log('frontPage', frontPage.sections)} */}
      <section className="o-wrapper-full">
        <div className="">
          <CTA img={frontPage.imageUrl} data={heroData}/>
        </div>
      </section>
      <section className="u-bg--lighter-blue o-wrapper-full">
        <div className="o-wrapper-medium">
          <FeaturedPosts featured={frontPage.resources} />
        </div>
      </section>
      <section className="">
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <PostCarousel
            posts={blogPosts}
            type={POST_TYPE.BLOG}
            buttonPath="/blog"
            title="From the blog"
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <section className="">
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <PostCarousel
            posts={featured.publication}
            type={POST_TYPE.PUBLICATION}
            buttonPath="/publications"
            title="Latest publications"
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      {/*<section className="o-wrapper u-side-padding">*/}
      {/*  <div className="o-wrapper-medium">*/}
      {/*    <CardList resources={featured.publication} />*/}
      {/*    /!*<hr className="u-section-underline--no-margins" />*!/*/}
      {/*  </div>*/}
      {/*</section>*/}
      <section className="">
        <div className="o-wrapper-medium">
          <LearningEvents events={events} />
        </div>
      </section>
      <section className="o-wrapper-full">
        <div className="u-bg--shifted">
          <FeatureList features={frontPage.sections[2].featureArray} />
        </div>
      </section>
      <section className="">
        <div className="o-wrapper-medium">
          <TopicCardList topics={topics} />
        </div>
      </section>
      <section className="u-bg--lighter-blue o-wrapper-full">
        <PartnerAgencies />
      </section>
      <section className="o-wrapper-full">
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
      "frontPage": *[_type=="frontpage" && slug.current == "frontpage-NEW"][0]{id,title,sections,"imageUrl": featuredImage.asset->url, "resources": resources[]->{_id,_type, "publicationType": publicationType->title, title, date, standfirst, topics[]->{title}, "slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title, "imageUrl": featuredImage.asset->url, "pdfFile": pdfFile.asset->url}[0..2]},
      "topics": *[_type == "topics"] | order(title) {_id, title, longTitle, slug, _updatedAt, "imageUrl": featuredImage.asset->url}[0..5],
      "featured": {"publication": *[_type  == "publication"] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8], "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],},
      "blogPosts": *[_type == "blog-post" && !references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..8],
      "events": *[_type in ["course", "event"]] | order(startDate.utc desc) {_type, title, startDate, lead, "slug": slug.current, topics[]->{title}}[0..2],
    }`,
  }),
  materializeDepth: 0,
});

//For logging old front page as well:
// export default DataLoader(Frontpage, {
//   queryFunc: () => ({
//     sanityQuery: `{
//       "allFrontPages": *[_type=="frontpage"],
//       "ORGfrontPage": *[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]{id,title,sections,"imageUrl": featuredImage.asset->url, "resources": resources[]->{_id,_type, "publicationType": publicationType->title, title, date, standfirst, topics[]->{title}, "slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title, "imageUrl": featuredImage.asset->url, "pdfFile": pdfFile.asset->url}[0..2]},
//       "frontPage": *[_type=="frontpage" && slug.current == "frontpage-NEW"][0]{id,title,sections,"imageUrl": featuredImage.asset->url, "resources": resources[]->{_id,_type, "publicationType": publicationType->title, title, date, standfirst, topics[]->{title}, "slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title, "imageUrl": featuredImage.asset->url, "pdfFile": pdfFile.asset->url}[0..2]},
//       "topics": *[_type == "topics"] | order(title) {_id, title, longTitle, slug, _updatedAt, "imageUrl": featuredImage.asset->url}[0..5],
//       "featured": {"publication": *[_type  == "publication"] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8], "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],},
//       "blogPosts": *[_type == "blog-post" && !references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..8],
//       "events": *[_type in ["course", "event"]] | order(startDate.utc desc) {_type, title, startDate, lead, "slug": slug.current, topics[]->{title}}[0..2],
//     }`,
//   }),
//   materializeDepth: 0,
// });

//Original query:
// export default DataLoader(Frontpage, {
//   queryFunc: () => ({
//     sanityQuery: `{
//       "frontPage": *[_id == "ea5779de-5896-44a9-8d9e-31da9ac1edb2"][0]{id,title,sections,"imageUrl": featuredImage.asset->url,"resources": resources[]->{_id,_type, "publicationType": publicationType->title, "articleType": articleType[0]->title, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}},
//       "topics": *[_type == "topics"] | order(title) {_id, title, slug,  "imageUrl": featuredImage.asset->url}
//     }`,
//   }),
//   materializeDepth: 0,
// });
