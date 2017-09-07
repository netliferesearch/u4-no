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

    this.state = {
      // sort topics by title alphabetically
      topics: topics.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      }),
    };
  }
  render() {
    return (
      <Layout>
        <h1>U4 anti-corruption guides for development practitioners and policymakers</h1>
        <p>What you'll find: </p>
        <p>What you won't find: </p>
        <p>Why we built this: </p>
        <p>
          Need to quickly get up to speed on anti-corruption research in sustainable development? We
          want to share our knowledge by providing you with a selection of carefully crafted
          introductions and in-depth articles sorted by topics.
        </p>
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
