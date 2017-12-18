import React, { Component } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';
import findFootnotes from './findFootnotes';
import footnoteSerializer from './footnoteSerializer';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */

class LongformArticle extends Component {
  componentDidMount() {
    this.littlefootActivator();
  }
  componentDidUpdate() {
    this.littlefootActivator();
  }
  littlefootActivator() {
    const littlefoot = require('littlefoot').default;
    littlefoot();
  }

  render() {
    const { content = [] } = this.props;
    const blocks = content.filter(block => !['reference'].includes(block._type));
    const footnotes = findFootnotes(blocks);
    const footNotesKeys = Object.keys(footnotes);
    return (
      <main
        className={`c-article ${
          blocks.length === 1 ? 'c-longform-grid' : 'c-longform-grid-sub-div'
        }`}
      >
        <BlockContent blocks={blocks} serializers={serializers} />
        <div>
          <div className="footnotes">
            <ol>
              { footNotesKeys.map(key => (
                <BlockContent blocks={footnotes[key]} serializers={footnoteSerializer(key)} />
              ))}
            </ol>
          </div>
        </div>
      </main>
    );
  }
}

export default LongformArticle;
