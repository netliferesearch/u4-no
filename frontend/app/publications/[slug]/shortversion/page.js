import { groq } from 'next-sanity';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import Layout from '@/app/components/layout/Layout';
import ShortVersionContainer from '../../../components/publication/ShortVersionContainer';
import LongformArticleContent from '../../../components/publication/LongformArticleContent';
import LongformArticle from '../../../components/publication/LongformArticle';

export default async function PublicationEntry( {params} ) {
  
  const data = await getData( params );

  return (
      <Layout
        showLoadingScreen={false}
        showTopTab={true}
      >
        <ShortVersionContainer data={data} >
          <LongformArticle>
            <LongformArticleContent content={data.summary} />
          </LongformArticle>
        </ShortVersionContainer>
      </Layout>
  );
};

export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData( params );
  const {title = '', lead = '', featuredImage = ''} = data;
 
  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url,
    robots: {
      index: false,
    }
  });
}

const sanityQuery = `*[_type == 'publication' && slug.current == $slug]{ _type, _id,
  featuredImage{asset->{url}}, 
  language,
  publicationType->{ _id, title },
  "recommendedResources":
    relatedContent[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  "relatedResources":
      related[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  slug, subtitle, summary, summaryExternal, title,
}[0]`;

async function getData( params ) {
  const data = await fetchAndMaterialize( {
    query: sanityQuery, 
    params, 
    materializeDepth: 2,
    tags: [`publication:${params.slug}`]
  } );
  return data;
};

// pre-render 1000 most recent
export async function generateStaticParams() {
  const sanityQuery = groq`*[(_type == 'publication') && defined(summary)]{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize( {query: sanityQuery, materializeDepth: 0} );
  return data;
};