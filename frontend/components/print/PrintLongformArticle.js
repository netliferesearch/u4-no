import React, { Component } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Head from 'next/head';
import BEMHelper from 'react-bem-helper';
import stylesheet from '../../style/print.scss';
import serializers from '../printSerializers';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
const classes = BEMHelper({
  name: 'longform-grid',
  prefix: 'c-',
});

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */

class LongformArticle extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // const littlefoot = require('littlefoot').default;
    // littlefoot();
  }
  componentDidUpdate() {
    // const littlefoot = require('littlefoot').default
    // littlefoot()
  }
  render() {
    const { content = [] } = this.props
    const blocks = content.filter(block => !['reference'].includes(block._type));
    return (
      <main
        className={`c-article ${blocks.length === 1 ? 'c-longform-grid' : 'c-longform-grid-sub-div'}`}
      >
        <div className="contents">
        <ul>Table of contents
          {
              buildTitleObjects(content).map(item => <li><a href={`#${item.id}`}>{item.title}</a></li>)
          }


        </ul>
      </div>
      <div className="body">
        <BlockContent blocks={blocks} serializers={serializers} />
      </div>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
      </main>
    );
  }
}

export default LongformArticle;
