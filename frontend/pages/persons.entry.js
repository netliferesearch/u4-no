import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';
import { Layout, LongformArticle, Footer } from '../components';
import { MediumLogo, TwitterLogo } from '../components/icons/';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';

const classes = BEMHelper({
  name: 'persons',
  prefix: 'c-',
});

const Persons = ({
  data: {
    slug = {},
    firstName = '',
    surname = '',
    affiliations = false,
    email = '',
    phone = '',
    person = {},
    image = {},
    cv = '',
    medium = '',
    twitter = '',
  },
  url = {},
}) => (
  <Layout
    headComponentConfig={{
      title: `${person.firstName} ${person.surname}`,
      url: url.asPath ? `https://beta.u4.no${url.asPath}` : '',
    }}
  >
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="o-wrapper-medium">
        <section {...classes()}>
          <div {...classes('profile')}>
            <h1 {...classes('profile-name')}>
              {person.firstName}
              <br /> {person.surname}
            </h1>
            <p {...classes('profile-position')}>{person.position}</p>
            {person.image &&
              person.image.asset &&
              person.image.asset.url && <img alt="x" src={`${person.image.asset.url}?w=400`} />}
            <div {...classes('profile-info')}>
              <a href={`mailto:${person.email}`}>{person.email}</a>
              <br />
              {person.phone && (
                <a href={`tel:${person.phone}`}>
                  +{person.phone}
                  <br />
                </a>
              )}
              {person.image &&
                person.image.asset &&
                person.image.asset.url && (
                  <a href={person.image.asset.url}>
                    Hi-res image<br />
                  </a>
                )}
              {person.medium && (
                <a href={person.medium}>
                  <MediumLogo {...classes('some-icon')} />Medium
                </a>
              )}
              <br />
              {person.twitter && (
                <a href={person.twitter}>
                  <TwitterLogo {...classes('some-icon')} />Twitter
                </a>
              )}
            </div>
          </div>
          {person.bio && (
            <div {...classes('bio')}>
              <BlockContent blocks={person.bio} serializers={serializers} />
            </div>
          )}
        </section>
      </div>
    </div>

    <Footer />
  </Layout>
);

export default DataLoader(Persons, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "person": *[slug.current == $slug][0]{..., "affiliations": affiliations[]->name, "image": { "asset": { "url": image.asset->url}}},
      "topics": *[_type == "topics"]{_id, title, slug}
    }`,
    param: { slug },
  }),
  materializeDepth: 0,
});
