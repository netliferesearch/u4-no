import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { fetchAndMaterialize } from '../helpers/data-loader';
import { Layout } from '../components/Layout';
import Footer from '../components/general/footer/Footer';
//import PartnerAgencies from '../components/front-page/PartnerAgencies';
import { CTA } from '../components/front-page/CTA';
import { FeatureList } from '../components/front-page/FeatureList';
import { TopicCardList } from '../components/general/topics/TopicCardList';
import { LearningEvents } from '../components/front-page/LearningEvents';
import { FeaturedPosts } from '../components/front-page/FeaturedPosts';
import { POST_TYPE } from '../components/general/post/Post';
import { CARD_TYPE } from '../components/general/blue-card/BlueCard';
import { PostCarousel } from '../components/front-page/PostCarousel';
import { heroData } from '../components/front-page/data';
import { localize } from '../helpers/translate';

const PartnerAgencies = dynamic(() =>
  import('../components/front-page/PartnerAgencies')
);

const Frontpage = ({
  data: {
    frontPage = {},
    topics = {},
    featured = {},
    blogPosts = [],
    events = [],
    institutions = [],
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
        frontPage.imageUrl ||
        'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
    }}
  >
    <div className="c-frontpage">
      <section className="o-wrapper-full">
        <div className="">
          <CTA img={frontPage.imageUrl} data={heroData} blurDataURL={frontPage.imageBlurDataURL} />
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
            minPosts={3}
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <section className="o-wrapper-medium o-wrapper-mobile-full">
        <div>
          <PostCarousel
            posts={featured.publication}
            type={POST_TYPE.PUBLICATION}
            buttonPath="/publications"
            title="Latest publications"
            minPosts={4}
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <section className="">
        <div className="o-wrapper-medium">
          <LearningEvents
            events={events}
            type={events.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
          />
        </div>
      </section>
      <section className="o-wrapper-medium o-wrapper-tablet-full">
        <div className="u-bg--shifted">
          <FeatureList features={frontPage.sections[2].featureArray} />
        </div>
      </section>
      <section className="">
        <div className="o-wrapper-medium">
          <TopicCardList type={CARD_TYPE.TOPIC} topics={topics} />
        </div>
      </section>
      <section className="u-bg--lighter-blue o-wrapper-full">
        <PartnerAgencies partners={institutions} />
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

export default Frontpage;

const queryFunc = () => ({
  sanityQuery: `{
    "frontPage": *[(_type=="frontpage") && ((_id == "7d2f27a0-58b7-4ba0-8520-0e07bc879b04") || (slug.current == "frontpage-NEW"))][0]{id,title,sections,"imageUrl":featuredImage.asset->url,"imageBlurDataURL":featuredImage.asset->metadata.lqip,
    "resources": resources[]->{_id,_type, "publicationType": publicationType->title, "articleTypeTitle": articleType[0]->title, title, date, standfirst, topics[]->{title}, "slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title, "imageUrl": featuredImage.asset->url,"imageBlurDataURL":featuredImage.asset->metadata.lqip, "pdfFile": pdfFile.asset->url}[0..4]},
    "topics": *[_type == "topics"] | order(title) {_id, _type, title, longTitle, standfirst, slug, _updatedAt, "imageUrl": featuredImage.asset->url}[0..5],
    "featured": {"publication": *[_type  == "publication" && language == "en_US"] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8], "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0") && language == "en_US"] | order(date.utc desc) {_id, _type, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],},
    "blogPosts": *[_type == "blog-post" && language == "en_US" && !references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..8],
    "events": *[_type in ["course", "event"] && defined(startDate)]{_type, title, startDate, lead, "slug": slug.current, topics[]->{title}, eventType,"future": select(dateTime(startDate.utc)-dateTime(now()) >=0 => 1,0),"timedistance": select(dateTime(startDate.utc)-dateTime(now()) >=0 => dateTime(startDate.utc)-dateTime(now()),dateTime(now())-dateTime(startDate.utc))}|order(future desc,timedistance asc)[0..2],
    "institutions": *[_type == 'institution' && funder == true && !(_id in path "drafts.**")]
    | order(name){_id, ${localize('name')}, funder, svgLogo, website},
  }`,
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 0,
  });
  if (error === 'No content found (dataLoader said this)') {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate: 60,
  };
};
