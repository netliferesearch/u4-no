import React from 'react';
import { PrintLongformArticleContainer } from '../components/print';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => (
  <div>
    {props.data.current.content && <PrintLongformArticleContainer {...props.data.current} institutions={props.data.institutions} />}
  </div>
);

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "current": *[slug.current == $slug && !(_id in path "drafts.**")][0],
      "institutions": *[_type == 'institution' && funder == true && !(_id in path "drafts.**")] | order(name){name}
    }`,
    param: { slug },
  }),
  materializeDepth: 3,
});
