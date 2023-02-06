import React from 'react';
import Head from 'next/head';
import PrintLongformArticleContainer from '../../components/print/PrintLongformArticleContainer_v2';
import DataLoaderPreview from '../../helpers/data-loader-preview';
import { wrapInRedux } from '../../helpers/redux-store-wrapper';
import { localize } from '../../helpers/translate';

const PublicationEntry = ({ data: { current, institutions = [], u4 } = {} }) => (
  <div>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap"
        rel="stylesheet"
      />
      <link
        href="/public/main-print.css"
        rel="stylesheet"
        media="print"
      />
    </Head>
    {current && <PrintLongformArticleContainer {...{ ...current, institutions, u4 }} />}</div>
);

export default wrapInRedux(
  DataLoaderPreview(PublicationEntry, {
    queryFunc: ({ query: { id = '' } }) => ({
      sanityQuery: `{
      "current": *[_type == 'publication' && _id == $id][0],
      "institutions": *[_type == 'institution' && funder == true && !(_id in path "drafts.**")]
        | order(name){_id,${localize('name')}},
      "u4": *[_type == 'institution' && _id == '419c2497-8e24-4599-9028-b5023830c87f'][0]
        {_id,${localize('name')},${localize('about')}}
    }`,
      param: { id },
    }),
    materializeDepth: 3,
  })
);
