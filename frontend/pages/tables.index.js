import React from 'react';
import { Link } from '../routes';
import { Footer, Layout, Table } from '../components';
import DataLoader from '../helpers/data-loader';

const Tables = () => (
  <Layout
    headComponentConfig={{
      title: 'Tables',
    }}
  >
    <div className="c-longform-grid">

      <div className="c-longform-grid__standard">
        <h2>HTML Table</h2>
      </div>

      <div className="c-article__figure c-figure--normal c-longform-grid__large">
        <Table />
      </div>

    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Tables, {
  queryFunc: () => ({
    sanityQuery:
      '{"tables": *[_type == "tables"]}',
  }),
  materializeDepth: 0,
});
