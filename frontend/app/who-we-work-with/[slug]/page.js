//import React from 'react';
//import { Provider } from 'react-redux';
//import { initStore } from '../../../helpers/redux-store';
import { StoreProvider } from '../../../helpers/redux-provider';
import { fetchAndMaterialize } from '../../../helpers/fetchAndMaterialize';
import getMetadata from '../../../helpers/getMetadata';
import { blocksToText } from '../../../helpers/blocksToText';
import Footer from '../../../components/general/footer/Footer';
import Layout from '../../../components/layout/Layout';
import ServiceArticle from '../../../components/ServiceArticle';
import { PageIntro } from '../../../components/general/PageIntro';
import ArticleContainer from '../../../components/article/ArticleContainer';

//const store = initStore();

async function FrontPage( data ){
  const { title = '', featuredImage = {}, lead = '', sections, relatedUrl = {} } = data;

  return (
    <Layout  >
      {lead || (title && <PageIntro title={title} text={lead ? lead : ''} />)}
      {sections ? <ServiceArticle blocks={sections} /> : null}
      <Footer />
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
        <ArticleContainer data={data} breadCrumbTitle="Who we work with" />
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

const sanityQuery = `*[slug.current == $slug][0] {
    content[]{'markDefs':markDefs[]{
      _type == 'internalReferance' => {_key,_type,"target": @->{_id,_type,title,slug}},
      _type != 'internalReferance' => {...},
    },...}, 
    ..., topics[]->{ _id, title, slug }, "articleType": articleType[0]->title
  }`;

  async function getData( params ) {
    const data = await fetchAndMaterialize( {sanityQuery, params, materializeDepth: 2} );
    return data;
  };
  
  export async function generateStaticParams() {
    return [
      { slug: 'u4-partner-agencies' }, 
      { slug: 'become-a-partner' },
    ]
  };