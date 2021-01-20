import React from 'react';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';

import { Footer, Newsletter, ServiceArticle } from '../components';
import Layout from '../components/v2/Layout';
import { LinkList } from '../components';
import Scrollchor from 'react-scrollchor';

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
    } = {},
  } = {},
  url = {},
}) => {
  const features = sections.filter(s => s._type === 'features')
 
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
          <p className="u-intro-text">
            Dynamic and time-efficient online courses for people seeking updated anti-corruption
            knowledge. All courses are free of charge.
          </p>
          <div className="c-link--pri">
            <Scrollchor to="#courses" disableHistory>
              Start for free
            </Scrollchor>
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-section">
          {console.log(sections)}
          <BlockContent blocks={features} serializers={serializers} />
        </section>
        <section id="courses" className="o-wrapper-section">
          <ServiceArticle blocks={sections} />
        </section>
        <section className="o-wrapper-section">
          <div>
            <figure className="">
              <img alt="" src={featuredImage} />
            </figure>
            <div className="">
              {console.log(leadLinks)}
              <BlockContent blocks={lead} serializers={serializers} />
              {leadLinks && <LinkList title="" content={leadLinks} />}
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    </Layout>
  );
};
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "service": *[_type=="frontpage" && slug.current == "online-courses"][0]{title, longTitle, slug, lead, leadLinks, _id, sections, "featuredImage": featuredImage.asset->url}}',
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
