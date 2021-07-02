import { useState } from 'react';
import sortBy from 'lodash/sortBy';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import Team from '../../components/Team';
import DataLoader from '../../helpers/data-loader';
import ArrowLarge from '../../components/icons/ArrowLarge';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers';

const Persons = props => {
  const {
    data: { frontpage, persons, helpdesk, affiliatedexperts },
    url = {},
  } = props;
  const [group, setGroup] = useState(1);
  return (
    <Layout
      headComponentConfig={{
        title: frontpage.title,
        description: frontpage.lead[0].text,
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      <div className="u-bg-dark-blue o-wrapper-full-width">
        <div className="c-article__lead c-article__lead--big-light   c-article__lead--center">
          <BlockContent blocks={frontpage.lead} serializers={serializers} />
        </div>
        <div className="c-person__team">
          <h1 className="c-person__team-text ">{frontpage.title}</h1>
          <div className="c-person__team-arrow">
            <ArrowLarge />
          </div>
        </div>
      </div>

      <div className="c-filters-v2--standalone ">
        <div className="c-filters-v2__label--standalone">
          Filter people by:
          <button className="c-filters-v2__item--standalone" onClick={() => setGroup(1)}>
            <a>U4 Team</a>
          </button>
          <button className="c-filters-v2__item--standalone" onClick={() => setGroup(2)}>
            <a>U4 Helpdesk</a>
          </button>
          <button className="c-filters-v2__item--standalone" onClick={() => setGroup(3)}>
            <a>Affiliated Experts</a>
          </button>
        </div>
      </div>
      <div className="o-wrapper c-article u-margin-bottom-huge">
        {group === 1 ? (
          <div id="advisors">
            <h2 className="c-article__title c-article__title--center">U4 TEAM</h2>
            <Team
              light
              applyJob
              members={sortBy(persons, ({ firstName = '' }) => firstName.toUpperCase())}
            />
          </div>
        ) : null}
        {group === 2 ? (
          <div id="advisors2">
            <h2 className="c-article__title c-article__title--center">U4 HELPDESK</h2>
            <Team
              light
              members={sortBy(helpdesk, ({ firstName = '' }) => firstName.toUpperCase())}
            />
          </div>
        ) : null}
        {group === 3 ? (
          <div id="advisors3">
            <h2 className="c-article__title c-article__title--center">AFFILIATED EXPERTS</h2>
            <Team
              light
              members={sortBy(affiliatedexperts, ({ firstName = '' }) => firstName.toUpperCase())}
            />
          </div>
        ) : null}
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
