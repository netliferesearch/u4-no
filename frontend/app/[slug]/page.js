import { StoreProvider } from '@/app/lib/redux/redux-provider';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import ArticleContainer from 'components/article/ArticleContainer';
import { groq } from 'next-sanity';

export default async function AboutPage({params}){

  const data = await getData( params );

  return (
    <StoreProvider>
        <ArticleContainer data={data} breadCrumbTitle="About" />
    </StoreProvider>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData( params );
  const {
    title = '', 
    lead = '', 
    imageUrl = ''
  } = data;
 
  return getMetadata({
    title: title,
    description: lead,
    image: imageUrl
  });
}

const sanityQuery = groq`*[slug.current == $slug && _type == 'article'][0]{
  ..., 
  topics[]->{ 
    title, 
    "slug": slug.current 
  }, 
  "articleType": articleType[0]->title,
  "recommendedResources": relatedContent[]->{ 
    _type, 
    title, 
    "slug": slug.current, 
    publicationType->{ title }, 
    "articleTypeTitle": articleType[0]->title, 
    publicationNumber, 
    date, 
    reference, 
    "imageUrl": featuredImage.asset->url 
  },
}`;

async function getData( params ) {
  const data = await fetchAndMaterialize({
    query: sanityQuery, 
    params, 
    materializeDepth: 2, 
    tags: [`article:${params.slug}`]
  });

  return data;
};
