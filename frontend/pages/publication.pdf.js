import React from 'react';
import Router from 'next/router';

import DataLoader from '../helpers/data-loader';

/* send 302 Permanent redirect to path */
function redirectTemp(ctx, path) {
  console.log(ctx);
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: path });
    ctx.res.end();
    ctx.res.finished = true;
  } else {
    Router.replace(path);
  }
}

const PublicationPdf = (props) => {
  if (
    props.data &&
    props.data.pdfFile &&
    props.data.pdfFile.asset &&
    props.data.pdfFile.asset.url
  ) {
    return redirectTemp(props.ctx, props.data.pdfFile.asset.url);
  }
  if (
    props.data &&
    props.data.legacypdf &&
    props.data.legacypdf.asset &&
    props.data.legacypdf.asset.url
  ) {
    return redirectTemp(props.ctx, props.data.legacypdf.asset.url);
  }
  return <div>pdf not found</div>;
};

export default DataLoader(PublicationPdf, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
