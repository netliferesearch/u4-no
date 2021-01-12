import React, { useRef } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers';
import LongformArticle from './LongformArticle';
import PdfViewer from '../PdfViewer';
import { LongformArticleHeader } from './LongformArticleHeader';
import { PublicationSidebar } from './PublicationSidebar';
import BEMHelper from 'react-bem-helper';
import { ToggleBlock } from './ToggleBlock';
import { Acknowledgements } from './Aknowledgements';
import { Partners } from './Partners';
import { Disclaimers } from './Disclaimers';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';

const classes = BEMHelper({
  name: 'article__content',
  prefix: 'c-',
});

export const Reader = ({ data, setReaderOpen = false, legacypdf = {}, shortversion = false }) => {
  const {
    title = '',
    content = [],
    references = [],
    methodology = [],
    notes = '',
    featuredImage = {},
  } = data;
  const readerRef = useRef();

  return (
    <div className="c-reader" ref={readerRef}>
      <LongformArticleHeader data={data} setReaderOpen={setReaderOpen} targetRef={readerRef} />
      {content.length > 0 && (
        <main className="c-reader__main o-wrapper-section c-article__row">
          <div className="c-article__side c-article__col">
            <PublicationSidebar data={data} side={'left'} />
          </div>
          <div className="c-article__center c-article__col">
            <LongformArticle content={content} title={title} />
          </div>
          <div className="c-article__side c-article__col">
            <div className="c-article-sidebar" />
          </div>
        </main>
      )}
      {!content.length && legacypdf.asset && (
        <div className="c-article-v2 c-article-v2__pdf-viewer o-wrapper-section">
          <PdfViewer file={{ url: legacypdf.asset.url }} />
        </div>
      )}
      <div className="c-article__additional-content">
        {!shortversion && references ? (
          <ToggleBlock title="References" content={references} />
        ) : null}
        {abbreviations.length ? (
          <ToggleBlock title="Abbreviation list" content={abbreviations} />
        ) : null}
        <Acknowledgements data={data} />
        <Partners data={data} />
        {!shortversion && methodology && methodology.length > 0 ? (
          <ToggleBlock title="Methodology" content={methodology} />
        ) : null}
        {!shortversion && notes ? (
          <ToggleBlock title="Notes" content={notes}>
            {featuredImage.caption && (
              <div className="c-longform-grid__standard">
                <p>
                  <b>Header image:</b>
                </p>
                <BlockToContent
                  blocks={featuredImage.caption}
                  serializers={{
                    types: {
                      block: props => <p style={{ display: 'inline' }}>{props.children}</p>,
                    },
                  }}
                />
              </div>
            )}
            <div className="c-longform-grid__standard">
              {!featuredImage.sourceUrl && featuredImage.credit && (
                <span>Photo: {featuredImage.credit} </span>
              )}

              {featuredImage.sourceUrl && (
                <span>
                  Photo:
                  <a className="u-margin-left-tiny" href={featuredImage.sourceUrl}>
                    {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
                  </a>
                </span>
              )}
              {featuredImage.license && (
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  {' '}
                  CC {featuredImage.license.toUpperCase()}
                </a>
              )}
            </div>
          </ToggleBlock>
        ) : null}
        <PhotoCaptionCredit featuredImage={featuredImage} />
        <Disclaimers title={false} />
        {/*             
          {!shortversion && props.data.abstract ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title="Abstract" content={props.data.abstract} />
              </div>
            </div>
          ) : null} */}
      </div>
    </div>
  );
};
