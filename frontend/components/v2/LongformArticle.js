import React, { useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers';
import findFootnotes from '../findFootnotes';
import footnoteSerializer from '../footnoteSerializer';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */

const LongformArticle = ({ content = [] }) => {
  useEffect(() => {
    const littlefoot = require('littlefoot').default;
    littlefoot();
  }, []);

  if (!content) return <div />;
  const blocks = content.filter(block => !['reference'].includes(block._type));
  const footnotes = findFootnotes(blocks);
  const footNotesKeys = Object.keys(footnotes);
  return (
    <main className={'c-article-v2 o-wrapper-section'}>
      <BlockContent blocks={blocks} serializers={serializers} />
      <div>
        <div className="footnotes">
          <ol>
            {footNotesKeys.map(key => (
              <BlockContent
                blocks={footnotes[key]}
                serializers={footnoteSerializer(key)}
                key={key}
              />
            ))}
          </ol>
        </div>
      </div>
      <span id="js-bottom" />
    </main>
  );
};

export default LongformArticle;
