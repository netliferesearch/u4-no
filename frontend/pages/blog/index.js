import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../helpers/data-loader';
import { Layout } from '../../components/Layout';
import BlogFilteredList from '../../components/blog/BlogFilteredList';
import { wrapInRedux } from '../../helpers/redux-store-wrapper';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';

const BlogPage = ({ data: { blogEntries = [], topics = [], publications = [] } }) => {
 // console.log('publications', publications)
  return (
    <Layout
      hideLogo={false}
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
      <div className="c-blog-index">
        <section className="o-wrapper-medium">
          <PageIntro
            className="c-page-intro--about-u4"
            title="The U4 Blog"
            type="about-u4"
            text="Practitioners, policymakers, activists, and academics share insights on how to build a
          sustainable and inclusive future by curbing corruption."
          />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium">
          <BlogFilteredList blogEntries={blogEntries} topics={topics} />
        </section>
      </div>
      <div id="modal" />
      <Footer />
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
