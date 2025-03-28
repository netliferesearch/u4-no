import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import { PageIntro } from '@/components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from 'components/serializers/serializers';
import { List } from '@/app/components/measurement-tool/List';
import { groq } from 'next-sanity';
import { CARD_TYPE } from '@/components/general/blue-card/BlueCard';
import { TextImage } from 'components/general/text-image/TextImage';
import ToggleBlock from '@/app/components/publication/ToggleBlock';

function getTitle(blocks) {
  if (!blocks) return '';
  for (const block of blocks) {
    if (block._type === 'block' && block.style === 'h3') {
      const firstSpan = block.children.find(child => child._type === 'span');
      return firstSpan ? firstSpan.text : null;
    }
  }
  return null;
}
export default async function Tools({ params }) {
  const data = await getData(params);
  const { frontPage } = data;
  const sections = frontPage.sections;
  const tools = data.tools.map((tool, index) => ({
    ...tool,
    defaultIndex: index,
    //mode: tool.mode === 'Self-paced' ? 'Self-paced' : 'Facilitated',
    //startDate:
    //  tool.startDate && new Date(tool.startDate.utc) > new Date() ? tool.startDate : null,
  }));
  return (
    <Layout>
      <div className="c-search-page ">
        <section className="o-wrapper-medium">
          <PageIntro
            className=""
            title={frontPage.title}
            type="about-u4"
            text={
              frontPage.lead && <BlockContent blocks={frontPage.lead} serializers={serializers} />
            }
          />
        </section>

        <div className="o-wrapper-medium ">
          <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue u-padding-top--no">
            Explore categories
          </h4>
          <div className=" u-bottom-margin--24" />
          {sections &&
            sections.map(
              section =>
                section?.text && (
                  <ToggleBlock title={getTitle(section.text)}>
                    <BlockContent blocks={section.text.slice(1)} serializers={serializers} />
                  </ToggleBlock>
                )
            )}
        </div>

        <div className="o-wrapper-medium ">
          <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Explore tools</h4>
        </div>

        <div className="o-wrapper-medium">
          <List tools={tools} />
        </div>
      </div>
    </Layout>
  );
}

export async function generateMetadata({ params }) {
  const data = await getData(params);
  const { frontPage: { title = '', lead = '', featuredImage = '' } = {} } = data;

  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url,
  });
}

const sanityQuery = groq`{
    "frontPage": *[(_type=="frontpage") && ((slug.current == "measurement-tools"))][0]{
      _id,
      title,
      lead,
      sections,
    },
    "tools": *[_type=="measurementTool"]{
      _id,
      "type": _type,
      title,
      publisher,
      link,
      category,
      description,
      strengths,
      limitations,
      regions,
      timeframe_from,
      timeframe_to,
      frequency,
      datasource,
      "slug": slug.current,

    }
  }`;

async function getData(params) {
  const data = await fetchAndMaterialize({
    query: sanityQuery,
    params,
    tags: ['measurementTool', 'frontpage:measurement-tools'],
    materializeDepth: 2,
  });
  return data;
}
