import Layout from '@/app/components/layout/Layout';
import LongformArticle from '@/app/components/publication/LongformArticle';
import LongformArticleContent from '@/app/components/publication/LongformArticleContent';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import { firstParagraphIn, firstTitleIn } from '@/app/lib/sanity/findInBlocks';
import { AboutAuthor } from 'components/blog/AboutAuthor';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { ArticleActions } from 'components/general/article-actions/ArticleActions';
import { ArticleSidebar } from 'components/general/article-sidebar/ArticleSidebar';
import { Disclaimers } from 'components/general/disclaimers/Disclaimers';
import { groq } from 'next-sanity';

export default async function TopicArticle({ params }) {

  const data = await getData( params );

  const { 
    title = '', 
    introduction = [],
    advisors = [],
  } = data;

  return (
      <Layout>
        <article className="c-publication-container c-article-v2">

          <section className="o-wrapper-medium">
            <BreadCrumbV2
              title={title}
              parentSlug={'/topics/' + data.slug}
              grandParentTitle={'Topics'}
              grandParentSlug={'/topics'}
              home={true}
            />
          </section>

          <hr className="u-section-underline--no-margins" />

          <section className="o-wrapper-medium">
            <div className="c-article__row">
              <div className="content c-article__col">
                <LongformArticle>
                  <LongformArticleContent content={introduction} title={title} />
                </LongformArticle>
              </div>
              <div className="c-article__side c-article__col">
                <ArticleSidebar data={data} />
              </div>
            </div>
          </section>

          <section className="u-bg--lighter-blue c-article__additional-content">
            <div className="o-wrapper-medium">
              <div className="o-wrapper-narrow">
                <ArticleActions data={data} />
                <AboutAuthor authors={advisors} />
                <Disclaimers title={true} />
              </div>
            </div>
          </section>

        </article>
        <div id="modal" />
      </Layout>
  );
};

export async function generateMetadata({ params }) {

  const data = await getData( params );
  const {
    title = '',
    introduction = [], 
    featuredImage = {},
  } = data;

  return getMetadata({
    title: firstTitleIn( introduction ) || `Basic guide - ${title}`,
    description: firstParagraphIn( introduction),
    image: featuredImage?.asset?.url,
  });
}

const sanityQuery = groq`*[slug.current == $slug && _type == "topics"][0]{
  title, 
  longTitle, 
  explainerText, 
  "slug": slug.current, 
  introduction[]{
    'markDefs':markDefs[]{
      _type == 'internalReferance' => {_key,_type,"target": @->{_id,_type,title,slug}},
      _type != 'internalReferance' => {...},
    },
    ...
  }, 
  relatedUrl, 
  url, 
  featuredImage{asset->{url}}, 
  authors[]->{
    firstName, 
    surname, 
    position, 
    "slug": slug.current, 
    bioShort, 
    affiliations[]->{_id, name},
  }
}`;

async function getData( params ) {
  const data = await fetchAndMaterialize({
    query: sanityQuery, 
    params, 
    tags: [`topics:${params.slug}`],
    materializeDepth: 1
  });
  return data;
};

// pre-render
export async function generateStaticParams() {
  const sanityQuery = groq`*[_type == 'topics' && defined(introduction)]{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize( {query: sanityQuery, materializeDepth: 0} );
  return data;
};