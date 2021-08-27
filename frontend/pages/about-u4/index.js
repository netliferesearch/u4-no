import React, { Component } from 'react';
import DataLoader from '../../helpers/data-loader';
import Layout from '../../components/Layout';
import ServiceArticle from '../../components/ServiceArticle';
import SimpleHero from '../../components/SimpleHero';
import { blocksToText } from '../../helpers/blocksToText';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { LinkBox } from '../../components/general/link-box/LinkBox';

const About = ({ data: { about = {}, url = {}, sections = [] } }) => {
  console.log(about.sections[13]);
  const { title = '', longTitle = '', featuredImage = {}, lead = '', relatedUrl = {} } = about;
  const history = about.sections.slice(13, 14);
  console.log(history[0].text);
  return (
    <Layout
      headComponentConfig={{
        title,
        description: blocksToText(lead),
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <section className="o-wrapper-medium">
        <PageIntro title={title} text={<BlockContent blocks={lead} serializers={serializers} />} />
      </section>
      <section className="o-wrapper-full">
        <div className="o-wrapper-medium">
          <div className="c-linkbox-wrapper--about">
            <LinkBox
              title={history[0].text[0].children[0].text}
              text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              // color={`${agenda.length > 0 ? 'white' : 'lighter-blue--full'}`}
            />
            <LinkBox
              title="Basic guide"
              text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              // color={`${agenda.length > 0 ? 'white' : 'lighter-blue--full'}`}
            />
            <LinkBox
              title="Basic guide"
              text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              // color={`${agenda.length > 0 ? 'white' : 'lighter-blue--full'}`}
            />
            <LinkBox
              title="Basic guide"
              text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              // color={`${agenda.length > 0 ? 'white' : 'lighter-blue--full'}`}
            />
            <LinkBox
              title="Basic guide"
              text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              // color={`${agenda.length > 0 ? 'white' : 'lighter-blue--full'}`}
            />
            <LinkBox
              title="Basic guide"
              text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              // color={`${agenda.length > 0 ? 'white' : 'lighter-blue--full'}`}
            />
          </div>
        </div>
      </section>
      {lead && <SimpleHero light title={title} content={lead} />}

      {sections ? <ServiceArticle blocks={sections} /> : null}

      <Footer />
    </Layout>
  );
};
export default DataLoader(About, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "about": *[slug.current == "about-u4"][0]{title, slug, lead, _id, "sections": sections, "featuredImage": featuredImage.asset->url} }',
    param: { slug },
  }),
  materializeDepth: 3,
});
