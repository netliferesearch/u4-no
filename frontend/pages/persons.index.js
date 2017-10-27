import React from 'react';
import { Link } from '../routes';
import { Layout, LongformArticle, Footer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const Persons = ({
  frontpage: {
    explainerText = 'has no explainer text',
    longTitle = 'has no long title',
    url = {},
    content,
    advisors = [],
  } = {},
  persons = [],
}) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="c-article c-longform-grid">
        <ul>
          {
            persons.map(({ _id, firstName = '', surname = '', affiliations = false, email = '', phone = '', slug = {} }) => (<li key={_id}>
              <h3><Link to={`/persons/${slug.current}`}><a>{firstName} {surname}</a></Link></h3>
              {
                affiliations && affiliations.map(affiliation => affiliation)
              }
              <br />
              {
                email && <a href={`mailto:${email}`}>{email}</a>
              }
              <br />
              {
                phone && <a href={`tel:+47${phone}`}>+47&nbsp;{phone}</a>
              }
            </li>))
          }
        </ul>
      </div>
      {/* <LongformArticle content={content} advisors={advisors} /> */}
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '{ "frontpage": *[slug.current == $slug][0], "persons": *[_type == "person"][0..1000]{..., "affiliations": affiliations[]->name} }',
    param: { slug },
  }),
});
