import React, { Component } from 'react';
import { Layout, TopicArticle } from '../components';
import Link from 'next/link';

const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({ query }) {
    const client = sanityClient({ projectId: '1f1lcoov', dataset: 'production', token: '' });
    const { id = '' } = query;
    const sanityQuery = `*[_id == "${id}"]`;
    const article = (await client.fetch(sanityQuery))[0];
    return { article, query };
  }
  constructor(props) {
    super(props);
    const {
      article = {
        title: 'loading document',
      },
    } = props;
  }
  componentDidUpdate() {

  }
  render() {
    const { article, query = {} } = this.props;
    const {
      title = '',
      longTitle = '',
      explainerText = 'no explainerText',
      featuredImage,
      content = [],
    } = article;
    return (
      <Layout>
        <h1>{title}</h1>
        <TopicArticle content={content} />
      </Layout>
    );
  }
}
