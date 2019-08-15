import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';
import { Layout, Footer } from '../components';
import { ArrowRight, ArrowRightSmall, MediumLogo, TwitterLogo } from '../components/icons/';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';
import { format } from 'date-fns';
import uniq from 'lodash/uniq';
import moment from 'moment';

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
    {topics && topics.length > 0 &&  <h1>Topics</h1>}
    <ul {...classesSearch('content')}>
      {topics && topics.length > 0 && topics.map(topic => (
        <li key={topic._id} {...classesSearch('items')}>
          <div {...classesSearch('topic')}>
            <div {...classesSearch('topic-wrapper')}>
              <div {...classesSearch('topic-img')}>
                {topic.featuredImage && (
                  <img alt={topic.featuredImage.asset.altText}
                    src={`${topic.featuredImage.asset.url}?w=500&h=500&fit=crop&crop=focalpoint`}
                  />
                )}
              </div>
              <div {...classesSearch('topic-content')}>
                <span {...classesSearch('items-type')}>Topic</span>
                <br />
                <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                  <a {...classesSearch('items-title')}>{topic.title}</a>
                </Link>
                <br />
                <p {...classesSearch('lead-text')}>{topic.standfirst}</p>
                {topic.introductions > 0 && (
                  <div {...classesSearch('topic-point')}>
                    <ArrowRightSmall />
                    <Link
                      route="topic.article"
                      params={{ slug: topic.slug.current, topicPart: 'basics' }}
                    >
                      <a>Basic guide</a>
                    </Link>
                  </div>
                )}
                {topic.agenda > 0 && (
                  <div {...classesSearch('topic-point')}>
                    <ArrowRightSmall />
                    <Link
                      route="topic.article"
                      params={{ slug: topic.slug.current, topicPart: 'agenda' }}
                    >
                      <a>Research and policy agenda</a>
                    </Link>
                  </div>
                )}
                {topic.resources > 0 && (
                  <div {...classesSearch('topic-point')}>
                    <ArrowRightSmall />
                    <Link
                      route="topic.article"
                      params={{ slug: topic.slug.current, topicPart: 'resources' }}
                    >
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
    {courses && courses.length > 0 && <h1>Online training and workshop</h1> }
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
                    route={course._type === 'course' ? 'course.entry' : 'event.entry'}
                    params={{ slug: course.slug.current }}
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
    {articles && articles.length > 0 &&  <h1>Recent work</h1>}
    <ul {...classesSearch('content')}>
      {articles.map(
        article =>
          console.log('article', article) || (
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
                      route={
                        article._type === 'publication' ? 'publication.entry' : 'general.article'
                      }
                      params={{ slug: article.slug.current }}
                    >
                      <a {...classesSearch('items-title')}>{article.title}</a>
                    </Link>
                    {article.date && (
                      <p {...classesSearch('items-date')}>
                        {format(article.date.utc, 'D MMM YYYY')}
                      </p>
                    )}
                    <p {...classesSearch('lead-text')}>
                      {article.standfirst ? article.standfirst : article.lead ? article.lead.substring(0, 200) + '...' : ''}
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
          )
      )}
    </ul>
  </div>
);
const Persons = ({ data: { person = {} }, url = '' }) =>
  console.log('cc', person) || (
    <Layout
      headComponentConfig={{
        title: `${person.firstName} ${person.surname}`,
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      <div className="o-wrapper o-wrapper--padded">
        <BreadCrumb
          url={url}
          data={{ _type: 'people', slug: { current: url.query.slug }, title: 'People' }}
        />
        <div className="o-wrapper-medium">
          <section {...classes()}>
            <div {...classes('profile')}>
              <h1 {...classes('profile-name')}>
                {person.firstName}
                <br /> {person.surname}
              </h1>
              <p {...classes('profile-position')}>{person.position}</p>
              {person.image && person.image.asset && person.image.asset.url && (
                <img alt="x" src={`${person.image.asset.url}?w=400`} />
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
          <section>
            <Topics topics={person.topics} />
          </section>
          <section>
            <CoursesAndWorkshops courses={person.courses} workshops={person.workshops} />
          </section>

          <section>
            <RecentWork articles={person.recentWork} />
          </section>
          <h2 className="c-topic-section__cta">
            <Link to={`/search?search=author%3A${person.slug.current}`}>
            <a>
                View all content by {`${person.firstName} ${person.surname}`} &nbsp;
                <ArrowRight />
              </a>
            </Link>
          </h2>
        </div>
      </div>

      <Footer />
    </Layout>
  );
export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => {
    return {
      sanityQuery: `{
      "person": *[slug.current == $slug][0]{..., 
      "topics": *[_type == "topics" && references(^._id)]{_id, slug, title, standfirst,
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
      "recentWork": *[((_type == "publication" || _type == "article") && defined(date)) && references(^._id)] | order(date.utc desc)[0...5]{_id, _type, slug, standfirst, title, date, lead, "topicsTitles": topics[]->{title}, "publicationTypeTitle": publicationType->title, "articleTypeTitle": articleType[0]->title},
         "affiliations": affiliations[]->name,
      "image": { "asset": { "url": image.asset->url}}
      },
    }`,
      param: {
        slug,
        now: moment()
          .utc()
          .format(),
      },
    };
  },
});
