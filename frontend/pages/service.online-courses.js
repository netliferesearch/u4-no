import React from 'react';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/v2/serializers';
import Layout from '../components/v2/Layout';
import Scrollchor from 'react-scrollchor';
import { Testimonial } from '../components/v2/Testimonial';
import { CoursesList } from '../components/v2/CoursesList';

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
  console.log(sections);
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
        <section className="o-wrapper-section">
          <div className="c-service-page__intro">
            <h2 className="u-heading--6">{title}</h2>
            <h2 className="u-heading--1">{longTitle}</h2>
            <BlockContent blocks={lead} serializers={serializers} />
            <div className="c-link--pri">
              <Scrollchor to="#courses" disableHistory>
                Start for free
              </Scrollchor>
            </div>
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />
        <div className="u-bg-lightest-grey c-service-page__section">
          <BlockContent blocks={features} serializers={serializers} />
        </div>
        <div id="courses" className="c-service-page__section">
          <div className="o-wrapper-medium">
            <BlockContent blocks={sections.slice(3, 5)} serializers={serializers} />
            <CoursesList blocks={sections.slice(5, 6)} />
          </div>
        </div>
        <div id="courses-2" className="u-bg-lightest-blue c-service-page__section">
          <div className="o-wrapper-section">
            <BlockContent blocks={sections.slice(6, 7)} serializers={serializers} />
            <CoursesList blocks={sections.slice(7, 8)} cta="Read more"/>
          </div>
        </div>
        <div className="u-bg-light-grey c-service-page__section">
          <div className="o-wrapper-medium">
            {resources.length > 0
              ? resources
                  .filter(r => r._type === 'testimonial')
                  .map(r => <Testimonial testimonial={r} />)
              : null}
          </div>
        </div>
        <BlockContent blocks={sections.slice(8, 10)} serializers={serializers} />
        <div className="u-bg-light-grey">
          <BlockContent blocks={sections.slice(10, 11)} serializers={serializers} />
        </div>
        <BlockContent blocks={sections.slice(11, 12)} serializers={serializers} />
      </div>
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
//       relatedUrl = {}
//     }  = {},
//   } = {},
//   url = {},
// }) => (
//   <Layout
//   headComponentConfig={{
//     title,
//     description: lead,
//     image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
//     url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
//     ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
//   }}
//   >
//     <h2 className="c-topic-page_title">{title}</h2>
//     <h2 className="c-topic-page__longTitle">{longTitle}</h2>
//     {featuredImage ? (
//       <section className="c-boxOnImage">
//         <figure className="c-boxOnImage__figure">
//           <img alt="" src={featuredImage} />
//         </figure>
//         <div className="c-boxOnImage__body">
//            <BlockContent blocks={lead} serializers={serializers} />
//            {leadLinks && <LinkList title="" content={leadLinks} />}
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
