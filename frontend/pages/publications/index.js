import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { wrapInRedux } from '../../helpers/redux-store-wrapper';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';
import { SearchFiltersV3 } from '../../components/search/SearchFiltersV3';
import { client } from '../../helpers/sanityClient.pico';
import PublicationsDataLoader from '../../helpers/publications-data-loader';
import { SearchResultsV3 } from '../../components/search/SearchResultsV3';

export const Publications = ({ data = {} }) => {
  const [featured, setFeatured] = useState({});
  const initLoad = () => {
    client
      .fetch(
        `{
      "featured": {"publication": *[_type  == "publication"] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url, "legacypdf": legacypdf.asset->url}[0..3]},
    }`
      )
      .then(results => {
        setFeatured(results.featured);
      })
      .catch(err => console.error('Oh noes: %s', err.message));
  };
  useEffect(() => {
    initLoad();
  }, []);
  return (
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
        <section className="o-wrapper-medium o-wrapper-mobile-full">
          <PostCarousel
            posts={featured.publication}
            type={POST_TYPE.PUBLICATIONS}
            buttonPath="/publications"
            title="Featured"
            minPosts={4}
            publications
          />
          <hr className="u-section-underline--no-margins" />
        </section>
        <div className="o-wrapper-medium ">
          <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Explore all</h4>
        </div>
        <div className="o-wrapper-medium">
          <div className="c-search-page__sections">
            <section className="o-layout__item u-12/12 u-3/12@desktop">
              <SearchFiltersV3 data={data} publications />
            </section>
            <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
              <SearchResultsV3 data={data} publications />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default wrapInRedux(PublicationsDataLoader(Publications));
