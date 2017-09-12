import React from 'react';
import Link from 'next/link';
import {
  Layout,
} from '../components';

export default () => (
  <Layout>
    <h1>Velkommen til u4.no</h1>
    <ul>
      <li><Link href={'/topics'}><a>Topic pages</a></Link></li>
      <li><Link href={'/publications'}><a>Publikasjoner</a></Link></li>
    </ul>
  </Layout>
);
