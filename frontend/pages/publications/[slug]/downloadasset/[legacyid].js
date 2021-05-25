import React from 'react';
import Router from 'next/router';

import sanityClient from '@sanity/client';

/* send 301 Permanent redirect to path */
function redirectPermanent(ctx, path) {
  if (ctx.res) {
    ctx.res.writeHead(301, { Location: path });
    ctx.res.end();
    ctx.res.finished = true;
  } else {
    Router.replace(path);
  }
}

export default class PublicationFile extends React.Component {
  static async getInitialProps(nextContext) {
    const newpath = `/publications/${nextContext.query.slug}/pdf`;
    return redirectPermanent(nextContext, newpath);
  }
  render() {
    return <div>Pdf file not found</div>;
  }
}
