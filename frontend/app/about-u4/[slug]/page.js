import { StoreProvider } from '@/app/lib/redux/redux-provider';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import Layout from '@/app/components/layout/Layout';
import ServiceArticle from 'components/ServiceArticle';
import { PageIntro } from 'components/general/PageIntro';
import ArticleContainer from 'components/article/ArticleContainer';
import { groq } from 'next-sanity';

//const store = initStore();

async function FrontPage( data ){
  const { title = '', featuredImage = {}, lead = '', sections, relatedUrl = {} } = data;

  return (
    <Layout  >
      {lead || (title && <PageIntro title={title} text={lead ? lead : ''} />)}
      {sections ? <ServiceArticle blocks={sections} /> : null}
    </Layout>
  )
}

export default async function AboutPage({params}){

  const data = await getData( params );

  return (
    <StoreProvider>
      {data._type === 'frontpage' ? (
        <FrontPage data={data} />
      ) : (
        <ArticleContainer data={data} breadCrumbTitle="About U4" />
      )}
    </StoreProvider>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData( params );
  const {title = '', lead = '', featuredImage = ''} = data;
 
  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage
  });
}

const sanityQuery = groq`*[slug.current == $slug][0] {
  content[]{'markDefs':markDefs[]{
    _type == 'internalReferance' => {_key,_type,"target": @->{_id,_type,title,slug}},
    _type != 'internalReferance' => {...},
  },...}, 
  ..., topics[]->{ _id, title, slug }, "articleType": articleType[0]->title
}`;


async function getData( params ) {
  const data = await fetchAndMaterialize({
    query: sanityQuery, 
    params, 
    materializeDepth: 2, 
    tags: [`frontpage:${params.slug}`]
  });
  return data;
};

export async function generateStaticParams() {
  return [
    { slug: 'our-organisation-history' }, 
    { slug: 'vision-strategy' },
    { slug: 'operational-guides-policies' },
    { slug: 'vacancies-opportunities' },
  ]
};