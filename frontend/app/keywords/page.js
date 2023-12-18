import Layout from '@/app/components/layout/Layout';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import { groq } from 'next-sanity';
import Link from 'next/link';

export default async function Page({ params }){

  const data = await getData(params);
  const { 
    keywords = [], 
    keywords_fr = [], 
    keywords_es = [], 
    countries = [], 
    regions = [] 
  } = data;

  return (
    
  <Layout>
    <div className="o-wrapper u-tc">
      <ListKeywordGroup items={keywords} title="Keywords" />
      <ListKeywordGroup items={keywords_fr} title="French keywords" />
      <ListKeywordGroup items={keywords_es} title="Spanish keywords" />
      <ListKeywordGroup items={countries} title="Countries" />
      <ListKeywordGroup items={regions} title="Regions" />
    </div>
  </Layout>
)};

const ListKeywordGroup = props => {
  const { items = [], title = '(title missing)' } = props;
  return (
    <div>
      <h1 className="u-margin-bottom">{title}</h1>
      <section className=" c-topic-index__list u-margin-bottom-huge">
        {items.map(
          ({ _id = false, keyword = 'Title is missing', relatedCount = 0 }) => (
            <div className="o-layout--middle c-topic-index__item" key={_id}>
              <div className="o-layout__item u-1/2@tablet u-tr">
                <div className="c-topic-index__left">
                  <div>
                    {relatedCount > 0 ? (
                      <span className="c-topic-index__title"><Link href={`/search?filters=keyword-${keyword}`}>{keyword}</Link></span>
                    ) : (
                      <span className="c-topic-index__title">{keyword}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="o-layout__item u-1/2@tablet u-tl">
                <div className="c-topic-index__right">
                  <svg
                    width={`${relatedCount}px`}
                    height="5px"
                    viewBox={`0 0 ${relatedCount} 2`}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    role="img"
                    title={`${relatedCount} items`}
                  >
                    <path d="M167.536783,1 L1,1" id="Line" stroke="#1E2051" />
                  </svg>
                  {relatedCount > 0 ? (
                    <span className="c-topic-index__count">{relatedCount}</span>
                  ) : (
                    <span className="c-topic-index__count">{relatedCount}</span>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export const metadata = {
  title: 'Keywords overview',
  description: '',
}
const sanityQuery = groq`{
      "keywords": *[_type == "keyword" && category == "keyword" && language == "en_US"][1..200]{
        _id, keyword, "relatedCount": count(*[_type in ["publication", "blog-post", "topics"] && references(^._id)])
      }|order(lower(keyword) asc),
      "keywords_fr": *[_type == "keyword" && category == "keyword" && language == "fr_FR"][1..200]{
        _id, keyword, "relatedCount": count(*[_type in ["publication", "blog-post", "topics"] && references(^._id)])
      }|order(lower(keyword) asc),
      "keywords_es": *[_type == "keyword" && category == "keyword" && language == "es_ES"][1..200]{
        _id, keyword, "relatedCount": count(*[_type in ["publication", "blog-post", "topics"] && references(^._id)])
      }|order(lower(keyword) asc),
      "countries": *[_type == "keyword" && category == "country" && language == "en_US"][1..200]{
        _id, keyword, "relatedCount": count(*[_type in ["publication", "blog-post", "topics"] && references(^._id)])
      }|order(lower(keyword) asc),
      "regions": *[_type == "keyword" && category == "region" && language == "en_US"][1..200]{
        _id, keyword, "relatedCount": count(*[_type in ["publication", "blog-post", "topics"] && references(^._id)])
      }|order(lower(keyword) asc)
    }`;

const getData = async (params) => {
  const data = await fetchAndMaterialize({ 
    query: sanityQuery, 
    materializeDepth: 0 
  });
  return data;
};