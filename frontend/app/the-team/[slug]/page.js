import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import hasContent from '@/app/lib/util/hasContent';
import BlockContent from '@sanity/block-content-to-react';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { CARD_TYPE } from 'components/general/blue-card/BlueCard';
import { PERSON_CARD_TYPE, PersonCard } from 'components/general/person/PersonCard';
import { POST_TYPE } from 'components/general/post/Post';
import { TopicCardList } from 'components/general/topics/TopicCardList';
import serializers from 'components/serializers/serializers';
import { groq } from 'next-sanity';

export default async function Person({params}) {

  const data = await getData( params );
  const { 
    person = { 
      firstName: '', 
      surname: ''
    }, 
    lead = '', 
    featuredImage = {} 
  } = data;

  return (
    <Layout>
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

      {hasContent(person.topics) && (
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
      {hasContent(person.recentWork) && (
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


export async function generateMetadata({ params }) {

  const data = await getData( params );
  const { 
    person = {}, 
    lead = '', 
    imageUrl = '' 
  } = data;
  return getMetadata({
    title: `${person.firstName} ${person.surname}`,
    description: lead,
    image: imageUrl
  });
}


const sanityQuery = groq`{
    "person": *[_type == 'person' && slug.current == $slug][0]{
      firstName,
      surname,
      "slug": slug.current,
      position,
      ...,
      "topics": *[_type == "topics" && references(^._id)]{
        _id, 
        _type, 
        longTitle, 
        "slug": slug.current, 
        title, 
        standfirst,
        // "introductions": count(introduction),
        // "resources": count(resources),
        // "agenda": count(agenda),
        // "featuredImage": {
        //   "asset": featuredImage.asset->{
        //     "altText": altText,
        //     "url": url
        //   }
        // }
      },
      "courses": *[(_type == "course" || _type=="event") && references(^._id) && defined(startDate) && (endDate.utc > now())]  | order(startDate.utc asc) {_id, _type, slug, title, startDate, location, lead, eventType},
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
        "articleTypeTitle": articleType[0]->title
      },
    },
  }`;

async function getData( params ) {
  const decodedParams = {
    slug: decodeURIComponent(params.slug)
  };
  const data = await fetchAndMaterialize({
    query: sanityQuery, 
    params: decodedParams, 
    materializeDepth: 1,
    tags: [`person:${params.slug}`]
  });
  return data;
};

export async function generateStaticParams() {
  const sanityQuery = groq`*[_type == "person" && (references("419c2497-8e24-4599-9028-b5023830c87f")
    || references("17ec3576-0afa-4203-9626-a38a16b27c2a") || references("3babc8f1-9e38-4493-9823-a9352b46585b"))]{ "slug": slug.current } [0..1000]`;
  const data = await fetchAndMaterialize({ query: sanityQuery, materializeDepth: 0 });
  return data;
};