import BlockContent from '@sanity/block-content-to-react';
import findFootnotes from 'components/findFootnotes';
import footnoteSerializer from 'components/footnoteSerializer';
import serializers from 'components/serializers/serializers';

export default function LongformArticleContent( { content = [], lead = false } ) {

  if (!content) return <div></div>;
  const blocks = content.filter(block => !['reference'].includes(block._type));
  const footnotes = findFootnotes(blocks);
  const footNotesKeys = Object.keys(footnotes);
  return (
    <div className={`c-article-v2 o-wrapper-section c-article-v2__main-text c-longform ${lead ? '' : 'u-drop-cap'}`}>
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
    </div>
  );
};