import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../helpers/data-loader';
import {
  CorruptionByTopic,
  Guidance,
  FeaturedPosts,
  Layout,
  InsightPosts,
  RecentPublications,
} from '../components/v2';
import BEMHelper from 'react-bem-helper';
import dateToString from '../helpers/dateToString';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2';
import { BlogEntriesFilter } from '../components/v2/blog/BlogEntriesFilter';

const applayFliters = (filter, blogEntries) => {
  if (filter) {
    let filtered = blogEntries.filter(blogEntry => {
      if (blogEntry.topics) {
        return blogEntry.topics.find(topic => topic.title === filter.title) ? true : false;
      }
    })
    return filtered
  } else {
    return blogEntries;
  }
}

const BlogPage = ({ data: { blogEntries = [], topics = [] } }) => {
  const [filter, setFilter] = useState(null);
  const [filterResults, setFilterResults] = useState();

  useEffect(
    () => {
      setFilterResults(applayFliters(filter, blogEntries));
      //console.log("filter",filter)
    },
    [filter]
  );

  return (
    <Layout
      hideLogo={false}
      noSearch={false}
      headComponentConfig={{
        title: 'U4 Anti-Corruption Resource Centre',
        description:
          'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
        url: 'https://www.u4.no',
        image:
          blogEntries.ImageUrl ||
          'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
      }}
    >
      <hr className="u-section-underline--no-margins" />
      <div className="c-blog-index">
        <section className="o-wrapper">
          <BreadCrumbV2 title={'Blog'} parentSlug={'/blog'} />
          <div className="o-wrapper-section">
            <h2 className="u-blue-underline">Insights from our blog</h2>
            {/* Filters go to component state, filter locally, one filter active at a time */}
            <p className="c-blog-index__intro">
              Practitioners, policymakers, activists, and academics share insights on how to build a
              sustainable and inclusive future by curbing corruption.
            </p>
            <BlogEntriesFilter topics={topics} setFilter={setFilter} filter={filter} />
          </div>
        </section>
        <section className="o-wrapper">
          <div className="o-wrapper-section">
            {filterResults && filterResults.map((post, index) => (
              <div key={index}>
                <div className="c-blog-index__item--row">
                  <div className="text">
                    <h6 className="publication-type">Blog</h6>
                    <a href={`blog/${post.slug}`} className="publication-headline">
                      <h3 className="publication-headline">{post.title}</h3>
                    </a>
                    <p className="publication-intro">{post.standfirst}</p>
                    <p className="date">
                      {post.date ? dateToString({ start: post.date.utc }) : null}
                    </p>
                    <div className="topics">
                      {post.topics &&
                        post.topics.map((topic, index) => {
                          return (
                            <span className="topic" key={index}>
                              {topic.title}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                  {post.imageUrl ? (
                    <div
                      className="c-blog-index__featured-image"
                      style={{
                        backgroundImage: `url('${
                          post.imageUrl
                        }?w=470&h=470&fit=crop&crop=focalpoint')`,
                      }}
                    />
                  ) : null}
                </div>
                <hr className="u-section-underline" />
              </div>
            ))}
            {console.log("filterResults",filterResults)}
            {filterResults && filterResults.length === 0 && filter !== null ? (
              <div>Results(0)</div>
            ) : null}
          </div>
        </section>
        {/* Pagination: save current page, pages count in component state, paginate locally */}
        {/* TODO check if `react-sanity-pagination` package is any good for us */}
      </div>
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    blogEntries: PropTypes.array,
  }).isRequired,
};

export default DataLoader(BlogPage, {
  queryFunc: () => ({
    sanityQuery: `{
      "blogEntries": *[_type  == "blog-post"] | order(date.utc desc) {_id, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current},
      "topics": *[_type == "topics"] | order(title){_id, title, slug},
    }`,
  }),
  materializeDepth: 0,
});
