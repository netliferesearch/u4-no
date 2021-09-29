import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../helpers/data-loader';
import { Layout } from '../../components/Layout';
import BlogFilteredList from '../../components/blog/BlogFilteredList';
import { wrapInRedux } from '../../helpers/redux-store-wrapper';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';

const Publications = ({ data: { publicationEntries = [] } }) => {
  return (
    <Layout
      hideLogo={false}
      headComponentConfig={{
        title: 'Publications',
        description:
          'Practitioners, policymakers, activists, and academics share insights on how to build a sustainable and inclusive future by curbing corruption.',
        url: 'https://www.u4.no/publications',
        image:
          publicationEntries.imageUrl ||
          'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
      }}
    >
      <div className="c-blog-index">
        <section className="o-wrapper-medium">
          <PageIntro
            className="c-page-intro--about-u4"
            title="Publications"
            type="about-u4"
            text="Lorem ipsum"
          />
          {/* </div> */}
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium">
          <BlogFilteredList publicationEntries={publicationEntries} topics={topics} />
        </section>
      </div>
      <div id="modal" />
      <Footer />
    </Layout>
  );
};

Publications.propTypes = {
  data: PropTypes.shape({
    publicationEntries: PropTypes.array,
  }).isRequired,
};

export default wrapInRedux(
  DataLoader(Publications, {
    queryFunc: () => ({
      sanityQuery: `*[_type == 'publication' && slug.current == 'publication']{
        "featured": {"publication": *[_type  == "publication"] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8], "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..3],},
        title,
    }`,
    }),
    materializeDepth: 1,
  })
);
