import React, { Component } from 'react';
import {
  Layout
} from '../../components'
const sanityClient = require( '@sanity/client' );

export default class extends Component {
  static async getInitialProps ({query}) {
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: ''
    });
    const {id = ''} = query;
    const sanityQuery = `*[_id == "${id}"]`
    const publication = (await client.fetch(sanityQuery))[0];
    return {publication}
  }
  constructor (props) {
    super(props);
    const {publication = {title: "loading publication"}} = props;
    this.state = {publication};
  }
  render () {
    return (
      <Layout>
        <div>
          <h1>{this.state.publication.title}</h1>
        </div>
      </Layout>
    )
  }
}
