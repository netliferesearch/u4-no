import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { wrapInRedux } from '../../helpers/redux-store-wrapper';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';
import { SearchFilters } from '../../components/search/SearchFilters';
import PublicationsDataLoader from '../../helpers/publications-data-loader';
import { SearchResults } from '../../components/search/SearchResults';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';

export const Publications = ({ data = {}, sanityData = {} }) => {
  return (
    <Layout
      hideLogo={false}
      headComponentConfig={{
        title: 'Publications',
        description: 'Publications',
        url: 'https://www.u4.no/publications',
        image:
          sanityData.ImageUrl ||
          'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
      }}
    >
      <div className="c-publications-index">
        <section className="o-wrapper-medium">
          <PageIntro
            className="c-page-intro--about-u4"
            title="Publications"
            type="about-u4"
            text={
              sanityData.lead && <BlockContent blocks={sanityData.lead} serializers={serializers} />
            }
          />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium o-wrapper-mobile-full">
          <PostCarousel
            posts={sanityData.resources}
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
              <SearchFilters data={data} publications />
            </section>
            <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
              <SearchResults data={data} publications />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default wrapInRedux(PublicationsDataLoader(Publications));