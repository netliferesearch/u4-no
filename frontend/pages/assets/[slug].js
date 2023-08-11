import React from 'react';
import BEMHelper from 'react-bem-helper';

import Layout from '../../components/Layout';
//import PdfViewer from '../../components/PdfViewer';
import PdfEmbed from '../../components/pdfEmbed/PdfEmbed';
import Download from '../../components/icons/Download';

import DataLoader from '../../helpers/data-loader';

const classes = BEMHelper({
  name: 'article-header',
  prefix: 'c-',
});

const Asset = ({ data: { title = '', slug = {}, asset = {} } }) => {
  const isPdf = asset.asset.url.slice(-4) === '.pdf';
  const isDoc = asset.asset.url.slice(-4) === '.doc' || asset.asset.url.slice(-5) === '.docx';
  return (
    <Layout>
      {true && (
        <header>
          <div className="u-tc u-margin-bottom">
            <h2 className="c-page-intro__h u-primary-heading">{title}</h2>
            <a href={asset.asset.url} {...classes('download-text')}>
              <span>Download {isPdf ? 'PDF' : 'file'}</span>
              <Download {...classes('download-icon')} />
            </a>
          </div>
        </header>
      )}
      {isPdf && <PdfEmbed src={asset.asset.url} title={title} mode="inline" />}
      {isDoc && (
        <div className="o-wrapper u-tc">
          <iframe
            className="c-pdf-viewer"
            title={title}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${asset.asset.url}`}
            width="100%"
            height="800"
            frameBorder="0"
            style={{ maxWidth: 1000, maxHeight: '75vh' }}
          >
            Your browser does not allow embedding of word documents, please use the download link
            above
          </iframe>
        </div>
      )}
    </Layout>
  );
};

export default DataLoader(Asset, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[_type=="asset" && slug.current == $slug][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
