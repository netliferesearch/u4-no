import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import { PageIntro } from '@/components/general/PageIntro';
import BlockContent from '@sanity/block-content-to-react';
import serializers from 'components/serializers/serializers';
import { CourseList } from '@/app/components/course/CourseList';
import { groq } from 'next-sanity';
import { CARD_TYPE } from '@/components/general/blue-card/BlueCard';
import { TextImage } from 'components/general/text-image/TextImage';

import { LearningEvents } from '@/components/front-page/LearningEvents';
import { FeaturedCourses } from '@/app/components/course/FeaturedCourses';
import { da } from 'date-fns/locale';

export const languageName = ({ langcode = 'en_US' }) => {
  const languages = [
    { title: 'English', value: 'en_US' },
    { title: 'Arabic', value: 'ar_AR' },
    { title: 'French', value: 'fr_FR' },
    { title: 'German', value: 'de_DE' },
    { title: 'Indonesian', value: 'in_IN' },
    { title: 'Portuguese', value: 'pt_PT' },
    { title: 'Spanish', value: 'es_ES' },
    { title: 'Russian', value: 'ru_RU' },
    { title: 'Ukrainian', value: 'uk_UA' },
  ];
  const language = languages.find(l => l.value === langcode);
  return language ? language.title : langcode;
};

export default async function Courses({ params }) {
  const data = await getData(params);
  const { frontPage } = data;
  const sections = frontPage.sections.slice(4);
  const featuredCourses = frontPage.courseSections[0]?.coursesRef;
  const topCourses = frontPage.courseSections[1]?.coursesRef;
  /* topCourses followed by the rest of the courses (that are not in topCourses */
  const courses = topCourses
    .concat(
      data.courses.filter(course => !topCourses.some(topCourse => topCourse._id === course._id))
    )
    .map((course, index) => ({
      ...course,
      defaultIndex: index,
      language: languageName({ langcode: course.language }),
      mode: course.mode === 'Self-paced' ? 'Self-paced' : 'Facilitated',
      startDate:
        course.startDate && new Date(course.startDate.utc) > new Date() ? course.startDate : null,
    }));
  return (
    <Layout>
      <div className="c-search-page ">
        <section className="o-wrapper-medium">
          <PageIntro
            className="c-page-intro--about-u4"
            title={frontPage.title}
            type="about-u4"
            text={
              frontPage.lead && <BlockContent blocks={frontPage.lead} serializers={serializers} />
            }
          />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section id="featuredCourses" className="o-wrapper-medium">
          <FeaturedCourses courses={featuredCourses} title="Featured courses" text=" " />
        </section>

        <div className="o-wrapper-medium ">
          <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Explore all courses</h4>
        </div>

        <div className="o-wrapper-medium">
          <CourseList courses={courses} />
        </div>

        <hr className="u-section-underline--no-margins" style={{ margin: '64px 0 80px' }} />

        <div className="o-wrapper-medium u-top-margin-64">
          {sections.map((section, index) => {
            return section._type === 'boxOnImageRef' ? (
              <TextImage text={section.block} image={section.img} imagePosition={!index % 2} />
            ) : (
              <BlockContent blocks={section} serializers={serializers} />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function generateMetadata({ params }) {
  const data = await getData(params);
  const { frontPage: { title = '', lead = '', featuredImage = '' } = {} } = data;

  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url,
  });
}

const sanityQuery = groq`{
    "frontPage": *[(_type=="frontpage") && ((slug.current == "online-learning"))][0]{
      _id,
      title,
      lead,
      sections,
      "courseSections": sections[_type=="courses"]{coursesRef[]->{
      _id,
      "type": _type,
      title,
      lead,
      standfirst,
      language,
      "topic": topics[]->title,
      "slug": slug.current,
      startDate{utc, local},
      endDate{utc, local},
      mode,
      method,
      duration,
      featuredImage{asset->{url}},
      "imageUrl": featuredImage.asset->url,
      "imageBlurDataURL": featuredImage.asset->metadata.lqip
    }},
    },
    "courses": *[_type=="course"]{
      _id,
      "type": _type,
      title,
      lead,
      standfirst,
      language,
      "topic": topics[]->title,
      "slug": slug.current,
      startDate{utc, local},
      endDate{utc, local},
      mode,
      method,
      duration,
      featuredImage{asset->{url}},
      "imageUrl": featuredImage.asset->url,
      "imageBlurDataURL": featuredImage.asset->metadata.lqip
    }
  }`;

async function getData(params) {
  const data = await fetchAndMaterialize({
    query: sanityQuery,
    params,
    tags: ['course', 'frontpage:online-learning'],
    materializeDepth: 2,
  });
  return data;
}
