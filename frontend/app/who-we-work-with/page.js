import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import BlockContent from '@sanity/block-content-to-react';
import Image from "next/image";
import { PageIntro } from '../../components/general/PageIntro';
import Footer from '../../components/general/footer/Footer';
import { LinkBox } from '../../components/general/link-box/LinkBox';
import serializers from '../../components/serializers/serializers';
import { blocksToText } from '../../helpers/blocksToText';
import sanityImageLoader from '../../helpers/sanityImageLoader';
import { groq } from 'next-sanity';

export default async function About({params}) {

  const data = await getData( params );
  const {
    title = '', 
    featuredImage = '', 
    imageBlurDataURL = '', 
    lead = '', 
    resources = [],
  } = data;

  return (
    <Layout>
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
            {resources.map((link, index) => (
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
                src={featuredImage}
                blurDataURL={imageBlurDataURL}
                loading="lazy"
                crop="focalpoint"
                auto="format"
                fit="crop"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "top center"
                }} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData( params );
  const {
    title = '', 
    lead = '', 
    featuredImage = ''
  } = data;
 
  return getMetadata({
    title: title,
    description: blocksToText(lead),
    image: featuredImage
  });
}

const sanityQuery = groq`*[(_id == "7157dd32-061a-48f5-a405-8899d815f5a3") || (slug.current == "who-we-work-with")][0] {
  title, 
  "slug": slug.current, 
  lead, 
  "resources": resources[]->{title, standfirst, "slug":slug.current}, 
  "featuredImage": featuredImage.asset->url,
  "imageBlurDataURL":featuredImage.asset->metadata.lqip,
 }`;

async function getData( params ) {
  const data = await fetchAndMaterialize( {
    query: sanityQuery, 
    params, 
    materializeDepth: 0,
    tags: ['frontpage:who-we-work-with']
  });
  return data;
};