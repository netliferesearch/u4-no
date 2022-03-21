import React from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/general/footer/Footer';
import { BreadCrumbV2 } from '../../components/general/BreadCrumbV2';
import { TopicCardList } from '../../components/general/topics/TopicCardList';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { PersonCard, PERSON_CARD_TYPE } from '../../components/general/person/PersonCard';
import { CARD_TYPE } from '../../components/general/blue-card/BlueCard';
import { POST_TYPE } from '../../components/general/post/Post';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';

const Persons = ({ data: { person = {} }, url = { query: { slug: '' } } }) => {
  return (
    <Layout
      headComponentConfig={{
        title: `${person.firstName} ${person.surname}`,
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      <div className="o-wrapper-medium c-persons">
        <BreadCrumbV2
          title="People"
          parentSlug="/the-team"
          grandParentTitle="About U4"
          grandParentSlug="/about-u4"
          home
          onDark={false}
        />
      </div>
      <div className="o-wrapper-medium">
        <PersonCard type={PERSON_CARD_TYPE.PROFILE} key={person._id} light person={person} />
        <hr className="u-section-underline--no-margins" />
      </div>
      <div className="o-wrapper-medium">
        <div className="c-persons__article c-longform">
          <BlockContent blocks={person.bio} serializers={serializers} />
        </div>
        <hr className="u-section-underline--no-margins" />
      </div>

      {person.topics.length > 0 && (
        <div className="o-wrapper-medium">
          <TopicCardList
            showLink={false}
            type={CARD_TYPE.TOPIC}
            topics={person.topics}
            title="Related topics"
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      )}
      {person.recentWork.length > 0 && (
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <PostCarousel
            posts={person.recentWork}
            type={POST_TYPE.BLOG}
            buttonPath={`/search?search=${person.surname}`}
            title="Recent work"
            minPosts={3}
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      )}
      <Footer />
    </Layout>
  );
};

// const CoursesAndWorkshops = ({ courses }) => (
//   <div {...classes('courses')}>
//     {courses && courses.length > 0 && <h1>Online training and workshops</h1>}
//     <ul {...classesSearch('content')}>
//       {courses &&
//         courses.map(course => (
//           <li key={course._id} {...classesSearch('items')}>
//             <div {...classesSearch('topic')}>
//               <div {...classesSearch('topic-wrapper')}>
//                 <div {...classesSearch('topic-content')}>
//                   <span {...classesSearch('items-type')}>
//                     {course._type === 'course' ? 'Online course' : 'Workshop'}
//                   </span>
//                   <br />
//                   <Link
//                     href={
//                       course._type === 'course'
//                         ? `/courses/${course.slug.current}`
//                         : `/events/${course.slug.current}`
//                     }
//                   >
//                     <a {...classesSearch('items-title')}>{course.title}</a>
//                   </Link>
//                   {course.startDate && (
//                     <p {...classesSearch('items-date')}>
//                       {format(course.startDate.utc, 'D MMM YYYY')}
//                     </p>
//                   )}
//                   <p {...classesSearch('lead-text')}>{course.lead}</p>
//                 </div>
//               </div>
//             </div>
//           </li>
//         ))}
//     </ul>
//   </div>
// );

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "person": *[slug.current == $slug][0]{...,
        "topics": *[_type == "topics" && references(^._id)]{_id, _type, longTitle, slug, title, standfirst,
         "introductions": count(introduction),
         "resources": count(resources),
         "agenda": count(agenda),
         "featuredImage": {
            "asset": featuredImage.asset->{
              "altText": altText,
              "url": url
            }
          }
        },
        "courses": *[(_type == "course" || _type=="event") && references(^._id) && defined(startDate) && (endDate.utc > $now)]  | order(startDate.utc asc) {_id, _type, slug, title, startDate, lead, eventType},
        "recentWork": *[((_type in ["publication","blog-post"] && (^._id in authors[]._ref)) || (_type == "article" && references(^._id) )) && defined(date)] | order(date.utc desc)[0...5]{
          _id,
          _type,
          slug,
          standfirst,
          title,
          date,
          lead,
          "imageUrl": featuredImage.asset->url,
          "topicsTitles": topics[]->{title},
          "publicationType": publicationType->title,
          "articleTypeTitle": articleType[0]->title},
        },
      }`,
    param: {
      slug,
    },
  }),
  materializeDepth: 5,
});
