import { StoreProvider } from 'helpers/redux-provider';
import { fetchAndMaterialize } from 'helpers/fetchAndMaterialize';
import getMetadata from 'helpers/getMetadata';
import { localize } from 'helpers/translate';
import Layout from 'components/layout/Layout';
import PublicationContainer from './PublicationContainer';
import LongformArticle from './LongformArticle';
import LongformArticleContent from './LongformArticleContent';

export default async function PublicationEntry( {params} ) {

  const data = await getData( params );

  return (
    <StoreProvider>
      <Layout
        showLoadingScreen={false}
        showTopTab={true}
      >
        <PublicationContainer data={data}>
          <LongformArticle>
            <LongformArticleContent data={data} />
          </LongformArticle>
        </PublicationContainer>
        
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
  abbreviations, abstract, acknowledgements,
  authors[]->{_id, ${localize('bioShort')}, affiliations[]->{_id,name}, email, ${localize('firstName')}, slug, ${localize('surname')}, position },
  bibliographicalOverride, blurbs, content, date,
  editors[]->{ _id, affiliations[]->{_id,name}, email, ${localize('firstName')}, slug, ${localize('surname')}, position },
  featuredImage{caption,credit,sourceUrl,license,asset->{url}}, 
  headsUp, 
  keywords[]->{_id, keyword, category, translation->{_id, keyword}}, 
  language,
  lead, legacypdf, mainPoints, methodology, notes, partners, pdfFile, 
  pdfThumbnail{_type,asset->{url,metadata{lqip,dimensions{width,height}}}},
  publicationNumber,
  publicationType->{ _id, title },
  reference, references,
  "recommendedResources":
    relatedContent[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  "relatedResources":
      related[]->{ _type, _id, title, slug, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, publicationNumber, date, reference, "imageUrl": featuredImage.asset->url },
  slug, standfirst, subtitle, summary, summaryExternal, title,
  topics[]->{ _id, title, slug },
  "translations":
          *[_type == 'publication' && _id != ^._id && (_id==coalesce(^.translation._ref,^._id) || (translation._ref == coalesce(^.translation._ref,^._id)))]{_id,
             title, "slug": slug.current, language
           },
  "updatedVersion": updatedVersion->{title,slug,publicationType,publicationNumber,date,reference},
}[0]`;

async function getData( params ) {
  const data = await fetchAndMaterialize( {sanityQuery, params, materializeDepth: 2} );
  return data;
};