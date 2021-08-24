import React from 'react';
import BEMHelper from 'react-bem-helper';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Footer from '../../components/general/footer/Footer';

import ArrowRight from '../../components/icons/ArrowRight';
import ArrowRightSmall from '../../components/icons/ArrowRightSmall';
import MediumLogo from '../../components/icons/MediumLogo';
import TwitterLogo from '../../components/icons/TwitterLogo';

import { BreadCrumbV2 } from '../../components/general/BreadCrumbV2';
import { TopicCardList } from '../../components/general/topics/TopicCardList';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { PersonCard, PERSON_CARD_TYPE } from '../../components/general/person/PersonCard';
import { CARD_TYPE } from '../../components/general/blue-card/BlueCard';
import { POST_TYPE } from '../../components/general/post/Post';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers';
import { format } from 'date-fns';
import uniq from 'lodash/uniq';

const classes = BEMHelper({
  name: 'persons',
  prefix: 'c-',
});

const classesSearch = BEMHelper({
  name: 'search-results-v2',
  prefix: 'c-',
});
const Topics = ({ topics }) => (
  <div {...classes('topics')}>
    {topics && topics.length > 0 && <h1>Topics</h1>}
    <ul {...classesSearch('content')}>
      {topics &&
        topics.length > 0 &&
        topics.map(topic => (
          <li key={topic._id} {...classesSearch('items')}>
            <div {...classesSearch('topic')}>
              <div {...classesSearch('topic-wrapper')}>
                <div {...classesSearch('topic-img')}>
                  {topic.featuredImage && (
                    <img
                      alt={topic.featuredImage.asset.altText}
                      src={`${
                        topic.featuredImage.asset.url
                      }?auto=format&w=500&h=500&fit=crop&crop=focalpoint`}
                      srcSet={`${topic.featuredImage.asset.url}?auto=format&w=500&q=70 500w, ${
                        topic.featuredImage.asset.url
                      }?auto=format&w=800&q=75 800w, ${
                        topic.featuredImage.asset.url
                      }?auto=format&w=1600&q=80 1600w, ${
                        topic.featuredImage.asset.url
                      }?auto=format&w=2400&q=80 2400w`}
                      sizes="30vw"
                      loading="lazy"
                    />
                  )}
                </div>
                <div {...classesSearch('topic-content')}>
                  <span {...classesSearch('items-type')}>Topic</span>
                  <br />
                  <Link href={`/topics/${topic.slug.current}`}>
                    <a {...classesSearch('items-title')}>{topic.title}</a>
                  </Link>
                  <br />
                  <p {...classesSearch('lead-text')}>{topic.standfirst}</p>
                  {topic.introductions > 0 && (
                    <div {...classesSearch('topic-point')}>
                      <ArrowRightSmall />
                      <Link href={`/topics/${topic.slug.current}/basics`}>
                        <a>Basic guide</a>
                      </Link>
                    </div>
                  )}
                  {topic.agenda > 0 && (
                    <div {...classesSearch('topic-point')}>
                      <ArrowRightSmall />
                      <Link href={`/topics/${topic.slug.current}/agenda`}>
                        <a>Research and policy agenda</a>
                      </Link>
                    </div>
                  )}
                  {topic.resources > 0 && (
                    <div {...classesSearch('topic-point')}>
                      <ArrowRightSmall />
                      <Link href={`/topics/${topic.slug.current}/resources`}>
                        <a>Publications and other resources</a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  </div>
);
const CoursesAndWorkshops = ({ courses }) => (
  <div {...classes('courses')}>
    {courses && courses.length > 0 && <h1>Online training and workshops</h1>}
    <ul {...classesSearch('content')}>
      {courses &&
        courses.map(course => (
          <li key={course._id} {...classesSearch('items')}>
            <div {...classesSearch('topic')}>
              <div {...classesSearch('topic-wrapper')}>
                <div {...classesSearch('topic-content')}>
                  <span {...classesSearch('items-type')}>
                    {course._type === 'course' ? 'Online course' : 'Workshop'}
                  </span>
                  <br />
                  <Link
                    href={
                      course._type === 'course'
                        ? `/courses/${course.slug.current}`
                        : `/events/${course.slug.current}`
                    }
                  >
                    <a {...classesSearch('items-title')}>{course.title}</a>
                  </Link>
                  {course.startDate && (
                    <p {...classesSearch('items-date')}>
                      {format(course.startDate.utc, 'D MMM YYYY')}
                    </p>
                  )}
                  <p {...classesSearch('lead-text')}>{course.lead}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  </div>
);

const RecentWork = ({ articles }) => (
  <div {...classes('recent-work')}>
    {articles && articles.length > 0 && <h1>Recent work</h1>}
    <ul {...classesSearch('content')}>
      {articles.map(article => (
        <li key={article._id} {...classesSearch('items')}>
          <div {...classesSearch('topic')}>
            <div {...classesSearch('topic-wrapper')}>
              <div {...classesSearch('topic-content')}>
                <span {...classesSearch('items-type')}>
                  {article._type === 'publication' ? 'Publication' : 'Article'}
                  {article.publicationTypeTitle && (
                    <span>
                      <span {...classesSearch('pipe')}> | </span>
                      {article.publicationTypeTitle}
                    </span>
                  )}
                  {article.articleTypeTitle && (
                    <span>
                      <span {...classesSearch('pipe')}> | </span>
                      {article.articleTypeTitle}
                    </span>
                  )}
                </span>
                <br />
                <Link
                  href={
                    article._type === 'publication'
                      ? `/publications/${article.slug.current}`
                      : `/${article.slug.current}`
                  }
                >
                  <a {...classesSearch('items-title')}>{article.title}</a>
                </Link>
                {article.date && (
                  <p {...classesSearch('items-date')}>{format(article.date.utc, 'D MMM YYYY')}</p>
                )}
                <p {...classesSearch('lead-text')}>
                  {article.standfirst
                    ? article.standfirst
                    : article.lead
                    ? `${article.lead.substring(0, 200)}...`
                    : ''}
                </p>
                {uniq(article.topicsTitles)
                  .slice(0, 1)
                  .map(topic => (
                    <div key={topic.title} {...classesSearch('items-tab')}>
                      {topic.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
const Persons = ({ data: { person = {} }, url = { query: { slug: '' } } }) => {
  return (
    <Layout
      headComponentConfig={{
        title: `${person.firstName} ${person.surname}`,
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      {/* <div className="o-wrapper o-wrapper--padded"> */}
      <div className="o-wrapper-medium">
        <BreadCrumbV2
          title={`People`}
          parentSlug={'/the-team'}
          grandParentTitle={`About U4`}
          grandParentSlug={'/about-u4'}
          home={true}
          onDark={false}
        />
      </div>
      <div className="o-wrapper-medium">
        <PersonCard type={PERSON_CARD_TYPE.PROFILE} key={person._id} light person={person} />
        <hr className="u-section-underline--no-margins" />
      </div>
      <div className="o-wrapper-medium">
        <div className="c-article__persons">
          <div className="c-article-v2 c-article-v2__main-text">
            <BlockContent blocks={person.bio} serializers={serializers} />
          </div>
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
            type={POST_TYPE.PUBLICATION}
            buttonPath="/blog"
            title="Recent work"
            minPosts={3}
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      )}
      {/* {person.affiliations && person.affiliations.length > 0 ? (
        <div className="o-wrapper-medium person-wrapper">
          <section {...classes()}>
            <div {...classes('profile')}>
              <h1 {...classes('profile-name')}>
                {person.firstName}
                <br /> {person.surname}
              </h1>
              <p {...classes('profile-position')}>{person.position}</p>
              {person.image && person.image.asset && person.image.asset.url && (
                <img alt="x" src={`${person.image.asset.url}?auto=format&w=400&q=90`} />
              )}
              <div {...classes('profile-info')}>
                <a href={`mailto:${person.email}`}>{person.email}</a>
                <br />
                {person.phone && (
                  <a href={`tel:${person.phone}`}>
                    +{person.phone}
                    <br />
                  </a>
                )}
                {person.image && person.image.asset && person.image.asset.url && (
                  <a href={person.image.asset.url}>
                    Hi-res image
                    <br />
                  </a>
                )}
                {person.medium && (
                  <a href={person.medium}>
                    <MediumLogo {...classes('some-icon')} />
                    Medium
                  </a>
                )}
                <br />
                {person.twitter && (
                  <a href={person.twitter}>
                    <TwitterLogo {...classes('some-icon')} />
                    Twitter
                  </a>
                )}
              </div>
            </div>
            {person.bio && (
              <div {...classes('bio')}>
                <BlockContent blocks={person.bio} serializers={serializers} />
              </div>
            )}
          </section>
          <section className="extra-person-content">
            <Topics topics={person.topics} />
          </section>
          <section className="extra-person-content">
            <CoursesAndWorkshops courses={person.courses} workshops={person.workshops} />
          </section>

          <section className="extra-person-content">
            <RecentWork articles={person.recentWork} />
          </section>
          <h2 className="c-topic-section__cta">
            <Link href={`/search?search=author%3A${person.slug.current}`}>
              <a>
                View all content by {`${person.firstName} ${person.surname}`} &nbsp;
                <ArrowRight />
              </a>
            </Link>
          </h2>
        </div>
      ) : (
        <div className="o-wrapper-medium person-wrapper">
          <p>{`${person.firstName} ${person.surname}`} is no longer affiliated with U4.</p>
          <Link href={`/search?search=author%3A${person.slug.current}`}>
            <a>
              Search for content by {`${person.firstName} ${person.surname}`} &nbsp;
              <ArrowRight />
            </a>
          </Link>
        </div>
      )} */}
      {/* </div> */}

      <Footer />
    </Layout>
  );
};

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => {
    return {
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
          }},
        "courses": *[(_type == "course" || _type=="event") && references(^._id) && defined(startDate) && (endDate.utc > $now)]  | order(startDate.utc asc) {_id, _type, slug, title, startDate, lead},
        "recentWork": *[((_type == "publication" && (^._id in authors[]._ref)) || (_type == "article" && references(^._id) )) && defined(date)] | order(date.utc desc)[0...5]{_id, _type, slug, standfirst, title, date, lead, "topicsTitles": topics[]->{title}, "publicationType": publicationType->title, "articleTypeTitle": articleType[0]->title},
           "affiliations": affiliations[]->name,
        "image": { "asset": { "url": image.asset->url}}
        },
      }`,
      param: {
        slug,
      },
    };
  },
});
