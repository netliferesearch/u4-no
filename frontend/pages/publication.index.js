import React, { Component } from 'react';
import { Link } from '../routes';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';

const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({ req }) {
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
    });
    const publications = await client.fetch('*[_type in ["publication"]][0..10000]');
    return { publications };
  }
  constructor(props) {
    super(props);
    const { publications, url } = props;
    this.state = { publications };
  }
  render() {
    const { publications } = this.state;
    return (
      <Layout>
        <h1>Publications</h1>
        {publications.map(({ _id = '', title = '', featuredImage: {} }) => (
          <div key={_id}>
            <Link route={`/publications/${_id}`}>
              <a>{title}</a>
            </Link>
          </div>
        ))}
      </Layout>
    );
  }
}
