import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../../helpers/data-loader';
import Footer from '../../../components/general/footer/Footer';
import Layout from '../../../components/Layout';
import Team from '../../../components/Team';
import BasicGuide from '../../../components/icons/BasicGuide';
import ResearchAgenda from '../../../components/icons/ResearchAgenda';
import ArrowRight from '../../../components/icons/ArrowRight';
import LinkBox from '../../../components/LinkBox';
import { FeaturedPosts } from '../../../components/front-page/FeaturedPosts';
import { PostCarousel } from '../../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../../components/general/post/Post';
import { TopicCardList } from '../../../components/general/topics/TopicCardList';
import { CARD_TYPE } from '../../../components/general/blue-card/BlueCard';
import { Hero } from '../../../components/general/Hero';

const TopicEntry = ({ data: { topic = {} } }) => {
  const {
    title = '',
    longTitle = '',
    explainerText = '',
    featuredImage = {},
    relatedTopics = [],
    relatedPublications = [],
    relatedBlogPosts = [],
    parent = {},
    slug = {},
    introduction = [],
    agenda = [],
    advisors = [],
    resources = [],
    relatedUrl = {},
    _id = '',
    _type = '',
    url = {},
  } = topic;
  return (
    <Layout
      headComponentConfig={Object.assign(
        {
          title,
          description: explainerText,
          image: featuredImage && featuredImage.asset ? featuredImage.asset.url : '',
          url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
          ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
        },
        relatedUrl
      )}
    >
      <div className="c-topic-page">
        <section className="o-wrapper-full">
          <Hero
            contentType="topic"
            image={featuredImage}
            title={title}
            text={longTitle}
            topics={relatedTopics}
          />
        </section>
        <section>
          {introduction.length + agenda.length > 0 && (
            <div>
              <section className="c-linkbox-wrapper">
                {introduction.length > 0 && (
                  <LinkBox
                    title="Basic guide"
                    text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
                    icon={BasicGuide}
                    _type="topicsBasics"
                    slug={slug}
                  />
                )}
                {agenda.length > 0 && (
                  <LinkBox
                    title="Research and policy agenda"
                    text={`Discover what U4 and others do to advance research and reduce corruption in ${title.toLowerCase()}.`}
                    icon={ResearchAgenda}
                    _type="topicsAgenda"
                    slug={slug}
                  />
                )}
              </section>
            </div>
          )}
        </section>
        <section className="o-wrapper-full u-bg--lighter-blue">
          <div className="o-wrapper-medium">
            <FeaturedPosts
              featured={resources.filter(i => Object.keys(i).length !== 0).slice(0, 3)}
            />
          </div>
        </section>
        {relatedBlogPosts.length > 0 ? (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={relatedBlogPosts}
                type={POST_TYPE.BLOG}
                buttonPath="/blog"
                title="From the blog"
              />
              <hr className="u-section-underline--no-margins" />
            </div>
          </section>
        ) : null}
      </div>
      {relatedPublications.length > 0 ? (
        <section className="">
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={relatedPublications}
              type={POST_TYPE.PUBLICATION}
              buttonPath="/publications"
              title="Latest publications"
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        </section>
      ) : null}
      {relatedTopics.length > 0 ? (
        <section className="">
          <div className="o-wrapper-medium">
            <TopicCardList type={CARD_TYPE.TOPIC} topics={relatedTopics} title="Related topics" />
          </div>
        </section>
      ) : null}
      <div />

      {advisors.length > 0 && (
        <div id="advisors" className="c-topic-section--lightblue o-wrapper-full-width">
          {
            <Team
              title={
                advisors.length > 1
                  ? 'We’re the team developing this topic.'
                  : 'I’m developing this topic.'
              }
              members={advisors}
              linkLabel="Read full bio"
            />
          }
          <h2 className="c-topic-section__cta">
            <a href="/the-team">
              The whole U4 team &nbsp;
              <ArrowRight />
            </a>
          </h2>
        </div>
      )}
      <Footer />
    </Layout>
  );
};

TopicEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DataLoader(TopicEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "topic": *[slug.current == $slug && _type=='topics']{
        ...,
        "featuredImage": {
          "caption": featuredImage.caption,
          "credit": featuredImage.credit,
          "sourceUrl": featuredImage.sourceUrl,
          "license": featuredImage.license,
          "asset": featuredImage.asset->{
            "altText": altText,
            "url": url
          }
        },
        "advisors": advisors[]->{
          _id,
          title,
          "image": image.asset->{"asset": { "url": url}},
          position,
          firstName,
          surname,
          email,
          slug,
          bio
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
        "resources": resources[]->{
          _id,
          _type,
          "publicationType": publicationType->title,
          "articleType": articleType[0]->title,
          title,
          date, 
          standfirst,
          "slug": slug.current,
          "titleColor": featuredImage.asset->metadata.palette.dominant.title,
          "imageUrl": featuredImage.asset->url,
          topics[]->{title},
        }[0..3],
        "relatedPublications": *[_type == 'publication' && references(^._id)] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8],
        "relatedBlogPosts": *[_type == 'blog-post' && references(^._id)] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..8],
    }[0]}`,
    param: { slug },
  }),
  materializeDepth: 3,
});

// const TopicEntry = ({
//   data: {
//     topic: {
//       title = '',
//       longTitle = '',
//       explainerText = '',
//       featuredImage,
//       relatedTopics = [],
//       parent = {},
//       slug = {},
//       introduction = [],
//       agenda = [],
//       advisors = [],
//       resources = [],
//       relatedUrl = {},
//       _id = '',
//       _type = '',
//       url = {},
//     } = {},
//   },
// }) => (
//   <Layout
//     headComponentConfig={Object.assign(
//       {
//         title,
//         description: explainerText,
//         image: featuredImage && featuredImage.asset ? featuredImage.asset.url : '',
//         url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
//         ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
//       },
//       relatedUrl
//     )}
//   >
//     <div className="c-topic-page">
//       <section className="o-wrapper-full">
//         <div className="o-wrapper-medium">
//         <FeaturedPosts featured={resources} />
//         </div>
//       </section>
//       <section className="">
//         <div className="o-wrapper-medium o-wrapper-mobile-full">
//           <PostCarousel
//             posts={resources}
//             type={POST_TYPE.BLOG}
//             buttonPath="/blog"
//             title="From the blog"
//           />
//           <hr className="u-section-underline--no-margins" />
//         </div>
//       </section>
//     </div>

//     <div>
//       <h1
//         id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
//         className="c-topic-page_title"
//       >
//         {title}
//       </h1>
//       <h2
//         id={slugify(longTitle, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
//         className="c-topic-page__longTitle"
//       >
//         {longTitle}
//       </h2>

//       <section className="c-boxOnImage u-margin-bottom-huge">
//         {featuredImage ? (
//           <figure className="c-boxOnImage__figure">
//             <Image
//               loader={sanityImageLoader}
//               src={featuredImage.asset.url}
//               alt={featuredImage.asset.altText ? featuredImage.asset.altText : ''}
//               layout="fill"
//               objectFit="cover"
//               priority="true"
//             />

//             <span className="c-boxOnImage__caption">
//               {featuredImage.caption && (
//                 <BlockContent blocks={featuredImage.caption} serializers={serializers} />
//               )}
//               {featuredImage.sourceUrl && (
//                 <a href={featuredImage.sourceUrl}>
//                   {featuredImage.credit ? featuredImage.credit : 'Credit'}
//                 </a>
//               )}
//               {!featuredImage.sourceUrl && featuredImage.credit && (
//                 <span>{featuredImage.credit}</span>
//               )}
//               {featuredImage.license && <span> {featuredImage.license.toUpperCase()}</span>}
//             </span>
//           </figure>
//         ) : null}
//         <div className="c-boxOnImage__body">
//           <p>{explainerText}</p>
//           {relatedTopics.length > 0 && <LinkList title="Related topics" content={relatedTopics} />}
//         </div>
//       </section>

//       {introduction.length + agenda.length > 0 && (
//         <div>
//           <h2 className="c-topic-section__title c-topic-section__title--large">
//             From basic guides to in-depth perspectives, all in one place.
//           </h2>
//           <section className="c-linkbox-wrapper">
//             {introduction.length > 0 && (
//               <LinkBox
//                 title="Basic guide"
//                 text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
//                 icon={BasicGuide}
//                 _type="topicsBasics"
//                 slug={slug}
//               />
//             )}
//             {agenda.length > 0 && (
//               <LinkBox
//                 title="Research and policy agenda"
//                 text={`Discover what U4 and others do to advance research and reduce corruption in ${title.toLowerCase()}.`}
//                 icon={ResearchAgenda}
//                 _type="topicsAgenda"
//                 slug={slug}
//               />
//             )}
//           </section>
//         </div>
//       )}
//       {resources.length > 0 && (
//         <div id="resources">
//           <h2 className="c-topic-section__title">
//             Inform your anti-corruption work with handpicked topic related publications, insights
//             and ideas.
//           </h2>

//           <section className="c-topic-section u-padding-top-none">
//             <div className="o-wrapper-medium">
//               <Mosaic resources={resources} />
//             </div>
//             <h2 className="c-topic-section__cta">
//               <a href={`/search?filters=topic-type-${encodeURI(title)}&search=`}>
//                 Explore all our resources &nbsp;
//                 <ArrowRight />
//               </a>
//             </h2>
//           </section>
//         </div>
//       )}
//     </div>

//     {advisors.length > 0 && (
//       <div id="advisors" className="c-topic-section--lightblue o-wrapper-full-width">
//         {
//           <Team
//             title={
//               advisors.length > 1
//                 ? 'We’re the team developing this topic.'
//                 : 'I’m developing this topic.'
//             }
//             members={advisors}
//             linkLabel="Read full bio"
//           />
//         }
//         <h2 className="c-topic-section__cta">
//           <a href="/the-team">
//             The whole U4 team &nbsp;
//             <ArrowRight />
//           </a>
//         </h2>
//       </div>
//     )}

//     {
//       <div id="partners" className="c-topic-section">
//         <PartnerPromo />
//       </div>
//     }
//     <Footer />
//   </Layout>
// );

// TopicEntry.propTypes = {
//   data: PropTypes.object.isRequired,
// };

// export default DataLoader(TopicEntry, {
//   queryFunc: ({ query: { slug = '' } }) => ({
//     sanityQuery: `{
//       "topic": *[slug.current == $slug && _type=='topics']{
//         ...,
//         "featuredImage": {
//           "caption": featuredImage.caption,
//           "credit": featuredImage.credit,
//           "sourceUrl": featuredImage.sourceUrl,
//           "license": featuredImage.license,
//           "asset": featuredImage.asset->{
//             "altText": altText,
//             "url": url
//           }
//         },
//         "advisors": advisors[]->{
//           _id,
//           title,
//           "image": image.asset->{"asset": { "url": url}},
//           position,
//           firstName,
//           surname,
//           email,
//           slug,
//           bio
//         },
//         "relatedTopics":
//           *[_type == 'topics' && _id != ^._id && (_id==coalesce(^.parent._ref,^._id) || (parent._ref == coalesce(^.parent._ref,^._id)))]{
//             _id,
//             _type,
//             title,
//             "slug": slug.current,
//           },
//         "resources": resources[]->{
//           _id,
//           _type,
//           "publicationType": publicationType->title,
//           "articleType": articleType[0]->title,
//           title,
//           date,
//           standfirst,
//           "slug": slug.current,
//           "titleColor": featuredImage.asset->metadata.palette.dominant.title,
//           "imageUrl": featuredImage.asset->url
//         }
//     }[0]}`,
//     param: { slug },
//   }),
//   materializeDepth: 0,
// });
