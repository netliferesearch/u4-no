import React, { Component } from 'react';
import { Layout, Article } from '../../components';
import materialize from '../../helpers/materialize';

const sanityClient = require('@sanity/client');

export default class extends Component {
  static async getInitialProps({ query }) {
    const client = sanityClient({ projectId: '1f1lcoov', dataset: 'production', token: '' });
    const {
      id = '',
    } = query;
    const sanityQuery = `*[_id == "${id}"][0]`;
    const publication = (await client.fetch(sanityQuery));
    const materialized = await materialize(publication);
    return { publication: materialized };
  }
  constructor(props) {
    super(props);
    const {
      publication = {
        title: 'loading publication',
      },
    } = props;
    this.state = {
      publication,
    };
  }
  render() {
    const { publication } = this.props;
    return (
      <Layout>
        <Article {...publication} />
      </Layout>

    );
  }
}
