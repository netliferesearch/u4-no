import React, { Component } from 'react';
import { Layout, Article } from '../../components';
import Link from 'next/link';

const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({ query }) {
    const client = sanityClient({ projectId: '1f1lcoov', dataset: 'production', token: '' });
    const { id = '' } = query;
    const sanityQuery = `*[_id == "${id}"]`;
    const topic = (await client.fetch(sanityQuery))[0];
    return { topic };
  }
  constructor(props) {
    super(props);
    const {
      topic = {
        title: 'loading topic',
      },
    } = props;
    this.state = {
      topic,
    };
  }
  render() {
    const { topic } = this.props;
    const {
      title = '',
      longTitle = '',
      explainerText = 'Publication has no explainerText',
      featuredImage,
      parent = {},
      introduction = [],
      agenda = [],
      advisors = [],
    } = topic;
    return (
      <Layout>
        <h1>{title}</h1>
        <p>{explainerText}</p>
        <ul>
          <li>
            <Link href={`/topics/article?id=${topic._id}&topicKey=introduction`}>
              <a>A basic guide to to NRE</a>
            </Link>
          </li>
          <li>
            <Link href={`/topics/article?id=${topic._id}&topicKey=agenda`}>
              <a>Research and policy agenda</a>
            </Link>
          </li>
        </ul>
      </Layout>
    );
  }
}
