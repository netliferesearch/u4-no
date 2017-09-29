import React from 'react';
import { Link } from '../routes';
import { Layout } from '../components';

export default () => (
  <Layout>
    <div className="o-wrapper">
      <h1>Velkommen til u4.no</h1>
      <ul>
        <li>
          <Link route="/topics">
            <a>Topic pages</a>
          </Link>
        </li>
        <li>
          <Link route="/publications">
            <a>Publikasjoner</a>
          </Link>
        </li>
      </ul>
    </div>
  </Layout>
);
