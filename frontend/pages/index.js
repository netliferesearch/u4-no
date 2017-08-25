import React, { Component } from 'react';
import Link from 'next/link';
import {
  HeadComponent
} from '../components'

export default class extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return ( <div>
      <HeadComponent />
      <h1>Velkommen til u4.no</h1>
        <ul>
          <li><Link href={`/publications`}><a>Publikasjoner</a></Link></li>
        </ul>
      </div>)
  }
}
