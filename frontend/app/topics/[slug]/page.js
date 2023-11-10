import { groq } from 'next-sanity';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import Layout from '@/app/components/layout/Layout';
import { Team } from 'components/general/team/Team';
import { LinkBox } from 'components/general/link-box/LinkBox';
import { FeaturedPosts } from 'components/front-page/FeaturedPosts';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { POST_TYPE } from 'components/general/post/Post';
import { TopicCardList } from 'components/general/topics/TopicCardList';
import { CARD_TYPE } from 'components/general/blue-card/BlueCard';
import { Hero } from 'components/general/Hero';
import { PERSON_CARD_TYPE } from 'components/general/person/PersonCard';
import { LearningEvents } from 'components/front-page/LearningEvents';
import { HorizontalLinkBox } from 'components/general/link-box/HorizontalLinkBox';

export default async function TopicEntry({ params }) {

  const data = await getData( params );

  const {
    title = '',
    longTitle = '',
    explainerText = '',
    featuredImage = {},
    relatedTopics = [],
    relatedPublications = [],
    relatedBlogPosts = [],
    furtherResources = [],
    resourceCollections = [],
    parent = {},
    slug = {},
    introductionLength = 0,
    agendaLength = 0,
    advisors = [],
    resources = [],
    relatedEvents = [],
    relatedUrl = {},
    url = {},
  } = data;

  return (
    <Layout>
      <div className="c-topic-page">

        <section className="o-wrapper-full">
          <Hero
            contentType="topic"
            image={featuredImage}
            parentSlug="/topics"
            parentTitle="Topics"
            title={title}
            text={longTitle}
            topics={relatedTopics}
          />
        </section>

        <section className="o-wrapper-medium">
          {introductionLength > 0 && agendaLength > 0 ? (
            <div className="c-linkbox-wrapper">
              {introductionLength > 0 && (
                <LinkBox
                  title="Basic guide"
                  text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
                  // icon={BasicGuide}
                  _type="topicsBasics"
                  slug={slug}
                  color={`${agendaLength > 0 ? 'white' : 'lighter-blue--full'}`}
                />
              )}
              {agendaLength > 0 && (
                <LinkBox
                  title="Research and policy agenda"
                  text={`Discover what U4 and others do to advance research and reduce corruption in ${title.toLowerCase()}.`}
                  // icon={ResearchAgenda}
                  _type="topicsAgenda"
                  slug={slug}
                  color="dark-blue"
                />
              )}
            </div>
          ) : (
            <div>
              {introductionLength > 0 && (
                <HorizontalLinkBox
                  title="Basic guide"
                  text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
                  // icon={BasicGuide}
                  _type="topicsBasics"
                  slug={slug}
                  color="white"
                />
              )}
            </div>
          )}
        </section>

        <section className="o-wrapper-full u-bg--lighter-blue">
          <div className="o-wrapper-medium">
            <FeaturedPosts
              featured={resources}
              // featured={resources.filter(i => Object.keys(i).length !== 0).slice(0, 5)}
            />
          </div>
        </section>

        {relatedBlogPosts && (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={relatedBlogPosts}
                type={POST_TYPE.BLOG}
                buttonPath={`/search?filters=content-blog-post%2Ctopic-type-${encodeURIComponent(
                  title
                )}&search=&searchPageNum=1`}
                title="From the blog"
                minPosts={3}
              />
              <hr className="u-section-underline--no-margins" />
            </div>
          </section>
        )}

        {relatedEvents && (
          <section className="">
            <div className="o-wrapper-medium">
              <LearningEvents
                events={relatedEvents}
                type={relatedEvents.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
              />
            </div>
          </section>
        )}

        {relatedPublications && (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={relatedPublications}
                type={POST_TYPE.PUBLICATION}
                buttonPath={`/search?filters=content-publication%2Ctopic-type-${encodeURIComponent(
                  title
                )}&search=&searchPageNum=1`}
                title="Latest publications"
                minPosts={4}
              />
              <hr className="u-section-underline--no-margins" />
            </div>
          </section>
        )}

        {furtherResources && (
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={furtherResources}
              type={POST_TYPE.CARD}
              buttonPath={`/search?filters=content-collection%2Ctopic-type-${encodeURIComponent(
                title
              )}&search=&searchPageNum=1`}
              title="Further Resources"
              minPosts={3}
            />
          </div>
        )}

        {resourceCollections && (
          <section className="o-wrapper-full u-bg--light-blue--top">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={resourceCollections}
                type={POST_TYPE.CARD}
                buttonPath="/collections"
                title="Resource Collections"
                minPosts={3}
              />
            </div>
          </section>
        )}

        {advisors && (
          <div id="advisors" className="o-wrapper-medium">
            <hr className="u-section-underline--no-margins" />

            <Team
              type={PERSON_CARD_TYPE.IMAGE_TOP}
              heading="Topic Experts"
              members={advisors}
              linkLabel="Read full bio"
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        )}

        {relatedTopics && (
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

  const data = await getData( params );
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

const sanityQuery = groq`*[_type == 'topics' && slug.current == $slug]{
      title, longTitle, explainerText, slug, "introductionLength": count(introduction), "agendaLength": count(agenda), relatedUrl, url,
      featuredImage{caption,credit,sourceUrl,license,asset->{altText,url,metadata{lqip}}},
      "advisors": advisors[]->{
        _id,
        title,
        "image": image.asset->{"asset": { "url": url}},
        position,
        firstName,
        surname,
        email,
        slug
      },
      "relatedTopics":
        *[_type == 'topics' && _id != ^._id && (_id==coalesce(^.parent._ref,^._id) || (parent._ref == coalesce(^.parent._ref,^._id)))]{
          _id,
          _type,
          title,
          "slug": slug.current,
          longTitle,
          _updatedAt,
        },
      "resources": resources[0..4]->{
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
        "imageBlurDataURL":featuredImage.asset->metadata.lqip,
        topics[]->{title},
      },
      "furtherResources": further_resources[]->{
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
        topics[]->{title},
      },
      "relatedPublications": *[_type == 'publication' && references(^._id) && language == "en_US"] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8],
      "relatedBlogPosts": *[_type == 'blog-post' && references(^._id) && language == "en_US"] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "imageBlurDataURL":featuredImage.asset->metadata.lqip, "slug": slug.current}[0..8],
      "relatedEvents": *[_type in ["course", "event"] && references(^._id) && ( startDate > now())] | order(startDate.utc desc) {_type, title, startDate, location, lead, "slug": slug.current, topics[]->{title}, eventType},
      "resourceCollections": collections[]->{_type, title, "slug": slug.current},
  }[0]`;

async function getData( params ) {
  const data = await fetchAndMaterialize({
    query: sanityQuery, 
    params, 
    tags: [`topics:${params.slug}`],
    materializeDepth: 0
  });
  return data;
};

// pre-render
export async function generateStaticParams() {
  const sanityQuery = `*[_type == 'topics']{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize( {query: sanityQuery, materializeDepth: 0} );
  return data;
};