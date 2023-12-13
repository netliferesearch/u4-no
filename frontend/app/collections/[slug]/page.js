import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import hasContent from '@/app/lib/util/hasContent';
import { LearningEvents } from 'components/front-page/LearningEvents';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { Hero } from 'components/general/Hero';
import { CARD_TYPE } from 'components/general/blue-card/BlueCard';
import { POST_TYPE } from 'components/general/post/Post';
import { TopicCardList } from 'components/general/topics/TopicCardList';
import buildUrl from 'helpers/buildUrl';
import { groq } from 'next-sanity';

export default async function Collection({ params }) {

  const data = await getData(params);

  const {
    title = '',
    longTitle = '',
    explainerText = '',
    featuredImage = {},
    relatedTopics = [],
    relatedPublications = null,
    relatedBlogPosts = null,
    parent = {},
    slug = {},
    introduction = [],
    agenda = [],
    advisors = [],
    resources = null,
    relatedEvents = null,
    relatedUrl = {},
    url = {},
  } = data;

  return (
    <Layout>
      <div className="c-topic-page">

        <section className="o-wrapper-full">
          <Hero
            contentType="Resource collection"
            image={featuredImage}
            title={title}
            text={longTitle}
            topics={relatedTopics}
            onDark={false}
            parentSlug={relatedTopics[0] ? buildUrl(relatedTopics[0]) : ''}
            parentTitle={relatedTopics[0] ? relatedTopics[0].title : ''}
            grandParentSlug={relatedTopics[0] ? '/topics' : ''}
            grandParentTitle={relatedTopics[0] ? 'Topics' : ''}
          />
        </section>

        <hr className="u-section-underline--no-margins" />

        {hasContent(relatedBlogPosts) && (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={relatedBlogPosts}
                type={POST_TYPE.BLOG}
                buttonPath="/blog"
                title="From the blog"
                minPosts={3}
              />
              <hr className="u-section-underline--no-margins" />
            </div>
          </section>
        )}

        {hasContent(relatedEvents) && (
          <section className="">
            <div className="o-wrapper-medium">
              <LearningEvents
                events={relatedEvents}
                type={relatedEvents.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
              />
            </div>
          </section>
        )}

        {hasContent(relatedPublications) && (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={relatedPublications}
                type={POST_TYPE.PUBLICATION}
                buttonPath="/publications"
                title="Latest publications"
                minPosts={4}
              />
              <hr className="u-section-underline--no-margins" />
            </div>
          </section>
        )}

        {hasContent(resources) && (
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={resources}
              type={POST_TYPE.CARD}
              buttonPath={`/search?search=${title}`}
              title="Further Resources"
              minPosts={3}
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        )}

        {hasContent(relatedTopics) && (
          <section className="">
            <div className="o-wrapper-medium">
              <TopicCardList type={CARD_TYPE.TOPIC} topics={relatedTopics} title="Related topics" />
            </div>
          </section>
        )}

      </div>

    </Layout>
  );
};

export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData(params);
  const {
    title = '',
    lead = '',
    featuredImage = '',
  } = data;

  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url
  });
}

const sanityQuery = groq`*[slug.current == $slug && _type=='collection']{
  title,
  longTitle,
  "relatedTopics": topics[]->{
    _id,
    _type,
    title,
    "slug": slug.current,
    longTitle,
    _updatedAt,
  },
  "resources": resources[@->._type in ['resource','article']]->{
    _id,
    _type,
    "publicationType": publicationType->title,
    "articleType": articleType[0]->title,
    title,
    date,
    standfirst,
    lead,
    "slug": slug.current,
    "titleColor": featuredImage.asset->metadata.palette.dominant.title,
    "imageUrl": featuredImage.asset->url,
    topics[]->{title},
  },
  "relatedPublications": resources[@->._type == 'publication']->{
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
    } | order(date.utc desc)[0..8],
  "relatedBlogPosts": resources[@->._type == 'blog-post']->{
      _id, 
      _type, 
      title, 
      date, 
      standfirst, 
      authors[]->{firstName, surname}, 
      topics[]->{title, slug}, 
      "imageUrl": featuredImage.asset->url, 
      "slug": slug.current
    } | order(date.utc desc)[0..8],
  "relatedEvents": resources[@->._type in ["course", "event"]]->{
      _type, 
      title, 
      startDate, 
      lead, 
      "slug": slug.current, 
      topics[]->{title}, 
      eventType 
    } | order(startDate.utc desc)
}[0]`;

async function getData(params) {
  const data = await fetchAndMaterialize({
    query: sanityQuery,
    params,
    tags: [`collection:${params.slug}`],
    materializeDepth: 0
  });
  return data;
};

export async function generateStaticParams() {
  const sanityQuery = groq`*[_type == 'collection']{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize({ query: sanityQuery, materializeDepth: 0 });
  return data;
};