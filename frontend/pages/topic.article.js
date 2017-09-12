import React, { Component } from 'react';
import { Layout, TopicArticle } from '../components';
import Link from 'next/link';

const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({ query }) {
    const client = sanityClient({ projectId: '1f1lcoov', dataset: 'production', token: '' });
    const { id = '' } = query;
    const sanityQuery = `*[_id == "${id}"]`;
    const topic = (await client.fetch(sanityQuery))[0];
    return { topic, query };
  }
  constructor(props) {
    super(props);
    const {
      topic = {
        title: 'loading topic',
      },
    } = props;
  }
  render() {
    const { topic, query = {} } = this.props;
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
        <p>
          Tilbake til {' '}
          <Link href={`/topics/entry?id=${topic._id}`}>
            <a>{title}</a>
          </Link>
        </p>
        <TopicArticle content={topic[query.topicKey]} />
      </Layout>
    );
  }
}
