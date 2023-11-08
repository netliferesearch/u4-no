"use client";

import React, { useRef, useState } from 'react';
import { ReaderHeader } from './ReaderHeader';
import { useScrollInfo } from 'helpers/useScrollInfo';
import { Contents } from './Contents';
import { TitleProgressSpy } from './TitleProgressSpy';
import Footer from 'components/general/footer/Footer';
import { AdditionalInfo } from 'components/publication/AdditionalInfo';

export default function Reader (
  { data = {}, 
    titleObjects = [],
    setReaderOpen = true, 
    legacypdf = {}, 
    children = {} }) {
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
    shortversion = false,
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
      <TitleProgressSpy watchables={titleObjects} />
      <ReaderHeader data={data} titleObjects={titleObjects} setReaderOpen={setReaderOpen} targetRef={readerRef} />
      <section className="o-wrapper-medium">
        <main className="c-reader__main o-wrapper-section c-article__row">
          <div className="c-article__content c-article__col">
            {/* {lead || abstract ? <ArticleLead lead={lead} abstract={abstract} /> : null} */}
            {children}
          </div>
          <div className="c-article__side c-article__col u-hidden--tablet">
          <span ref={topRef}></span>
            <Contents title={title} titleObjects={titleObjects} scrolled={scrolled} footRef={footRef} topRef={topRef}/>
          </div>
          <span ref={footRef}></span>
        </main>
      </section>
      {(acknowledgements || methodology || notes || partners) &&
        <AdditionalInfo data={data} shortversion={shortversion} />
      }
      <Footer />
    </div>
  );
};
