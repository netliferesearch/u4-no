import React, { Component, useRef, useState } from 'react';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';

import Layout from '../../components/Layout';
import { Scrollchor } from 'react-scrollchor';
import { Testimonial } from '../../components/Testimonial';
// import { CoursesList } from '../../components/courses/CoursesList';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import Link from 'next/link';
import LogoU4 from '../../components/icons/LogoU4';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';

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
  const features = sections.slice(0, 3);
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
        {scrolled ? (
          <div className="c-header--fixed u-hidden--desktop">
            <div className="c-header--fixed__content">
              <Link href="/">
                <a className="u-no-underline">
                  <LogoU4 />
                </a>
              </Link>
              <div>
                <div className="">
                  <Scrollchor to="#courses" disableHistory>
                    Start for free
                  </Scrollchor>
                </div>
              </div>
            </div>
            <hr className="u-section-underline--no-margins" />
          </div>
        ) : null}
        <section className="o-wrapper-medium">
          <div className="">
            <PageIntro
              title={longTitle}
              text={<BlockContent blocks={lead} serializers={serializers} />}
              contentType={title}
            />

            <div className="c-btn c-btn--primary c-btn--child-link">
              <Scrollchor to="#courses" disableHistory>
                Start for free
              </Scrollchor>
            </div>
            <span ref={introRef} />
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />
        <div className="u-bg-lightest-grey c-service-page__section c-features__container u-side-padding">
          <BlockContent blocks={features} serializers={serializers} />
        </div>
        <div id="courses" className="c-service-page__section c-courses__container u-side-padding">
          <div className="o-wrapper-section">
            <BlockContent blocks={sections.slice(3, 5)} serializers={serializers} />
            {/* <CoursesList blocks={sections.slice(5, 6)} badge="Start here" /> */}
          </div>
        </div>
        <div
          id="courses-2"
          className="u-bg-lightest-blue c-service-page__section c-courses__container u-side-padding"
        >
          <div className="o-wrapper-section">
            <BlockContent blocks={sections.slice(6, 7)} serializers={serializers} />
            {/* <CoursesList blocks={sections.slice(7, 8)} cta="Read more" /> */}
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

// const ServicePage = ({
//   data: {
//     service: {
//       title = '',
//       longTitle = '',
//       featuredImage = '',
//       lead = [],
//       leadLinks = '',
//       sections = [],
//       relatedUrl = {},
//     } = {},
//   } = {},
//   url = {},
// }) => (
//   <Layout
//     headComponentConfig={{
//       title,
//       description: lead.length ? lead[0].text : lead,
//       image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
//       url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
//       ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
//     }}
//   >
//     <h2 className="c-topic-page_title">{title}</h2>
//     <h2 className="c-topic-page__longTitle">{longTitle}</h2>
//     {featuredImage ? (
//       <section className="c-boxOnImage">
//         <figure className="c-boxOnImage__figure">
//           <img alt="" src={featuredImage} />
//         </figure>
//         <div className="c-boxOnImage__body">
//           <BlockContent blocks={lead} serializers={serializers} />
//           {leadLinks && <LinkList title="" content={leadLinks} />}
//         </div>
//       </section>
//     ) : null}

//     <ServiceArticle blocks={sections} />

//     <Newsletter />

//     <Footer />
//   </Layout>
// );

// export default DataLoader(ServicePage, {
//   queryFunc: ({ query: { slug = '' } }) => ({
//     sanityQuery:
//       '{ "service": *[_type=="frontpage" && slug.current == "online-courses"][0]{title, longTitle, slug, lead, leadLinks, _id, sections, "featuredImage": featuredImage.asset->url}}',
//     param: { slug },
//   }),
//   materializeDepth: 2,
// });
