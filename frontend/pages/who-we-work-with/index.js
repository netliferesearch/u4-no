import React, { Component } from 'react';
import DataLoader from '../../helpers/data-loader';
import Layout from '../../components/Layout';
import { blocksToText } from '../../helpers/blocksToText';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { LinkBox } from '../../components/general/link-box/LinkBox';
import sanityImageLoader from '../../helpers/sanityImageLoader';
import Image from 'next/image';

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
          type="work-with"
          text={<BlockContent blocks={lead} serializers={serializers} />}
        />
      </section>
      <section className="o-wrapper-full">
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <div className="c-linkbox-wrapper--about">
            {about.resources.map((link, index) => (
              <LinkBox
                key={index}
                _type="work-with"
                slug={link.slug}
                title={link.title}
                text={link.standfirst}
                link="Read more"
              />
            ))}
            <div className="c-linkbox c-linkbox--white">
              <Image
                loader={sanityImageLoader}
                src={about.featuredImage}
                loading="lazy"
                layout="fill"
                objectFit="cover"
                objectPosition="top center"
                crop="focalpoint"
                auto="format"
                fit="crop"
              />
            </div>
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
      '{ "about": *[slug.current == "who-we-work-with"][0]{title, slug, lead, _id, "resources": resources[]->{...,slug}, "sections": sections, "featuredImage": featuredImage.asset->url} }',
    param: { slug },
  }),
  materializeDepth: 3,
});