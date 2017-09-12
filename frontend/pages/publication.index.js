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
    const publications = await client.fetch('*[_type in ["publication"]]');
    return { publications };
  }
  constructor(props) {
    super(props);
    const { publications, url } = props;
    this.state = { publications };
  }
  render() {
    return (
      <Layout>
        <h1>Publications</h1>
        <ul>
          {this.state.publications.map(pub => (
            <li key={pub._id}>
              <Link route={`/publications/${pub._id}`}>
                <a>{pub.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}
