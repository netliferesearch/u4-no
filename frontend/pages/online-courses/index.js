import React from 'react';
import { fetchAndMaterialize } from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import Layout from '../../components/Layout';
import { Scrollchor } from 'react-scrollchor';
import { Testimonial } from '../../components/general/testimonial/Testimonial';
import Footer from '../../components/general/footer/Footer';
import { PageIntro } from '../../components/general/PageIntro';
import { SideBox } from '../../components/general/side-box/SideBox';
import { CARD_TYPE } from '../../components/general/blue-card/BlueCard';
import { LearningEvents } from '../../components/front-page/LearningEvents';
import { Banner } from '../../components/general/banner/Banner';
import { TextImage } from '../../components/general/text-image/TextImage';
import { Team } from '../../components/general/team/Team';
import { PERSON_CARD_TYPE } from '../../components/general/person/PersonCard';

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
  const courses3 = sections.filter(i => i._type === 'courses')[2].coursesRef;
  const boxAndImg1 = sections.filter(i => i._type === 'boxOnImageRef')[0];
  const boxAndImg2 = sections.filter(i => i._type === 'boxOnImageRef')[1];
  const twoCols = sections.filter(i => i._type === 'twoColumns')[0];
  const defaultTestimonial = {
    text: [  {
      "_type": "block",
      "style": "normal",
      "children": [{
        "_type": "span",
        "marks": [],
        "text": "This course has allowed me to explore aspects of corruption that I had never been confronted with. I now have a new vision regarding the factors and risks of fighting corruption in the health sector."
      }],
      "markDefs": []
      }],
    cite: "Participant, 2022"
  }

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
            title="Anti-corruption basics (open for everyone)"
            text="1-hour, self-paced course available in four languages"
          />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium">
          <LearningEvents
            events={courses3}
            type={courses3.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Natural resource sector (open for everyone)"
            text="1-hour, self-paced courses"
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
        <section className="o-wrapper-medium o-wrapper-tablet-full">
          <Banner title={'What participants say'}>
            {resources.length > 0
              ? resources
                .filter(r => r._type === 'testimonial')
                .map(r => <Testimonial key={r._id} testimonial={r} />)
              : (<Testimonial key={1} testimonial={defaultTestimonial} />)
              }
          </Banner>
        </section>
        <div className="o-wrapper-medium u-top-margin--64">
          <TextImage text={boxAndImg1.block} image={boxAndImg1.img} imagePosition={true} />
          <TextImage text={boxAndImg2.block} image={boxAndImg2.img} imagePosition={false} />
        </div>
        <div className="o-wrapper-medium o-wrapper-tablet-full u-top-margin--48">
          <Banner onDark={false}>
            <BlockContent blocks={twoCols} serializers={serializers} />
          </Banner>
        </div>
        <div className="o-wrapper-medium u-top-margin--64">
          <hr className="u-section-underline--no-margins" />
          <div className="o-grid-container--2">
            {(persons.personLeft?.length > 0) &&
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading={persons.headingLeft}
                members={persons.personLeft}
              />}
            {(persons.personRight?.length > 0) &&
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading={persons.headingRight}
                members={persons.personRight}
              />}
          </div>
        </div>
      </div>

      <Footer />
      <div id="modal" />
    </Layout>
  );
};

export default CoursesPage;

const queryFunc = () => ({
  sanityQuery: `{ 
    "service": *[_type=="frontpage" && ((slug.current == "online-courses-NEW") || (_id == "BFLko89wLLImRF8IEozLT9"))][0]{ 
    title, 
    longTitle, 
    slug, 
    lead, 
    leadLinks, 
    _id, 
    sections[]{..., 
      personLeft[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,slug,image{asset->{url}}},
      personRight[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,slug,image{asset->{url}}}, 
      coursesRef[]->{
        _type,title,lead,language,startDate,location,slug,courseType,
        "featuredImage": featuredImage.asset->url
      } 
    }, 
    "persons": sections[8]{
      ..., 
      personLeft[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,slug,image{asset->{url}}},
      personRight[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,slug,image{asset->{url}}}
    }, 
    resources[]->, "featuredImage": featuredImage.asset->url}}`,
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 2,
  });
  if (error === 'No content found (dataLoader said this)') {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate: 60,
  };
};