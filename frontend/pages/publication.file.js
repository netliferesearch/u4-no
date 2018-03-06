import React from 'react';
import Router from 'next/router';

import sanityClient from '@sanity/client';

/* send 302 Permanent redirect to path */
function redirectPermanent(ctx, path) {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: path });
    ctx.res.end();
    ctx.res.finished = true;
  } else {
    Router.replace(path);
  }
}

export default class PublicationFile extends React.Component {
  static async getInitialProps(nextContext) {
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: process.env.SANITY_TOKEN,
      useCdn: true,
    });
    const queryFunc = ({ query: { slug = '' } }) => ({
      sanityQuery:
        '*[slug.current == $slug][0]{title,pdfFile{asset->{url}},legacypdf{asset->{url}}}',
      param: { slug },
    });

    const { sanityQuery, param = {} } = queryFunc(nextContext);
    const sanityResults = await client.fetch(sanityQuery, param);
    if (!sanityResults) {
      console.warn('Sanity returned nothing', sanityResults);
      // throw new Error('No content found');
    }
    const data = Array.isArray(sanityResults) ? [...sanityResults] : { ...sanityResults };
    if (data.pdfFile && data.pdfFile.asset && data.pdfFile.asset.url) {
      console.log(data.pdfFile.asset.url);
      return redirectPermanent(nextContext, data.pdfFile.asset.url);
    }
    if (data.legacypdf && data.legacypdf.asset && data.legacypdf.asset.url) {
      console.log(data.legacypdf.asset.url);
      return redirectPermanent(nextContext, data.legacypdf.asset.url);
    }
    return {};
  }
  render() {
    return <div>Pdf file not found</div>;
  }
}
