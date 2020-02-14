import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../helpers/data-loader';
import {
  CorruptionByTopic,
  Guidance,
  FeaturedPosts,
  Layout,
  InsightPosts,
  RecentPublications,
  NewsAndEvents,
} from '../components/v2';
const BlogPage = ({
  data: { blogEntries = {} },
}) => (
  <Layout
    hideLogo={false}
    noSearch={false}
    headComponentConfig={{
      title: 'U4 Anti-Corruption Resource Centre',
      description:
        'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
      url: 'https://www.u4.no',
      image:
        frontPage.ImageUrl ||
        'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
    }}
  >
    <section className="o-wrapper">
      <div className="o-wrapper-section">
      <h2 className="u-blue-underline">Insights from our blog</h2>
      {/* Filters go to component state, filter locally, one filter active at a time */}
      {/* TODO check react/react-dom versions to support hooks */}
      </div>
    </section>

    <section className="o-wrapper">
      <div className="o-wrapper-section">
        {blogEntries.map((post, index) => (
            <div className="col row" key={index}>
              <div
                className="post-image"
                style={{ backgroundImage: `url('${post.imageUrl}?w=800')` }}
              />
              <div className="text">
                <h6 {...classes('publication-type')}>Blog</h6>
                <a href={`posts/${post.slug}`} {...classes('publication-headline')}>
                  <h3 {...classes('publication-headline')}>{post.title}</h3>
                </a>
                <p {...classes('publication-intro')}>{post.standfirst}</p>
                <p {...classes('date')}>{dateToString({ start: post.date.utc })}</p>
                <div {...classes('topic')}>
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
              <hr className="u-section-underline" />
            </div>
          ))}
      </div>
    </section>
    {/* Pagination: save current page, pages count in component state, paginate locally */}
    {/* TODO check if `react-sanity-pagination` package is any good for us */}
  </Layout>
);

BlogPage.propTypes = {
  data: PropTypes.shape({
    blogEntries: PropTypes.object,
  }).isRequired,
};

export default DataLoader(BlogPage, {
  queryFunc: () => ({
    sanityQuery: `{
      "blogEntries": *[_type  == "blog-post"] | order(date.utc desc) {_id, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}}},
    }`,
  }),
  materializeDepth: 0,
});
