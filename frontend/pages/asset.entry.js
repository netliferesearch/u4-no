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
  const isPdf = asset.asset.url.slice(-4) === '.pdf';
  const isDoc = asset.asset.url.slice(-4) === '.doc' || asset.asset.url.slice(-5) === '.docx';
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
