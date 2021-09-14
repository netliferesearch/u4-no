import React, { useRef, useState } from 'react';
import LongformArticle from '../LongformArticle';
import PdfViewer from '../PdfViewer';
import { ReaderHeader } from './ReaderHeader';
import { ToggleBlock } from '../ToggleBlock';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import { Contents } from '../Contents';
import { ArticleLead } from '../general/article-lead/ArticleLead';
import { TitleProgressSpy } from './TitleProgressSpy';
import Footer from '../general/footer/Footer';
import { AdditionalInfo } from './AdditionalInfo';

export const Reader = ({ data, setReaderOpen = false, legacypdf = {}, shortversion = false }) => {
  const {
    title = '',
    lead = '',
    abstract = '',
    content = [],
    references = [],
    methodology = [],
    acknowledgements = [],
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
      <TitleProgressSpy content={content} />
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
              {abbreviations.length > 0 && <ToggleBlock title="Abbreviations" content={abbreviations} />}
            </div>
            <div className="c-article__side c-article__col">
              <div className="c-reader__sidebar c-article-sidebar">
                <Contents title={title} content={content} scrolled={scrolled} />
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
      {acknowledgements.length > 0 || methodology.length > 0 || notes || partners.length > 0 ? (
        <AdditionalInfo data={data} shortversion={shortversion} />
      ) : null}
      <Footer />
    </div>
  );
};
