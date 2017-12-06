import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';
import findFootnotes from './findFootnotes';
import footnoteSerializer from './footnoteSerializer';

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
    super(props);
  }
  componentDidMount() {
    const littlefoot = require('littlefoot').default;
    littlefoot(/* {
      buttonTemplate: `<span class="littlefoot-footnote__container">
    <button class="littlefoot-footnote__button littlefoot-footnote__button__ellipsis" id="<%= reference %>" data-footnote-content="<%= content %>" data-footnote-id="<%= id %>" data-footnote-number="<%= number %>" alt="See Footnote <%= number %>" aria-controls="fncontent:<%= id %>" aria-expanded="false" aria-label="Footnote <%= number %>" rel="footnote">
         <span class="littlefoot-footnote__number"><%= number %></span>
    </button>
</span>`,
    } */);
  }
  componentDidUpdate() {
    const littlefoot = require('littlefoot').default;
    littlefoot(/* {
      buttonTemplate: `<span class="littlefoot-footnote__container">
    <button class="littlefoot-footnote__button littlefoot-footnote__button__ellipsis" id="<%= reference %>" data-footnote-content="<%= content %>" data-footnote-id="<%= id %>" data-footnote-number="<%= number %>" alt="See Footnote <%= number %>" aria-controls="fncontent:<%= id %>" aria-expanded="false" aria-label="Footnote <%= number %>" rel="footnote">
         <span class="littlefoot-footnote__number"><%= number %></span>
    </button>
</span>`,
    } */);
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
        <BlockContent blocks={blocks} serializers={serializers(blocks)} />

        <div className="footnotes">
          <ol>
            {footNotesKeys.map(key => (
              <BlockContent blocks={footnotes[key]} serializers={footnoteSerializer(key)} />
            ))}
          </ol>
        </div>
      </main>
    );
  }
}

export default LongformArticle;
