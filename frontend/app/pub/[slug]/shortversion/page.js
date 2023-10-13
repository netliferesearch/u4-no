import { StoreProvider } from 'helpers/redux-provider';
import { fetchAndMaterialize } from 'helpers/fetchAndMaterialize';
import getMetadata from 'helpers/getMetadata';
import Layout from 'components/layout/Layout';
import ShortVersionContainer from './ShortVersionContainer';
import LongformArticleContent from '../LongformArticleContent';
import LongformArticle from '../LongformArticle';

export default async function PublicationEntry( {params} ) {
  
  const data = await getData( params );

  return (
    <StoreProvider>
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
    </StoreProvider>
  );
};

export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData( params );
  const {title = '', lead = '', featuredImage = ''} = data;
 
  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url
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
  const data = await fetchAndMaterialize( {sanityQuery, params, materializeDepth: 2} );
  return data;
};

export const getStaticPaths = async ctx => {
  return {
    paths: [],
    fallback: true,
  };
};