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
  url,
}) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="c-article o-wrapper-medium">
        <section {...classes()}>
          <div {...classes('profile')}>
            <h1{...classes('profile-name')}>{person.firstName}<br /> {person.surname}</h1>
            <p{...classes('profile-position')}>{person.position}</p>
            <img src="https://images.unsplash.com/photo-1450297350677-623de575f31c?auto=format&fit=crop&w=934&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" />
            <div{...classes('profile-info')}>
              <a href="#">{person.email}</a><br />
              {person.phone && <a href={`tel:${person.phone}`}>+{person.phone}</a>}<br />
              <a href="#">Downlaod CV</a><br />
              <a href="#">Hi-res image</a><br />
              <a href="#">{person.affiliations && person.affiliations.map(affiliation => affiliation)}</a>
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
});
