import React, { Component, useRef, useState } from 'react';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';

import Layout from '../../components/Layout';
import { Scrollchor } from 'react-scrollchor';
import { Testimonial } from '../../components/Testimonial';
import { CoursesList } from '../../components/courses/CoursesList';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import Link from 'next/link';
import LogoU4 from '../../components/icons/LogoU4';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import { SideBox } from '../../components/general/side-box/SideBox';

const ServicePage = ({
  data: {
    service: {
      title = '',
      longTitle = '',
      featuredImage = '',
      lead = [],
      leadLinks = '',
      sections = [],
      relatedUrl = {},
      persons = {},
      resources = [],
    } = {},
  } = {},
  url = {},
}) => {
  const featuresHeading = sections.slice(0, 1)
  const features = sections.slice(0, 3);
  console.log(sections)
  const [scrolled, setScrolled] = useState(false);
  const introRef = useRef(null);

  useScrollInfo(
    ({ currPos }) => {
      const isScrolled = currPos.y < 70;
      if (scrolled !== isScrolled) {
        setScrolled(isScrolled);
      }
    },
    [scrolled],
    introRef,
    false,
    0
  );

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
      <div className="c-service-page c-courses-overview">
        <section className="o-wrapper-medium">
          <div className="">
            <PageIntro
              title={longTitle}
              text={<BlockContent blocks={lead} serializers={serializers} />}
            />

            <div className="c-btn c-btn--primary c-btn--child-link">
              <Scrollchor to="#courses" disableHistory>
                Start for free
              </Scrollchor>
            </div>
            <span ref={introRef} />
          </div>
          <SideBox>
            <BlockContent blocks={features} serializers={serializers} />
          </SideBox>
        </section>
        <hr className="u-section-underline--no-margins" />

        <div id="courses" className="c-service-page__section c-courses__container u-side-padding">
          <div className="o-wrapper-section">
            <BlockContent blocks={sections.slice(3, 5)} serializers={serializers} />
            <CoursesList blocks={sections.slice(5, 6)} badge="Start here" />
          </div>
        </div>
        <div
          id="courses-2"
          className="u-bg-lightest-blue c-service-page__section c-courses__container u-side-padding"
        >
          <div className="o-wrapper-section">
            <BlockContent blocks={sections.slice(6, 7)} serializers={serializers} />
            <CoursesList blocks={sections.slice(7, 8)} cta="Read more" />
          </div>
        </div>
        <div className="u-bg--light-grey c-service-page__section u-side-padding">
          <div className="o-wrapper-medium">
            {resources.length > 0
              ? resources
                  .filter(r => r._type === 'testimonial')
                  .map(r => <Testimonial key={r._id} testimonial={r} />)
              : null}
          </div>
        </div>
        <div className="c-service-page__section u-side-padding">
          <BlockContent blocks={sections.slice(8, 10)} serializers={serializers} />
        </div>
        <div className="u-bg--light-grey c-service-page__section u-side-padding">
          <BlockContent blocks={sections.slice(10, 11)} serializers={serializers} />
        </div>
        <div className="c-service-page__section u-side-padding">
          <BlockContent blocks={sections.slice(11, 12)} serializers={serializers} />
        </div>
      </div>
      <Footer />
      <div id="modal" />
    </Layout>
  );
};
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "service": *[_type=="frontpage" && slug.current == "online-courses-NEW"][0]{title, longTitle, slug, lead, leadLinks, _id, sections[]{..., personLeft[]->, personRight[]->, coursesRef[]->{...,"featuredImage": featuredImage.asset->url} }, "persons": sections[11]{..., personLeft[]->, personRight[]->}, resources[]->, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 2,
});