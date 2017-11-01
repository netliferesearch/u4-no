import React from 'react';
import sortBy from 'lodash/sortBy';
import { Link } from '../routes';
import { Layout, Footer, Team } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const Persons = ({ frontpage = {}, persons = [], url }) => (
  <Layout>
    <h1 className="c-article__title">{frontpage.title}</h1>
    <BreadCrumb url={url} />
    <div className="c-article__lead">{frontpage.lead}</div>
    <div className="c-topic-section--lightblue">
      <div className="o-wrapper c-article">
        <div id="advisors">
          <Team light members={sortBy(persons, ({ firstName = '' }) => firstName.toUpperCase())} />
        </div>
      </div>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "frontpage": *[_id == "627b8d42-d8f7-4cf6-9567-f6337678b688"][0],
      "persons": *[_type == "person" && references("0e1b0ebc-e016-4d2b-97e8-859b91e3e147") && "0e1b0ebc-e016-4d2b-97e8-859b91e3e147" in affiliations[]._ref][0..100]{..., "image": image.asset->url[0], affiliations},
    }`,
  }),
  materializeDepth: 2,
});
