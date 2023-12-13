import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import { Team } from 'components/general/team/Team';
import BlockContent from '@sanity/block-content-to-react';
import serializers from 'components/serializers/serializers';
import { PERSON_CARD_TYPE } from 'components/general/person/PersonCard';
import { PageIntro } from 'components/general/PageIntro';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { groq } from 'next-sanity';

export default async function Persons({ params }) {

  const data = await getData(params);
  const {
    frontpage = {},
    persons = [],
    helpdesk = [],
    affiliatedexperts = []
  } = data;

  return (
    <Layout>
      <div className="o-wrapper-medium c-persons">

        <BreadCrumbV2
          home
          title="About U4"
          parentSlug="/about-u4"
          currentTitle={frontpage.title}
          currentSlug="the-team"
        />

        <PageIntro
          type="withBreadcrumb"
          title="People"
          text={<BlockContent blocks={frontpage.lead} serializers={serializers} />}
        />

        <hr className="u-section-underline--no-margins" />

      </div>

      <div className="c-article u-margin-bottom-huge">

        <div className="o-wrapper-medium">
          <Team type={PERSON_CARD_TYPE.IMAGE_TOP} heading="The u4 team" members={persons} />
          <hr className="u-section-underline--no-margins" />
        </div>

        <div className="o-wrapper-medium">
          <Team
            type={PERSON_CARD_TYPE.IMAGE_TOP}
            heading="Helpdesk – Transparency International"
            members={helpdesk}
          />

          <hr className="u-section-underline--no-margins" />

        </div>

        <div className="o-wrapper-medium">
          <Team
            type={PERSON_CARD_TYPE.IMAGE_TOP}
            heading="Affiliates"
            members={affiliatedexperts}
          />

        </div>
      </div>
    </Layout>
  );
};

export async function generateMetadata() {

  const data = await getData();
  const {
    frontpage = {
      title: '',
      lead: [],
    }
  } = data;

  return getMetadata({
    title: frontpage.title,
    description: frontpage.lead[0].text,
  });
}

const sanityQuery = groq`{
  "frontpage": *[_id == "627b8d42-d8f7-4cf6-9567-f6337678b688"][0]{
    _id, title, lead, "imageUrl": image.asset->url
  },
  "persons": *[_type == "person" && references("419c2497-8e24-4599-9028-b5023830c87f")]{
    _id, 
    firstName, 
    surname, 
    position, 
    "slug": slug.current, 
    "imageUrl": image.asset->url[0], 
    image{asset->{url,metadata{lqip,dimensions{width,height}}}},
  } | order(surname asc) [0..100],
  "helpdesk": *[_type == "person" && references("17ec3576-0afa-4203-9626-a38a16b27c2a")]
    | order(surname asc) [0..100]{
    _id, 
    firstName, 
    surname, 
    position, 
    "slug": slug.current, 
    "imageUrl": image.asset->url[0], 
    image{asset->{url}}
  },
  "affiliatedexperts": *[_type == "person" && references("3babc8f1-9e38-4493-9823-a9352b46585b")]
    | order(surname asc) [0..100]{
    _id, 
    firstName, 
    surname, 
    position, 
    "slug": slug.current, 
    "imageUrl": image.asset->url[0], 
    image{asset->{url}}
  }
}`;

async function getData() {
  const data = await fetchAndMaterialize({
    query: sanityQuery,
    materializeDepth: 0,
    tags: [`frontpage:the-team`, 'person']
  });
  return data;
};