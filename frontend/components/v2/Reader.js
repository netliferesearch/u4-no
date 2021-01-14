import React, { useRef, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Scrollchor from 'react-scrollchor';
import serializers from '../serializers';
import LongformArticle from './LongformArticle';
import PdfViewer from '../PdfViewer';
import { LongformArticleHeader } from './LongformArticleHeader';
import { PublicationSidebar } from './PublicationSidebar';
import { ToggleBlock } from './ToggleBlock';
import { Acknowledgements } from './Aknowledgements';
import { Partners } from './Partners';
import { Disclaimers } from './Disclaimers';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';
import { ToTop } from './icons/ToTop';
import { useScrollInfo } from '../../helpers/useScrollInfo';

export const Reader = ({ data, setReaderOpen = false, legacypdf = {}, shortversion = false }) => {
  const {
    title = '',
    content = [],
    references = [],
    methodology = [],
    notes = '',
    featuredImage = {},
    abbreviations = [],
  } = data;
  const readerRef = useRef();
  const [scrolled, setScrolled] = useState(false);

  useScrollInfo(
    ({ currPos }) => {
      const isScrolled = currPos.y < -200;
      if (scrolled !== isScrolled) {
        setScrolled(isScrolled);
      }
    },
    [scrolled],
    readerRef,
    false,
    0
  );

  return (
    <div id="c-reader" className="c-reader" ref={readerRef}>
      <span id="js-top-reader" />
      <LongformArticleHeader data={data} setReaderOpen={setReaderOpen} targetRef={readerRef} />
      <div className="u-scroll-bar">
        {content.length > 0 && (
          <main className="c-reader__main o-wrapper-section u-side-padding c-article__row">
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
          <main className="c-reader__main o-wrapper-section u-side-padding c-article__row">
            <div className="c-article-v2 c-article-v2__pdf-viewer o-wrapper-section">
              <PdfViewer file={{ url: legacypdf.asset.url }} />
            </div>
          </main>
        )}

        <div
          id="additional-info"
          className="c-article__additional-info-container o-wrapper-section u-side-padding"
        >
          <div className="c-article__additional-info-content">
            {!shortversion && references && references.length ? (
              <ToggleBlock title="References" content={references} />
            ) : null}
            {abbreviations.length ? (
              <ToggleBlock title="Abbreviation list" content={abbreviations} />
            ) : null}
            <Acknowledgements data={data} bottom={true} />
            <Partners data={data} bottom={true} />
            {/* {!shortversion && methodology && methodology.length > 0 ? (
              <ToggleBlock title="Methodology" content={methodology} />
            ) : null} */}
            {!shortversion && methodology && methodology.length > 0 ? (
              <div className="c-meta">
                <hr className="u-section-underline--no-margins" />
                <div className="c-meta__title">
                  <h3 className="u-headline--2">Methodology</h3>
                </div>
                <div className="c-meta__content">
                  {typeof methodology === 'string' && <p>{methodology}</p>}
                  {typeof methodology !== 'string' && (
                    <BlockContent blocks={methodology} serializers={serializers} />
                  )}
                </div>
              </div>
            ) : null}
            {!shortversion && notes ? (
              <div className="c-meta">
                <hr className="u-section-underline--no-margins" />
                <div className="c-meta__title">
                  <h3 className="u-headline--2">Notes</h3>
                </div>
                <div className="c-meta__content">
                  {typeof notes === 'string' && <p>{notes}</p>}
                  {typeof notes !== 'string' && (
                    <BlockContent blocks={notes} serializers={serializers} />
                  )}
                  {featuredImage.caption && (
                    <div className="c-credit__caption">
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
                  <PhotoCaptionCredit featuredImage={featuredImage} showCaption={false} />
                </div>
              </div>
            ) : null}
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
      </div>
      {scrolled ? (
        <div className="c-scroll-top">
          <Scrollchor to="#js-top-reader" disableHistory>
            <ToTop />
          </Scrollchor>
        </div>
      ) : null}
    </div>
  );
};
