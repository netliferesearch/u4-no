import React from 'react';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import Layout from '../../components/Layout';
import { Scrollchor } from 'react-scrollchor';
import { Testimonial } from '../../components/Testimonial';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import { SideBox } from '../../components/general/side-box/SideBox';
import { CARD_TYPE } from '../../components/general/blue-card/BlueCard';
import { LearningEvents } from '../../components/front-page/LearningEvents';
import { Banner } from '../../components/general/banner/banner';

const CoursesPage = ({
  data: {
    service: {
      title = '',
      longTitle = '',
      featuredImage = '',
      lead = [],
      sections = [],
      relatedUrl = {},
      persons = {},
      resources = [],
    } = {},
  } = {},
  url = {},
}) => {
  const featuresHeading = sections.slice(0, 1);
  const features = sections.slice(1, 2);
  const courses1 = sections.filter(i => i._type === 'courses')[0].coursesRef;
  const courses2 = sections.filter(i => i._type === 'courses')[1].coursesRef;
  const boxAndImg1 = sections.filter(i => i._type === 'boxOnImageRef')[0];
  const boxAndImg2 = sections.filter(i => i._type === 'boxOnImageRef')[1];
  const twoCols = sections.filter(i => i._type === 'twoColumns')[0];

  return (
    <Layout
      headComponentConfig={{
        title,
        description: longTitle,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <div className="c-service-page c-courses-page">
        <section className="o-wrapper-medium">
          <div className="c-service-page__top">
            <div className="c-service-page__intro">
              <PageIntro
                title={longTitle}
                text={<BlockContent blocks={lead} serializers={serializers} />}
              />
              <div className="c-btn c-btn--primary c-btn--child-link">
                <Scrollchor to="#courses" disableHistory>
                  Start for free
                </Scrollchor>
              </div>
            </div>
            <SideBox>
              <BlockContent blocks={featuresHeading} serializers={serializers} />
              <BlockContent blocks={features} serializers={serializers} />
            </SideBox>
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />
        <section id="courses" className="o-wrapper-medium">
          <LearningEvents
            events={courses1}
            type={courses1.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Open for Everyone"
            text="Pass the self-paced, 1-hour course"
          />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium">
          <LearningEvents
            events={courses2}
            type={courses2.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Expert-led courses"
            text="In-depth, expert-led courses for our partner agencies"
          />
        </section>
        <section>
          <Banner title={'What participant say'}>
            {resources.length > 0
              ? resources
                  .filter(r => r._type === 'testimonial')
                  .map(r => <Testimonial key={r._id} testimonial={r} />)
              : null}
          </Banner>
        </section>
        <div className="c-service-page__section u-side-padding">
          <BlockContent blocks={boxAndImg1} serializers={serializers} />
          <BlockContent blocks={boxAndImg2} serializers={serializers} />
        </div>
        <div className="c-service-page__section u-side-padding">
          <BlockContent blocks={twoCols} serializers={serializers} />
        </div>
      </div>

      <Footer />
      <div id="modal" />
    </Layout>
  );
};
export default DataLoader(CoursesPage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{ "service": *[_type=="frontpage" && slug.current == "online-courses-NEW"][0]{ 
        title, 
        longTitle, 
        slug, 
        lead, 
        leadLinks, 
        _id, 
        sections[]{..., 
          personLeft[]->, 
          personRight[]->, 
          coursesRef[]->{...,"featuredImage": featuredImage.asset->url} }, 
          "persons": sections[7]{..., 
            personLeft[]->, 
            personRight[]->}, 
        resources[]->, "featuredImage": featuredImage.asset->url}}`,
    param: { slug },
  }),
  materializeDepth: 2,
});
