import React from 'react';
import DataLoader from '../../helpers/data-loader';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import { PageIntro } from '../../components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { SideBox } from '../../components/general/side-box/SideBox';
import { Banner } from '../../components/general/banner/Banner';
import { socialItems } from '../../components/general/social/socialItems';
import { ArrowNext } from '../../components/icons/ArrowNext';
import { ArrowNextPage } from '../../components/icons/PageArrows';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';

const ServicePage = ({
  data: {
    title = '',
    longTitle = '',
    featuredImage = {},
    sections = [],
    relatedUrl = {},
    url = '',
  },
}) => {
  const lead = sections.filter(i => i._type === 'heading')[0];
  const features = sections.filter(i => i._type === 'features');
  const bannerHeading = sections.filter(i => i._type === 'heading')[1];
  const bannerContent = sections.filter(i => i._type === 'twoColumns')[0];
  const expertPublications = sections.filter(i => i._type === 'expertAnswers')[0];

  return (
    <Layout
      headComponentConfig={{
        title,
        description: lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <div className="c-helpdesk-page">
        <section className="o-wrapper-medium">
          <div className="c-service-page__top">
            <div className="c-service-page__intro">
              <PageIntro
                title={title}
                text={<BlockContent blocks={lead} serializers={serializers} />}
              />
            </div>
            <SideBox>
              <h3 className="c-longform-grid__standard">Anti-corruption encounters</h3>
              <BlockContent blocks={features} serializers={serializers} />
            </SideBox>
          </div>
        </section>
        <div className="o-wrapper-medium">
          <hr className="u-section-underline--no-margins" />
        </div>
        <div className="u-top-margin--48">
          <Banner title={'Ask our free helpdesk'}>
            <div className="c-testimonial">
              <div className="c-testimonial__text">
                <div className="c-pullQuote">
                  <p className="c-longform-grid__standard">{longTitle}</p>
                </div>
                <p className="c-testimonial__cite c-pullQuote__cite">
                  <a className="c-social--follow__item" href={`mailto:${socialItems[3].url}`}>
                    Email <ArrowNext />
                  </a>
                </p>
              </div>
            </div>
          </Banner>
        </div>
        <div className="u-top-margin--48">
          <Banner onDark={false}>
            <BlockContent blocks={bannerContent} serializers={serializers} />
          </Banner>
        </div>
        <div className="o-wrapper-medium u-top-margin--64" />
        <section className="">
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={expertPublications.expertAnswersRef}
              type={POST_TYPE.PUBLICATION}
              buttonPath="/publications"
              title="Latest U4 helpdesk answers"
              minPosts={4}
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        </section>
      </div>
      <Footer />
    </Layout>
  );
};

export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `*[_type == "frontpage" && slug.current == "helpdesk"][0]{
        title,
            longTitle,
            slug,
            lead,
            _id,
      sections[]{
        ...,
        expertAnswersRef[]->{
          _id,
          _type,
          slug,
          title,
          "publicationType": publicationType->title,
          "featuredImage": featuredImage.asset->url
        }
      },
      "featuredImage": featuredImage.asset->url
    }
`,
    param: { slug },
  }),
  materializeDepth: 5,
});
