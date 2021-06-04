import React from 'react';

import Footer from './Footer';
import Layout from './Layout';

const Error404 = () => (
  <Layout
    headComponentConfig={{
      title: '404 page not found',
      description: '',
    }}
  >
    <div className="o-wrapper u-tc">
      <h1 className="c-topic-heading">Page not found (404)</h1>

      <section id="topics" className=" c-topic-index__list u-margin-bottom-huge">
        <p className="c-longform-grid__standard">The requested content was not found.</p>
      </section>
    </div>
    <Footer />
  </Layout>
);

export default Error404;
