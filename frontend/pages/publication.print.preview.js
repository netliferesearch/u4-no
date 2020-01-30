import React from 'react';
import { PrintLongformArticleContainer } from '../components/print';
import DataLoaderPreview from '../helpers/data-loader-preview';

const PublicationEntry = ({ data: { current, institutions = [], u4 } = {} }) => (
  <div>{current && <PrintLongformArticleContainer {...{ ...current, institutions, u4 }} />}</div>
);

export default DataLoaderPreview(PublicationEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: `{
      "current": *[_type == 'publication' && _id == $id][0],
      "institutions": *[_type == 'institution' && funder == true && !(_id in path "drafts.**")] | order(name){name,name_fr,name_es,id},
      "u4": *[_type == 'institution' && _id == '419c2497-8e24-4599-9028-b5023830c87f'][0]{name,name_fr,name_es,name_in,about,about_fr,about_es,about_in,_id}
    }`,
    param: { id },
  }),
  materializeDepth: 3,
});
