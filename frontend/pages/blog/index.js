import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../helpers/data-loader';
import { Layout } from '../../components/v2/Layout';
import { BreadCrumbV2 } from '../../components/v2/BreadCrumbV2';
import BlogFilteredList from '../../components/v2/blog/BlogFilteredList';
import { wrapInRedux } from '../../helpers/redux-store-wrapper';

const BlogPage = ({ data: { blogEntries = [], topics = [] } }) => {
  return (
    <Layout
      hideLogo={false}
      noSearch={false}
      headComponentConfig={{
        title: 'Blog',
        description:
          'Practitioners, policymakers, activists, and academics share insights on how to build a sustainable and inclusive future by curbing corruption.',
        url: 'https://www.u4.no/blog',
        image:
          blogEntries.ImageUrl ||
          'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
      }}
    >
      {/* <hr className="u-section-underline--no-margins" /> */}
      <div className="c-blog-index">
        <section className="o-wrapper">
          <div className="o-wrapper-section">
            <h2 className="u-primary-heading">The U4 Blog</h2>
            <p className="c-blog-index__intro">
              Practitioners, policymakers, activists, and academics share insights on how to build a
              sustainable and inclusive future by curbing corruption.
            </p>
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper">
          <div className="o-wrapper-section">
            <BreadCrumbV2 />
            <BlogFilteredList blogEntries={blogEntries} topics={topics} />
          </div>
        </section>
      </div>
      <div id="modal" />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    blogEntries: PropTypes.array,
    topics: PropTypes.array,
  }).isRequired,
};

export default wrapInRedux(
  DataLoader(BlogPage, {
    queryFunc: () => ({
      sanityQuery: `{
      "blogEntries": *[_type  == "blog-post"] | order(date.utc desc) {_id, _type, title, date, content, authors, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current},
      "topics": *[_type == "topics"] | order(title){_id, title, slug},
    }`,
    }),
    materializeDepth: 1,
  })
);
