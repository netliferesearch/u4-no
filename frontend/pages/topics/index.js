import React, { Component } from 'react';
import Link from 'next/link';
import { Layout } from '../../components';

const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({ req }) {
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
    });
    const topics = await client.fetch('*[_type in ["topics"] && !(_id in path "drafts.**") ]');
    return { topics };
  }
  constructor(props) {
    super(props);
    const { topics, url } = props;
    this.state = { topics };
  }
  render() {
    return (
      <Layout>
        <h1>Topics</h1>
        <ul>
          {this.state.topics.map(topic => (
            <li key={topic._id}>
              <Link href={`/topics/entry?id=${topic._id}`}>
                <a>{topic.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}
