import React, { useRef, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Scrollchor } from 'react-scrollchor';
import serializers from '../serializers/serializers';
import LongformArticle from '../LongformArticle';
import PdfViewer from '../PdfViewer';
import { ReaderHeader } from './ReaderHeader';
import { ArticleSidebar } from '../general/article-sidebar/ArticleSidebar';
import { ToggleBlock } from '../ToggleBlock';
import { Acknowledgements } from './Aknowledgements';
import { Partners } from '../general/partners/Partners';
import { Disclaimers } from '../Disclaimers';
import { PhotoCaptionCredit } from '../general/PhotoCaptionCredit';
import { ToTop } from '../icons/ToTop';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import { Contents } from '../Contents';
import { ArticleLead } from '../general/article-lead/ArticleLead';

export const Reader = ({ data, setReaderOpen = false, legacypdf = {}, shortversion = false }) => {
  const {
    title = '',
    lead = '',
    abstract = '',
    content = [],
    references = [],
    methodology = [],
    notes = '',
    featuredImage = {},
    abbreviations = [],
    partners = [],
    publicationType = '',
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
      <ReaderHeader data={data} setReaderOpen={setReaderOpen} targetRef={readerRef} />
      {/* <div className="u-scroll-bar"> */}
      <section className="o-wrapper-medium">
        {content.length > 0 && (
          <main className="c-reader__main o-wrapper-section c-article__row">
            {/* <div className="c-article__side c-article__col">
              <ArticleSidebar data={data} side={'left'} />
            </div> */}
            <div className="c-article__content c-article__col">
              {lead || abstract ? <ArticleLead lead={lead} abstract={abstract} /> : null}
              <LongformArticle content={content} title={title} />
              {references.length > 0 && <ToggleBlock title="References" content={references} />}
              {abbreviations.length > 0 && (
                <ToggleBlock title="Abbreviations" content={abbreviations} />
              )}
            </div>
            <div className="c-article__side c-article__col">
              <div className="c-article-sidebar">
                <Contents title={title} content={content} setReaderOpen={setReaderOpen} />
              </div>
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
      </section>
      <section className="u-bg--lighter-blue c-article__additional-content">
        <div className="o-wrapper-medium">
          <div className="o-wrapper-narrow">
            <Acknowledgements data={data} bottom={true} />
            <Partners partners={partners} publicationType={publicationType} />
            {/* {!shortversion && methodology && methodology.length > 0 ? (
              <ToggleBlock title="Methodology" content={methodology} />
            ) : null} */}
            {!shortversion && methodology && methodology.length > 0 ? (
              <div className="c-meta">
                <hr className="u-section-underline--no-margins" />
                <div className="c-meta__title">
                  <h3 className="u-primary-heading">Methodology</h3>
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
                  <h3 className="u-primary-heading">Notes</h3>
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
      </section>
      {/* </div> */}
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
