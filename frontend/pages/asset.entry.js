import React from 'react';
import BEMHelper from 'react-bem-helper';

import { Layout, PdfViewer } from '../components';
import { Download } from '../components/icons'
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const classes = BEMHelper({
  name: 'article-header',
  prefix: 'c-',
});

const Asset = (props) => {
  const { title = '', slug = {}, asset = {} } = props;
  return (
    <Layout>
      <header>
        <div className="u-tc u-margin-bottom">
          <a href={asset.asset.url} {...classes('download-text')}>
            <span>Download PDF</span>
            <Download {...classes('download-icon')} />
          </a>
        </div>
      </header>
      <PdfViewer
        file={{
          url: asset.asset.url,
        }}
        standalone
      />
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
