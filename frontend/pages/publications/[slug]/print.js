import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
//import PrintLongformArticleContainer from '../../../components/print/PrintLongformArticleContainer_v2';
import DataLoader from '../../../helpers/data-loader';
import { wrapInRedux } from '../../../helpers/redux-store-wrapper';
import { localize } from '../../../helpers/translate';

const PrintLongformArticleContainer = dynamic(() =>
  import( '../../../components/print/PrintLongformArticleContainer' )
);
const PrintLongformArticleContainer_v2 = dynamic(() =>
  import( '../../../components/print/PrintLongformArticleContainer_v2' )
);

const PublicationEntry = ({ data: { current, institutions = [], u4 } = {} }) => {
  const newPdfLayoutFromDate = new Date( "2023-01-01" );
  const pubDate = current.date?.utc ? new Date( current.date.utc ) : new Date().getFullYear();

  return (
    <div>
      <Head>
        <title>{current.title}</title>
        {current.authors && 
          current.authors.map(person => (person.target ? person.target : person))
          .map(
              ({
                firstName = '',
                surname = '',
              }) => (
                <meta name='author' content={`${firstName} ${surname}`} />
              )
            )}
        <meta name='date' content={current.date?.utc} />
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

      {current && ( pubDate >= newPdfLayoutFromDate ) ? (
        <PrintLongformArticleContainer_v2 {...{ ...current, institutions, u4 }} />
      ) : (
        <PrintLongformArticleContainer {...{ ...current, institutions, u4 }} />
      )}
    </div>
  );
};

export default wrapInRedux(
  DataLoader(PublicationEntry, {
    queryFunc: ({ query: { slug = '' } }) => ({
      sanityQuery: `{
      "current": *[_type == 'publication' && slug.current == $slug][0],
      "institutions": *[_type == 'institution' && funder == true && !(_id in path "drafts.**")]
        | order(name){_id,${localize('name')}},
      "u4": *[_type == 'institution' && _id == '419c2497-8e24-4599-9028-b5023830c87f'][0]
        {_id,${localize('name')},${localize('about')}}
    }`,
      param: { slug },
    }),
    materializeDepth: 3,
  })
);
