import React, { Component } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import sanityImageLoader from '../../helpers/sanityImageLoader';
import { fetchAndMaterialize } from '../../helpers/data-loader';
import { blocksToText } from '../../helpers/blocksToText';
import Layout from '../../components/Layout';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import serializers from '../../components/serializers/serializers';
import { LinkBox } from '../../components/general/link-box/LinkBox';

const About = ({ data: { about = {}, url = {} } }) => {
  const { title = '', featuredImage = '', imageBlurDataURL = '', lead = '', relatedUrl = {} } = about;
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
                blurDataURL={imageBlurDataURL}
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

export default About;

const queryFunc = () => ({
  sanityQuery: `{ 
    "about": *[(_id == "7157dd32-061a-48f5-a405-8899d815f5a3") || (slug.current == "who-we-work-with")][0] {
      title, slug, lead, _id, 
      "resources": resources[]->{title, standfirst, slug{current}}, 
      "featuredImage": featuredImage.asset->url,
      "imageBlurDataURL":featuredImage.asset->metadata.lqip,
    } 
  }`,
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 0,
  });
  if (error === 'No content found (dataLoader said this)') {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate: 60,
  };
};