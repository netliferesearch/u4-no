import React, { Component } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';
import BEMHelper from 'react-bem-helper';

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
        <BlockContent blocks={blocks} serializers={serializers} />
      </main>
    );
  }
}

export default LongformArticle;
