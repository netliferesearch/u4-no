import React from 'react';
import { fetchAndMaterialize } from '../../helpers/data-loader';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import { PageIntro } from '../../components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { SideBox } from '../../components/general/side-box/SideBox';
import { Banner } from '../../components/general/banner/Banner';
import { ArrowNext } from '../../components/icons/ArrowNext';
import { PartnerLogo10Blue } from '../../components/icons/PartnerLogo10Blue';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';
import { TextImage } from '../../components/general/text-image/TextImage';

const ServicePage = ({
  data: {
    title = '',
    longTitle = '',
    featuredImage = {},
    sections = [],
    lead = [],
    relatedUrl = {},
    url = '',
    latestHelpdeskAnswers = [],
  },
}) => {
  const standFirst = sections.filter(i => i._type === 'heading')[0];
  const features = sections.filter(i => i._type === 'features');
  const bannerHeading = sections.filter(i => i._type === 'heading')[1];
  const bannerSubtitle = sections.filter(i => i._type === 'heading')[2].headingValue;
  const helpdeskMailLink = sections.filter(i => i._type === 'cta')[1].ctaURL;
  const bannerContent = sections.filter(i => i._type === 'twoColumns')[0];
  const expertPublications = sections.filter(i => i._type === 'expertAnswers')[0];
  const helpdeskTeamImg = sections[6].img;
  const helpdeskTeamText = sections[6].textRight;

  return (
    <Layout
      headComponentConfig={{
        title,
        description: '',
        image: featuredImage.asset && featuredImage.asset.url ? '' : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <div className="c-helpdesk-page">
        <section className="o-wrapper-medium">
          <div className="c-service-page__top">
            <div className="c-service-page__intro">
              <PageIntro title={title} text={standFirst.headingValue} />
            </div>
            <SideBox>
              <h3 className="c-longform-grid__standard">Anti-corruption encounters</h3>
              <BlockContent blocks={features} serializers={serializers} />
            </SideBox>
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />

        <div className="o-wrapper-medium">
          <div className="c-helpdesk-page__lead">
            <div className="c-helpdesk-page__lead-content">
              <BlockContent blocks={lead} serializers={serializers} />
            </div>
            <div className="c-helpdesk-page__lead-content--second">
              <div className="c-helpdesk-page__lead-image">
                <img src={featuredImage.asset.url} style={{maxWidth: "100%"}} />
              </div>
            </div>
          </div>
        </div>
        <div className="o-wrapper-medium o-wrapper-tablet-full">
          <div className="u-top-margin--64">
            <Banner title={'Ask our free helpdesk'}>
              <div className="c-testimonial">
                <div className="c-testimonial__text">
                  <div className="c-pullQuote">
                    <p className="c-longform-grid__standard">{longTitle}</p>
                  </div>
                  <p className="c-testimonial__cite c-pullQuote__cite">
                    <a className="c-social--follow__item" href={helpdeskMailLink}>
                      Email <ArrowNext />
                    </a>
                  </p>
                </div>
              </div>
            </Banner>
          </div>
        </div>
        <div className="u-top-margin--64" />
        <div className="o-wrapper-medium o-wrapper-tablet-full">
          <Banner bannerSubtitle={bannerSubtitle} title={bannerHeading.headingValue} onDark={false}>
            <BlockContent blocks={bannerContent} serializers={serializers} />
          </Banner>
        </div>
        <div className="o-wrapper-medium u-top-margin--64">
          <TextImage text={helpdeskTeamText} image={helpdeskTeamImg} imagePosition={true} />
        </div>
        <section>
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={latestHelpdeskAnswers}
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

export default ServicePage;

const queryFunc = () => ({
  sanityQuery: `*[_type == "frontpage" && ((slug.current == "helpdesk-new" || _id == "d4a9815b-f214-4245-a401-376243bdf714"))][0]{
    _id, title, longTitle, slug, lead, 
    sections[]{_type == 'expertAnswers' => {}, _type != 'expertAnswers' => {...}},
    "latestHelpdeskAnswers": *[_type  == "publication" && language == "en_US" && publicationType->title == "U4 Helpdesk Answer"] | order(date.utc desc) {
      _id,
      _type,
      slug,
      standfirst,
      date,
      topics[]->{title, slug},
      title,
      "publicationType": publicationType->title,
      "featuredImage": featuredImage.asset->url
    }[0..8],
    featuredImage{asset->{url}}
  }`,
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 1,
  });
  if (error === 'No content found (dataLoader said this)') {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate: 60,
  };
};