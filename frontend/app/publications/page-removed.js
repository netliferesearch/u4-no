import { client as sanityClient } from 'helpers/sanityClient.pico';
import { Layout } from '@/app/components/layout/Layout';
import { PageIntro } from '../../components/general/PageIntro';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import PublicationSearch from './PublicationSearch';
import { StoreProvider } from '@/app/lib/redux/redux-provider';
import { doSearch, getSearchAggregations } from './publications-data-loader';


export default async function Publications ({searchParams}) {

  const [sanityData,aggregationData,searchData] = await getData( searchParams);
  const {aggregations} = aggregationData;
  return (
    <StoreProvider>
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

        <PublicationSearch aggregations={aggregations} searchResults={searchData} />

      </div>
    </Layout>
    </StoreProvider>
  );
};

async function getData(searchParams) {
  const sanityQuery = `*[_type=="frontpage" && slug.current == "publications"][0]{
        id,
        title,
        lead,
        sections,
        lead,
        "imageUrl": featuredImage.asset->url,
        "resources": resources[]->{
          _id,
          _type,
          "publicationType": publicationType->title,
          title,
          date,
          standfirst,
          topics[]->{title},
          "slug": slug.current,
          "titleColor": featuredImage.asset->metadata.palette.dominant.title,
          "imageUrl": featuredImage.asset->url,
          "imageBlurDataURL":featuredImage.asset->metadata.lqip,
          "pdfFile": pdfFile.asset->url,
        }[0..3],
      }`;
    const [sanityData, aggregationData, searchData] = await Promise.all([
    sanityClient.fetch(sanityQuery, {}), 
    getSearchAggregations(),
    doSearch({query: searchParams}),
  ]);

  return [sanityData, aggregationData, searchData];
}
