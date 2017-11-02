import React from 'react';
import { LongformArticleContainer, LegacyPublicationContainer } from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => (
  <div>
    {props.legacypdf && <LegacyPublicationContainer {...props} />}
    {!props.legacypdf && <LongformArticleContainer {...props} />}
  </div>
);

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug && !(_id in path "drafts.**")][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
