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
import TextClamp from 'react-string-clamp';

const About = ({ data: { about = {}, url = {}, sections = [] } }) => {
  console.log(about.sections);
  const { title = '', longTitle = '', featuredImage = {}, lead = '', relatedUrl = {} } = about;
  const history = {
    title: about.sections[13].text[0].children[0].text,
    content: about.sections[13].text[1].children[0].text,
  };
  const strategy = {
    title: about.sections[9].textLeft[0].children[0].text,
    content: about.sections[9].textLeft[1].children[0].text,
  };
  const policies = {
    title: about.sections[12].block[0].children[0].text,
    content: about.sections[12].block[1].children[0].text,
  };
  const vacancies = {
    title: about.sections[8].text[3].children[0].text,
  };
  console.log(vacancies.content);
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
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <div className="c-linkbox-wrapper--about">
            <LinkBox
              title={history.title}
              text={<TextClamp text={history.content} lines={3} />}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              color="light-blue"
            />
            <LinkBox
              title="Our people"
              text={
                <TextClamp
                  text={
                    'We are lawyers, political scientists, communicators, managers, innovators, coordinators, and designers.'
                  }
                  lines={3}
                />
              }
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              color="highlight-blue"
            />
            <LinkBox
              title={strategy.title}
              text={<TextClamp text={strategy.content} lines={3} />}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              color="blue"
            />
            <LinkBox
              title={policies.title}
              text={<TextClamp text={policies.content.slice(0, 88)} lines={3} />}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              color="light-blue"
            />
            <LinkBox
              title={vacancies.title}
              text={<TextClamp text={strategy.content} lines={3} />}
              // icon={BasicGuide}
              _type="topicsBasics"
              // slug={slug}
              color="highlight-blue"
            />
          </div>
        </div>
      </section>
      {/* {lead && <SimpleHero light title={title} content={lead} />}

      {sections ? <ServiceArticle blocks={sections} /> : null}  */}

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
