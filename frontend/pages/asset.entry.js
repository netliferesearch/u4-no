import React from 'react';

import { Layout, PdfViewer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const Asset = (props) => {
  const { title = '', slug = {}, asset = {} } = props;
  return (
    <Layout>
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
