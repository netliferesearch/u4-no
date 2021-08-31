import React, { Component } from 'react';
import DataLoader from '../../helpers/data-loader';
import Layout from '../../components/Layout';
import { blocksToText } from '../../helpers/blocksToText';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { LinkBox } from '../../components/general/link-box/LinkBox';

const About = ({ data: { about = {}, url = {} } }) => {
  const { title = '', featuredImage = {}, lead = '', relatedUrl = {} } = about;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: blocksToText(lead),
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <section className="o-wrapper-medium">
        <PageIntro
          className="c-page-intro--about-u4"
          title={title}
          type="about-u4"
          text={<BlockContent blocks={lead} serializers={serializers} />}
        />
      </section>
      <section className="o-wrapper-full">
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <div className="c-linkbox-wrapper--about">
            {about.resources.map((link, index) => (
              <LinkBox key={index} _type="about" slug={link.slug} title={link.title} text={link.standfirst}/>
            ))}
            <div className="c-linkbox c-linkbox--white" />
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};
export default DataLoader(About, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "about": *[slug.current == "about-u4-new"][0]{title, slug, lead, _id, "resources": resources[]->{...,slug}, "sections": sections, "featuredImage": featuredImage.asset->url} }',
    param: { slug },
  }),
  materializeDepth: 3,
});
