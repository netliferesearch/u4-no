import React from 'react';
import { PrintLongformArticleContainer } from '../components/print';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = ({ data: { current, institutions = [], u4 } = {} }) => (
  <div>{current && <PrintLongformArticleContainer {...{ ...current, institutions, u4 }} />}</div>
);

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "current": *[slug.current == $slug][0],
      "institutions": *[_type == 'institution' && funder == true && !(_id in path "drafts.**")] | order(name){name, _id},
      "u4": *[_type == 'institution' && _id == '419c2497-8e24-4599-9028-b5023830c87f'][0]{name,about,_id}
    }`,
    param: { slug },
  }),
  materializeDepth: 3,
});
