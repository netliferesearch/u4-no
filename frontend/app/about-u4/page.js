import BlockContent from '@sanity/block-content-to-react';
import Image from "next/image";
import { PageIntro } from '../../components/general/PageIntro';
import { LinkBox } from '../../components/general/link-box/LinkBox';
import Layout from '@/app/components/layout/Layout';
import serializers from '../../components/serializers/serializers';
import { blocksToText } from '../../helpers/blocksToText';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import sanityImageLoader from '../../helpers/sanityImageLoader';

export default async function About({params}) {

  const data = await getData( params );
  const {about = {}} = data;
  const {about: { title = '', featuredImage = '', imageBlurDataURL = '', lead = '', relatedUrl = {} }} = data;

  return (
    <Layout>
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
              <LinkBox
                key={index}
                _type="about"
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
  )
};

export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData( params );
  const {about: {title = '', lead = '', featuredImage = ''}} = data;
 
  return getMetadata({
    title: title,
    description: blocksToText(lead),
    image: featuredImage
  });
}

const sanityQuery =  `{ 
    "about": *[(_id == "f54d724e-8471-4413-aeb8-3ef5276e9dfc") || (slug.current == "about-u4-new")][0] {
      title, slug, lead, _id, 
      "resources": resources[]->{title, standfirst, slug{current}}, 
      "featuredImage": featuredImage.asset->url,
      "imageBlurDataURL":featuredImage.asset->metadata.lqip,
    } 
  }`;

async function getData( params ) {
  const data = await fetchAndMaterialize( {
    query: sanityQuery, 
    params, 
    materializeDepth: 0, 
    tags: ['frontpage:about-u4-new']
  } );
  return data;
};