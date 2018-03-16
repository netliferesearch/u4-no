import React from 'react';
import BEMHelper from 'react-bem-helper';

import { Layout, PdfViewer } from '../components';
import { Download } from '../components/icons';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const classes = BEMHelper({
  name: 'article-header',
  prefix: 'c-',
});

const Asset = ({ data: { title = '', slug = {}, asset = {} } }) => {
  const isPdf = title.slice(-4) === '.pdf';
  const isDoc = title.slice(-4) === '.doc' || title.slice(-5) === '.docx';
  return (
    <Layout>
      <header>
        <div className="u-tc u-margin-bottom">
          <a href={asset.asset.url} {...classes('download-text')}>
            <span>Download {isPdf ? 'PDF' : 'file'}</span>
            <Download {...classes('download-icon')} />
          </a>
        </div>
      </header>
      {isPdf && (
        <PdfViewer
          file={{
            url: asset.asset.url,
          }}
          standalone
        />
      )}
      {isDoc && (
        <div className="o-wrapper u-tc">
          <iframe
            className="c-pdf-viewer"
            title={title}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${asset.asset.url}`}
            width="600px"
            height="600px"
            frameBorder="0"
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
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
  materializeDepth: 1,
});
