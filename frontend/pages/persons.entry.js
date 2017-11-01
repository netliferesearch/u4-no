import React from 'react';
import { Link } from '../routes';
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
  person = {},
  url,
}) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="c-article o-wrapper-inner">
        <h3>
          <Link to={`/the-team/${slug.current}`}>
            <a>
              {person.firstName} {person.surname}
            </a>
          </Link>
        </h3>
        {person.affiliations && person.affiliations.map(affiliation => affiliation)}
        <br />
        {person.email && <a href={`mailto:${person.email}`}>{email}</a>}
        <br />
        {person.phone && <a href={`tel:${person.phone}`}>+{person.phone}</a>}
      </div>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "person": *[slug.current == $slug][0]{..., "affiliations": affiliations[]->name},
      "topics": *[_type == "topics"]{_id, title, slug}
    }`,
    param: { slug },
  }),
});
