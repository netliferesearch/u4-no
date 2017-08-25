import React, { Component } from 'react';
const sanityClient = require( '@sanity/client' );

export default class extends Component {
  static async getInitialProps ({req}) {
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: ''
    });
    const publications = await client.fetch('*[_type in ["publication"]]');
    return {publications}
  }
  constructor (props) {
    super(props);
    const {publications} = props;
    this.state = {publications};

  }
  render () {
    return (
      <div>
        <h1>Single publication</h1>
      </div>
    )
  }
}
