import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';
import { Layout, LongformArticle, Footer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';

const classes = BEMHelper({
  name: 'persons',
  prefix: 'c-',
});

const Persons = ({
  slug = {},
  firstName = '',
  surname = '',
  affiliations = false,
  email = '',
  phone = '',
  person = {},
  image = {},
  cv = {},
  url,
}) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="o-wrapper-medium">
        <section {...classes()}>
          <div {...classes('profile')}>
            <h1{...classes('profile-name')}>{person.firstName}<br /> {person.surname}</h1>
            <p{...classes('profile-position')}>{person.position}</p>
            {person.image && <img alt="x" src={person.image.asset.url} /> }
            <div{...classes('profile-info')}>
              <a href={`mailto:${person.email}`}>{person.email}</a><br />
              {person.phone && <a href={`tel:${person.phone}`}>+{person.phone}<br /></a>}
              {person.cv && <a href={person.cv.asset.url}>Downlaod CV</a>}<br />
              {person.image && <a href={person.image.asset.url}>Hi-res image<br /></a>}
              {person.affiliations && person.affiliations.map(affiliation => affiliation)}
            </div>
          </div>
          <div {...classes('bio')}>
            <BlockContent blocks={person.bio} />
          </div>
        </section>
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
  materializeDepth: 3,
});
