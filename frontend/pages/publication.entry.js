import React from 'react';
import { LongformArticleContainer } from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => <LongformArticleContainer {...props} />;

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
    "entry": *[slug.current == $slug && !(_id in path "drafts.**")][0],
    "topics": *[_type == "topics"]{_id, title, slug},
    }`,
    param: { slug },
  }),
  materializeDepth: 1,
});
