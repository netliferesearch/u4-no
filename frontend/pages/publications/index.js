import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../helpers/data-loader';
import { Layout } from '../../components/Layout';
import BlogFilteredList from '../../components/blog/BlogFilteredList';
import { wrapInRedux } from '../../helpers/redux-store-wrapper';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';
import SearchFiltersV3 from '../../components/search/SearchFiltersV3';
import { SearchResultsV3 } from '../../components/search/SearchResultsV3';

export const Publications = ({ data: { featured = {} } }) => (
  <Layout
    hideLogo={false}
    headComponentConfig={{
      title: 'Publications',
      description: 'lorem ipsum',
      url: 'https://www.u4.no/publications',
      image:
        featured.ImageUrl ||
        'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
    }}
  >
    {console.log('data', featured)}
    <div className="c-publications-index">
      <section className="o-wrapper-medium">
        <PageIntro
          className="c-page-intro--about-u4"
          title="Publications"
          type="about-u4"
          text="Lorem ipsum"
        />
      </section>
      <hr className="u-section-underline--no-margins" />
      <section className="">
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <PostCarousel
            posts={featured.publication}
            type={POST_TYPE.PUBLICATION}
            buttonPath="/publications"
            title="Featured"
            minPosts={4}
            publications
          />
          <hr className="u-section-underline--no-margins" />
        </div>
      </section>
      <div className="o-wrapper-medium">
        <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Explore all</h4>
      </div>
      <div className="o-wrapper-medium">
        <div className="c-search-page__sections">
          <section className="o-layout__item u-12/12 u-3/12@desktop">
            <SearchFiltersV3 />
          </section>
          <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
            {/* <SearchResultsV3 publications={featured.publication} /> */}
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </Layout>
);

Publications.propTypes = {
  data: PropTypes.shape({
    publicationEntries: PropTypes.array,
  }).isRequired,
};

export default wrapInRedux(
  DataLoader(Publications, {
    queryFunc: () => ({
      sanityQuery: `{
        "featured": {"publication": *[_type  == "publication"] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..3], "blog": *[_type  == "blog-post" && references("daecef41-f87b-41ec-ad35-eefe31568ae0")] | order(date.utc desc) {_id, _type, title, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..1],},
        title,
      }`,
    }),
    materializeDepth: 0,
  })
);
