import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import hasContent from '@/app/lib/util/hasContent';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { ArticleHeader } from 'components/general/article-header/ArticleHeader';
import { ArticleSidebar } from 'components/general/article-sidebar/ArticleSidebar';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { POST_TYPE } from 'components/general/post/Post';
import { PublicationAdditionalInfo } from 'components/publication/PublicationAdditionalInfo';
import LongformArticle from '@/app/components/publication/LongformArticle';
import LongformArticleContent from '@/app/components/publication/LongformArticleContent';
import { PublicationNotifications } from 'components/publication/PublicationNotifications';
import { groq } from 'next-sanity';

export default async function BlogPage( {params} ) {

  const data = await getData( params );
  const {
    _type = '',
    title = '',
    authors = [],
    date = '',
    _updatedAt = '',
    featuredImage = {},
    standfirst = '',
    lead = '',
    content = [],
    headsUp = '',
    pdfFile = {},
    legacypdf = {},
    relatedResources = [],
    topics = '',
    keywords = null,
  } = data;

  return (
    <Layout>
      <article className={`c-blog-entry ${featuredImage.asset ? '' : 'c-blog-entry--no-img'}`}>
        <section className="o-wrapper-medium">
          <BreadCrumbV2 title="Blog" parentSlug="/blog" home />
          <ArticleHeader data={data} />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium ">
          <div className="c-article__row">
            <div className="content c-article__col">
              <div className="u-margin--article-top">

                {headsUp &&  <PublicationNotifications headsUp={headsUp} />}  

                <LongformArticle>
                  <LongformArticleContent content={content} title={title} />
                </LongformArticle>
              </div>

            </div>
            <div className="c-article__side c-article__col">
              <ArticleSidebar data={data} />
            </div>
          </div>
        </section>

        <PublicationAdditionalInfo data={data} />
      </article>

      {hasContent(relatedResources) &&
        <section className="">
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={relatedResources}
              type={POST_TYPE.BLOG}
              buttonPath="/publications"
              title="Related Content"
              minPosts={3}
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        </section>
      }

      <div id="modal" />
    </Layout>
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

const sanityQuery = groq`*[_type  == "blog-post" && slug.current == $slug]{
    _id, 
    _type, 
    _updatedAt, 
    title, 
    date, 
    content, 
    authors[]->{ firstName, surname, position, "slug": slug.current, bioShort },
    lead, 
    standfirst, 
    headsUp, 
    topics[]->{title, "slug": slug.current}, 
    keywords[]->{category, keyword, translation->{_id, keyword}}, 
    "slug": slug.current, 
    language, 
    translation,
    basedonpublication->{_id,_type,title,"slug":slug.current},
    featuredImage{caption,credit,sourceUrl,license, asset->{altText,url,metadata{lqip,dimensions{width,height}}}},
    "translations": *[ _type == 'blog-post' && ( _id != ^._id ) && ( ( _id == ^.translation._ref) || translation._ref == coalesce(^.translation._ref, ^._id ))]{title, "slug": slug.current, language},
    "relatedResources": relatedContent[0..2]->{_type, _id, title, publicationType->{ title }, "articleTypeTitle": articleType[0]->title, "imageUrl": featuredImage.asset->url, startDate, date, standfirst, lead, "slug": slug.current, topics[]->{title}}
  }[0]`;

  async function getData( params ) {
    const data = await fetchAndMaterialize({
      query: sanityQuery, 
      params, 
      tags: [`blog-post:${params.slug}`],
      materializeDepth: 2
    });
    return data;
  };
  
// pre-render 1000 most recent
export async function generateStaticParams() {
  const sanityQuery = `*[_type == 'blog-post']{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize( {query: sanityQuery, materializeDepth: 0} );
  return data;
};