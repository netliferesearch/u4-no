import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
//import PrintLongformArticleContainer from '../../../components/print/PrintLongformArticleContainer_v2';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import { localize } from 'helpers/translate';

const PrintLongformArticleContainer = dynamic(() =>
  import( './PrintLongformArticleContainer' )
);
const PrintLongformArticleContainer_v2 = dynamic(() =>
  import( './PrintLongformArticleContainer_v2' )
);

export default async function PublicationEntry( {params} ) {
  
  const data = await getData( params );
  const { current, institutions = [], u4 } = data;

  const newPdfLayoutFromDate = new Date( "2022-01-01" );
  const pubDate = current.date?.utc ? new Date( current.date.utc ) : new Date().getFullYear();

  return (
    <>
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

      {current && ( pubDate >= newPdfLayoutFromDate ) ? (
        <PrintLongformArticleContainer_v2 {...{ ...current, institutions, u4 }} />
      ) : (
        <PrintLongformArticleContainer {...{ ...current, institutions, u4 }} />
      )}
    </>
  );
};

const sanityQuery = `{
  "current": *[_type == 'publication' && slug.current == $slug][0],
  "institutions": *[_type == 'institution' && funder == true && !(_id in path "drafts.**")]
    | order(name){_id,${localize('name')}},
  "u4": *[_type == 'institution' && _id == '419c2497-8e24-4599-9028-b5023830c87f'][0]
    {_id,${localize('name')},${localize('about')}}
}`

async function getData( params ) {
  const data = await fetchAndMaterialize( {sanityQuery, params, materializeDepth: 3} );
  return data;
};