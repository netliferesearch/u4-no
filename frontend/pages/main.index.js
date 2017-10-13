import React from 'react';
import { Link } from '../routes';
import { Layout } from '../components';

export default () => (
  <Layout>
    <div className="o-wrapper">
      <h1>Welcome to u4.no</h1>
      <ul>
        <li>
          <Link route="/topics">
            <a>Topics</a>
          </Link>
        </li>
        <li>
          <Link route="/publications">
            <a>Publications</a>
          </Link>
        </li>
        <li>
          <Link route="/online-training/1">
            <a>Online training</a>
          </Link>
        </li>
      </ul>
    </div>
  </Layout>
);
