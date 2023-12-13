import Layout from '@/app/components/layout/Layout';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import { groq } from 'next-sanity';
import { PageIntro } from 'components/general/PageIntro';
import Glossary from '@/app/components/terms/Glossary';

export default async function Page({ params }){

  const terms = await getData(params);

  return (
    <Layout>
      <div className="c-glossary">
        <section className="o-wrapper-medium">
          <PageIntro
            className="c-page-intro--about-u4"
            title="Glossary"
            type="about-u4"
            text="This glossary presents how our anti-corruption experts explain and apply typical governance and corruption jargon."
          />
        </section>
        <hr className="u-section-underline--no-margins" />

        <Glossary terms={terms} />
      </div>
    </Layout>
  );
};

export const metadata = {
  title: 'Glossary',
  description: '',
}

const sanityQuery = groq`*[_type == "term"] | order(term)`;

const getData = async (params) => {
  const data = await fetchAndMaterialize({ 
    query: sanityQuery, 
    materializeDepth: 0,
    tags: ['term']
  });
  return data;
};