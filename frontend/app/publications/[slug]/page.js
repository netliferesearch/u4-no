import { Suspense } from 'react';
import { groq } from 'next-sanity';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import { localize } from 'helpers/translate';
import BlockContent from '@sanity/block-content-to-react';
import serializers from 'components/serializers/serializers';
import Layout from '@/app/components/layout/Layout';
import PublicationContainer from '../../components/publication/PublicationContainer';
import { PublicationContent } from 'components/publication/PublicationContent';
import { ArticleSidebar } from 'components/general/article-sidebar/ArticleSidebar';

export default async function PublicationEntry( {params} ) {

  const data = await getData( params );

  return (
      <Layout
        showLoadingScreen={false}
        showTopTab={true}
      >
        <PublicationContainer data={data}
          publicationContentComponent={<PublicationContent {...data} />}
          articleSidebarComponent={<ArticleSidebar data={data} />}
          >
        </PublicationContainer>
        
      </Layout>
  );
};


export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData( params );
  const {title = '', lead = '', featuredImage = {}, pdfThumbnail = {}} = data;
 
  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage ? featuredImage.asset?.url : pdfThumbnail?.asset?.url
  });
}

const sanityQuery = groq`*[_type == 'publication' && slug.current == $slug]{
  _type, 
  _id,
  "abbreviations": [], 
  abstract, 
  acknowledgements,
  authors[]->{
    _id, 
    ${localize('bioShort')}, 
    affiliations[]->{_id,name}, 
    email, 
    ${localize('firstName')}, 
    "slug": slug.current, 
    ${localize('surname')}, 
    position 
  },
  bibliographicalOverride, 
  "hasContent": defined(content), 
  date,
  editors[]->{
    _id, 
    affiliations[]->{_id,name}, 
    email, 
    ${localize('firstName')}, 
    "slug": slug.current, 
    ${localize('surname')}, 
    position 
  },
  featuredImage{caption,credit,sourceUrl,license,asset->{url}}, 
  headsUp, 
  keywords[]->{_id, keyword, category, translation->{_id, keyword}}, 
  language,
  lead, 
  legacypdf, 
  mainPoints, 
  methodology, 
  notes, 
  partners[]->{
    _id,name,description,logo{asset->{url,metadata{lqip,dimensions{width,height}}}},
  }, 
  pdfFile, 
  pdfThumbnail{_type,asset->{url,metadata{lqip,dimensions{width,height}}}},
  publicationNumber,
  publicationType->{ _id, title },
  reference, 
  "references": [],
  "recommendedResources": relatedContent[]->{
    _type, 
    _id, 
    title, 
    "slug": slug.current, 
    publicationType->{ title }, 
    "articleTypeTitle": articleType[0]->title, 
    publicationNumber, 
    date, 
    reference, 
    "imageUrl": featuredImage.asset->url 
  },
  "relatedResources": related[]->{
    _type, 
    _id, 
    title, 
    "slug": slug.current, 
    publicationType->{ title }, 
    "articleTypeTitle": articleType[0]->title, 
    publicationNumber, 
    date, 
    reference, 
    "imageUrl": featuredImage.asset->url 
  },
  "slug": slug.current, 
  standfirst, 
  subtitle, 
  "hasSummary": defined(summary), 
  summaryExternal, 
  title,
  topics[]->{ _id, title, slug },
  "translations": *[_type == 'publication' && _id != ^._id && (_id==coalesce(^.translation._ref,^._id) || (translation._ref == coalesce(^.translation._ref,^._id)))]{
    _id,
    title, 
    "slug": slug.current, 
    language
  },
  "updatedVersion": updatedVersion->{title,slug,publicationType,publicationNumber,date,reference},
}[0]`;

async function getData( params ) {
  const data = await fetchAndMaterialize({
    query: sanityQuery, 
    params, 
    tags: [`publication:${params.slug}`],
    materializeDepth: 0
  });
  return data;
};

// pre-render 1000 most recent
export async function generateStaticParams() {
  const sanityQuery = `*[_type == 'publication']{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize( {query: sanityQuery, materializeDepth: 0} );
  return data;
};