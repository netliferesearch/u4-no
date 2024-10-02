import React from 'react';
import { groq } from 'next-sanity';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import { Layout } from '@/app/components/layout/Layout';
import Footer from '../components/general/footer/Footer';
import PartnerAgencies from '../components/front-page/PartnerAgencies';
import { CTA } from '../components/front-page/CTA';
import { FeatureList } from '@/app/components/front-page/FeatureList';
import { TopicCardList } from '../components/general/topics/TopicCardList';
import { LearningEvents } from '../components/front-page/LearningEvents';
import { FeaturedPosts } from '../components/front-page/FeaturedPosts';
import { POST_TYPE } from '../components/general/post/Post';
import { CARD_TYPE } from '../components/general/blue-card/BlueCard';
import { PostCarousel } from '../components/front-page/PostCarousel';
import { heroData } from '../components/front-page/data';

export default async function Frontpage(params) {
  const data = await getData(params);
  const {
      frontPage = {},
      topics = {},
      featured = {},
      blogPosts = [],
      events = [],
      institutions = [],
    } = data;

    return (
  <Layout >
    <div className="c-frontpage">
      <section className="o-wrapper-full">
        <div className="">
          <CTA img={frontPage.imageUrl} data={heroData} blurDataURL={frontPage.imageBlurDataURL} altText={frontPage.imageAltText}/>
        </div>
      </section>
      <section className="u-bg--lighter-blue o-wrapper-full">
        <div className="o-wrapper-medium">
          {frontPage.resources && 
            <FeaturedPosts featured={frontPage.resources} />
          }
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
          {frontPage.sections[2]?.featureArray && 
            <FeatureList features={frontPage.sections[2].featureArray} />
          }
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
    </div>
  </Layout>
)};


export async function generateMetadata() {
 
  return getMetadata({
    title: 'U4 Anti-Corruption Resource Centre',
    description: 'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
    image: 'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png'
  });
}

const sanityQuery2 = `{
    "frontPage": *[(_type=="frontpage") && ((_id == "7d2f27a0-58b7-4ba0-8520-0e07bc879b04") || (slug.current == "frontpage-NEW"))][0]{_id,title,sections,"imageUrl":featuredImage.asset->url,"imageBlurDataURL":featuredImage.asset->metadata.lqip,
    "resources": resources[]->{_id,_type, "publicationType": publicationType->title, "articleTypeTitle": articleType[0]->title, title, date, standfirst, topics[]->{title}, "slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title, "imageUrl": featuredImage.asset->url,"imageBlurDataURL":featuredImage.asset->metadata.lqip, "pdfFile": pdfFile.asset->url}[0..4]},
    "topics": *[_type == "topics"] | order(title) {_id, _type, title, longTitle, standfirst, slug, _updatedAt, "imageUrl": featuredImage.asset->url}[0..5],
    "featured": {"publication": *[_type  == "publication" && language == "en_US"] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8], "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0") && language == "en_US"] | order(date.utc desc) {_id, _type, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],},
    "blogPosts": *[_type == "blog-post" && language == "en_US" && !references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "imageBlurDataURL":featuredImage.asset->metadata.lqip, "slug": slug.current}[0..8],
    "events": *[_type in ["course", "event"] && defined(startDate)]{_type, title, startDate, location, lead, "slug": slug.current, topics[]->{title}, eventType,"future": select(dateTime(startDate.utc)-dateTime(now()) >=0 => 1,0),"timedistance": select(dateTime(startDate.utc)-dateTime(now()) >=0 => dateTime(startDate.utc)-dateTime(now()),dateTime(now())-dateTime(startDate.utc))}|order(future desc,timedistance asc)[0..2],
    "institutions": *[_type == 'institution' && funder == true] | order(name){_id, name, funder, svgLogo, website},
  }`;

  const sanityQuery = groq`{
    "frontPage": *[(_type=="frontpage") && ((_id == "7d2f27a0-58b7-4ba0-8520-0e07bc879b04") || (slug.current == "frontpage-NEW"))][0]{
      _id,
      title,
      "sections": sections[]{...,featureArray[]{_key,featureText,image{title,"url":asset->url}}},
      "imageUrl":featuredImage.asset->url,
      "imageBlurDataURL":featuredImage.asset->metadata.lqip,
      "imageAltText" : featuredImage.altText,
      "resources": resources[0..4]->{
        _id,
        _type, 
        "publicationType": publicationType->title, 
        "articleTypeTitle": articleType[0]->title, 
        title, 
        date, 
        standfirst, 
        topics[]->{title}, 
        "slug": slug.current,
        "titleColor": featuredImage.asset->metadata.palette.dominant.title, 
        "imageUrl": featuredImage.asset->url,
        "imageBlurDataURL":featuredImage.asset->metadata.lqip, 
        "pdfFile": pdfFile.asset->url,
      }
    },
    "topics": *[_type == "topics"] | order(title) {
      _id, 
      _type, 
      title, 
      longTitle, 
      standfirst, 
      slug, 
      _updatedAt, 
      "imageUrl": featuredImage.asset->url
    }[0..5],
    "featured": {
      "publication": *[_type  == "publication" && language == "en_US"] | order(date.utc desc) {
        _id, 
        _type, 
        title, 
        date, 
        standfirst, 
        "publicationType": publicationType->title, 
        authors[]->{firstName, surname}, 
        topics[]->{title, slug}, 
        "imageUrl": featuredImage.asset->url, 
        "slug": slug.current, 
        "pdfFile": pdfFile.asset->url
      }[0..8], 
      "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0") && language == "en_US"] | order(date.utc desc) {
        _id, 
        _type, 
        title, 
        date, 
        standfirst, 
        topics[]->{title}, 
        "imageUrl": featuredImage.asset->url, 
        "slug": slug.current
      }[0..1],
    },
    "blogPosts": *[_type == "blog-post" && language == "en_US" && !references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {
      _id, 
      _type, 
      title, 
      date, 
      standfirst, 
      authors[]->{firstName, surname}, 
      topics[]->{title}, 
      "imageUrl": featuredImage.asset->url, 
      "imageBlurDataURL":featuredImage.asset->metadata.lqip, 
      "slug": slug.current
    }[0..8],
    "events": *[_type in ["course", "event"] && defined(startDate)]{
      _type, 
      title, 
      startDate, 
      altDateText,
      location, 
      lead, 
      "slug": slug.current, 
      topics[]->{title}, 
      eventType,
      "future": select(dateTime(startDate.utc)-dateTime(now()) >=0 => 1,0),
      "timedistance": select(dateTime(startDate.utc)-dateTime(now()) >=0 => dateTime(startDate.utc)-dateTime(now()),dateTime(now())-dateTime(startDate.utc))
    }|order(future desc,timedistance asc)[0..2],
    "institutions": *[_type == 'institution' && funder == true]{
      _id, 
      name, 
      funder, 
      svgLogo, 
      website
    }| order(name),
  }`;

async function getData( params ) {
  const data = await fetchAndMaterialize( {
    query: sanityQuery, 
    materializeDepth: 0, 
    params,
    tags: ['frontpage:frontpage-NEW']} );
  return data;
};