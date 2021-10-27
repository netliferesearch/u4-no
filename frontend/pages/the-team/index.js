import Layout from '../../components/Layout';
import Footer from '../../components/general/footer/Footer';
import { Team } from '../../components/general/team/Team';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { PERSON_CARD_TYPE } from '../../components/general/person/PersonCard';
import { PageIntro } from '../../components/general/PageIntro';
import { BreadCrumbV2 } from '../../components/general/BreadCrumbV2';
import { getParentPath } from '../../helpers/getParentPath';

const Persons = props => {
  const {
    data: { frontpage, persons, helpdesk, affiliatedexperts },
    url = {},
  } = props;
  return (
    <Layout
      headComponentConfig={{
        title: frontpage.title,
        description: frontpage.lead[0].text,
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      <div className="o-wrapper-medium c-persons">
        <BreadCrumbV2
          home={true}
          title="About U4"
          parentSlug={`/about-u4`}
          currentTitle={frontpage.title}
          currentSlug={frontpage.slug.current}
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
          <Team type={PERSON_CARD_TYPE.IMAGE_TOP} heading={'The u4 team'} members={persons} />
          <hr className="u-section-underline--no-margins" />
        </div>

        <div className="o-wrapper-medium">
          <Team type={PERSON_CARD_TYPE.IMAGE_TOP} heading={'Helpdesk'} members={helpdesk} />
          <hr className="u-section-underline--no-margins" />
        </div>

        <div className="o-wrapper-medium">
          <Team
            type={PERSON_CARD_TYPE.IMAGE_TOP}
            heading={'Affiliates'}
            members={affiliatedexperts}
          />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
        "frontpage": *[_id == "627b8d42-d8f7-4cf6-9567-f6337678b688"][0],
        "persons": *[_type == "person" && references("419c2497-8e24-4599-9028-b5023830c87f")][0..100]{..., "image": image.asset->url[0], affiliations},
        "helpdesk": *[_type == "person" && references("17ec3576-0afa-4203-9626-a38a16b27c2a")][0..100]{..., "image": image.asset->url[0], affiliations},
        "affiliatedexperts": *[_type == "person" && references("3babc8f1-9e38-4493-9823-a9352b46585b")][0..100]{..., "image": image.asset->url[0], affiliations},
      }`,
  }),
  materializeDepth: 2,
});
