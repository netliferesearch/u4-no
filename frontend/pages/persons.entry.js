import React from 'react';
import { Link } from '../routes';
import { Layout, LongformArticle, Footer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const Persons = ({
  slug = {},
  firstName = '',
  surname = '',
  affiliations = false,
  email = '',
  phone = '',
  url
}) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="c-article o-wrapper-inner">
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
      </div>
      {/* <LongformArticle content={content} advisors={advisors} /> */}
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]{..., "affiliations": affiliations[]->name}',
    param: { slug },
  }),
});
