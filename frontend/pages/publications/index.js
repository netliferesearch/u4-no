import React, { Component} from 'react';
import Link from 'next/link';
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
    const {publications, url} = props;
    this.state = {publications};
  }
  render () {
    return (
      <div>
        <h1>Publications</h1>
        <ul>
          {this.state.publications.map(pub =>
            <li key={pub._id}>
              <Link href={`/publications/entry?id=${pub._id}`}>
                <a>{pub.title}</a>
              </Link>
            </li>)}
        </ul>
        </div>
    )
  }
}
