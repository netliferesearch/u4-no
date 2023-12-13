import { StoreProvider } from '@/app/lib/redux/redux-provider';
import { groq } from 'next-sanity';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import getMetadata from '@/app/lib/getMetadata';
import { localize } from 'helpers/translate';
import BlockContent from '@sanity/block-content-to-react';
import serializers from 'components/serializers/serializers';
import Reader from '../../../components/publication/Reader';
import PublicationContainer from '../../../components/publication/PublicationContainer';
import LongformArticle from '../../../components/publication/LongformArticle';
import LongformArticleContent from '../../../components/publication/LongformArticleContent';
import { PublicationContent } from 'components/publication/PublicationContent';
import { ArticleSidebar } from 'components/general/article-sidebar/ArticleSidebar';
import ToggleBlock from '@/app/components/publication/ToggleBlock';
import Footer from 'components/general/footer/Footer';
import buildTitleObjects from 'components/TableOfContents/buildTitleObjects';

export default async function PublicationEntry({ params }) {

  const data = await getData(params);

  const {
    content = [],
    references = null,
    abbreviations = null,
    lead = false,
    ...readerData
  } = data;

  const titleObjects = data.content ? buildTitleObjects(data.content) : [];

  return (
    <StoreProvider>
      <Reader data={readerData} titleObjects={titleObjects}>

        <LongformArticle  >
          <LongformArticleContent content={content} lead={lead} />
          {references && (
            <ToggleBlock title="References" >
              <BlockContent blocks={references} serializers={serializers} />
            </ToggleBlock>
          )}
          {abbreviations && (
            <ToggleBlock title="Abbreviations" >
              <BlockContent blocks={abbreviations} serializers={serializers} />
            </ToggleBlock>
          )}
        </LongformArticle>

      </Reader>
    </StoreProvider>
  );
};


export async function generateMetadata({ params, searchParams }, parent) {

  const data = await getData(params);
  const { title = '', lead = '', featuredImage = '' } = data;

  const metadata = getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url,
    robots: {
      index: false,
    }
  });
  return metadata;
}

const sanityQuery = groq`*[_type == 'publication' && slug.current == $slug]{ _type, _id,
  abbreviations, abstract, acknowledgements,
  authors[]->{_id, ${localize('bioShort')}, affiliations[]->{_id,name}, email, ${localize('firstName')}, slug, ${localize('surname')}, position },
  bibliographicalOverride, blurbs, content, date,
  editors[]->{ _id, affiliations[]->{_id,name}, email, ${localize('firstName')}, slug, ${localize('surname')}, position },
  featuredImage{caption,credit,sourceUrl,license,asset->{url}}, "imageBlurDataURL":featuredImage.asset->metadata.lqip,
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
  "slug": slug.current, standfirst, subtitle, summary, summaryExternal, title,
  topics[]->{ _id, title, slug },
  "translations":
          *[_type == 'publication' && _id != ^._id && (_id==coalesce(^.translation._ref,^._id) || (translation._ref == coalesce(^.translation._ref,^._id)))]{_id,
             title, "slug": slug.current, language
           },
  "updatedVersion": updatedVersion->{title,slug,publicationType,publicationNumber,date,reference},
}[0]`;

async function getData(params) {
  const data = await fetchAndMaterialize({
    query: sanityQuery,
    params,
    materializeDepth: 2,
    tags: [`publication:${params.slug}`]
  });
  return data;
};

// pre-render 1000 most recent
export async function generateStaticParams() {
  const sanityQuery = groq`*[_type == 'publication' && defined(content)]{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize({ query: sanityQuery, materializeDepth: 0 });
  return data;
};