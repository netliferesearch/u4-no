import React, { Component } from 'react';
import Link from 'next/link';

export default class extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return ( <div>
      <p>Velkommen til u4.no</p>
        <ul>
          <li><Link href={`/publications`}><a>Publikasjoner</a></Link></li>
        </ul>
      </div>)
  }
}
