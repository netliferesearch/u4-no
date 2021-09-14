import React from 'react';
import DataLoader from '../../helpers/data-loader';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import { PageIntro } from '../../components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { SideBox } from '../../components/general/side-box/SideBox';
import { Banner } from '../../components/general/banner/Banner';
import { ArrowNext } from '../../components/icons/ArrowNext';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';
import { TextImage } from '../../components/general/text-image/TextImage';

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
  const bannerBeforeContent = sections.filter(i => i._type === 'cta')[0];
  const bannerContent = sections.filter(i => i._type === 'twoColumns')[0];
  const expertPublications = sections.filter(i => i._type === 'expertAnswers')[0];
  console.log(sections[10].img);
  console.log(sections[10].img);

  return (
    <Layout
      headComponentConfig={{
        title,
        description: '',
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <div className="c-helpdesk-page">
        <section className="o-wrapper-medium">
          <div className="c-service-page__top">
            <div className="c-service-page__intro">
              <PageIntro title={title} text={lead.headingValue} />
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
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <div className="u-top-margin--64">
            <Banner title={'Ask our free helpdesk'}>
              <div className="c-testimonial">
                <div className="c-testimonial__text">
                  <div className="c-pullQuote">
                    <p className="c-longform-grid__standard">{longTitle}</p>
                  </div>
                  <p className="c-testimonial__cite c-pullQuote__cite">
                    <a className="c-social--follow__item" href={bannerBeforeContent.ctaURL}>
                      Email <ArrowNext />
                    </a>
                  </p>
                </div>
              </div>
            </Banner>
          </div>
        </div>
        <div className="u-top-margin--64" />
        <div className="o-wrapper-medium o-wrapper-mobile-full">
          <Banner
            bannerLead={bannerBeforeContent.ctaValue}
            title={bannerHeading.headingValue}
            onDark={false}
          >
            <BlockContent blocks={bannerContent} serializers={serializers} />
          </Banner>
        </div>
        <div className="o-wrapper-medium u-top-margin--64">
          <TextImage text={sections[10].textRight} image={sections[10].img} imagePosition={true} />
        </div>
        <section>
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={expertPublications.expertAnswersRef}
              type={POST_TYPE.PUBLICATION}
              buttonPath="/publications"
              title="Latest U4 helpdesk answers"
              underTitle="Lorem ipsum"
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
          standfirst,
          date,
          topics[]->{title, slug},
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
