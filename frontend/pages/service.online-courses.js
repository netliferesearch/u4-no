import React from 'react';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/v2/serializers';
import Layout from '../components/v2/Layout';
import Scrollchor from 'react-scrollchor';
import { Testimonial } from '../components/v2/Testimonial';

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
  console.log(resources);
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
          <h2 className="u-headline--6">{title}</h2>
          <h2 className="u-headline--black--44 ">{longTitle}</h2>
          <BlockContent blocks={lead} serializers={serializers} />
          <div className="c-link--pri">
            <Scrollchor to="#courses" disableHistory>
              Start for free
            </Scrollchor>
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />
        <div className="u-bg-lightest-grey">
          <div className="o-wrapper-section">
            <BlockContent blocks={features} serializers={serializers} />
          </div>
        </div>
        <div id="courses">
          <div className="">
            <BlockContent blocks={sections.slice(3, 5)} serializers={serializers} />
            <div>View courses available in:</div>
            <BlockContent blocks={sections.slice(5, 6)} serializers={serializers} />
          </div>
        </div>
        <div className="u-bg-lightest-blue">
          <div className="">
            <BlockContent blocks={sections.slice(6, 7)} serializers={serializers} />
            <div>View courses available in:</div>
            <BlockContent blocks={sections.slice(7, 8)} serializers={serializers} />
          </div>
        </div>
        <div className="u-bg-light-grey">
          <div className="o-wrapper-section">
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
    </Layout>
  );
};
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "service": *[_type=="frontpage" && slug.current == "online-courses-NEW"][0]{title, longTitle, slug, lead, leadLinks, _id, sections[]{..., personLeft[]->, personRight[]-> }, "persons": sections[11]{..., personLeft[]->, personRight[]->}, resources[]->, "featuredImage": featuredImage.asset->url}}',
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
