import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Link } from '../routes';
import { Layout, LongformArticle, Footer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const Persons = ({
  frontpage,
  persons = [],
  url,
}) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="c-longform-grid__standard">
        <h1>{frontpage.title}</h1>
        <p>{frontpage.lead}</p>
      </div>
      <div className="c-article o-wrapper-inner">
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
    sanityQuery: '{ "frontpage": *[_id == "627b8d42-d8f7-4cf6-9567-f6337678b688"][0], "persons": *[_type == "person"][0..1000]{..., "affiliations": affiliations[]->name} }',
    materializeDepth: 0,
  }),
});
