import React, { useRef, useState } from 'react';
import LongformArticle from '../LongformArticle';
//import PdfViewer from '../PdfViewer';
import { ReaderHeader } from './ReaderHeader';
import { ToggleBlock } from './ToggleBlock';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import { Contents } from './Contents';
//import { ArticleLead } from '../general/article-lead/ArticleLead';
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
    abbreviations = [],
    partners = [],
    featuredImage = {},
    publicationType = '',
  } = data;

  const readerRef = useRef();
  const footRef = useRef();
  const topRef = useRef();
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
      <TitleProgressSpy content={content} />
      <ReaderHeader data={data} setReaderOpen={setReaderOpen} targetRef={readerRef} />
      <section className="o-wrapper-medium">
        {content.length > 0 && (
          <main className="c-reader__main o-wrapper-section c-article__row">
            <div className="c-article__content c-article__col">
              {/* {lead || abstract ? <ArticleLead lead={lead} abstract={abstract} /> : null} */}
              <LongformArticle content={content} title={title} />
              {references.length > 0 && <ToggleBlock title="References" content={references} />}
              {abbreviations.length > 0 && (
                <ToggleBlock title="Abbreviations" content={abbreviations} />
              )}
            </div>
            <div className="c-article__side c-article__col u-hidden--tablet">
            <span ref={topRef}></span>
              <Contents title={title} content={content} scrolled={scrolled} footRef={footRef} topRef={topRef}/>
            </div>
            <span ref={footRef}></span>
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
