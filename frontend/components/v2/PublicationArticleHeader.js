import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { ArrowRight } from '../icons';
import { ArrowWhite } from '../icons/ArrowWhite';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { useMediaQuery } from './';
import { Reader } from './Reader'
const classes = BEMHelper({
  name: 'article-header-v2',
  prefix: 'c-',
});

const PublicationArticleHeader = ({
  title = '',
  subtitle = '',
  lead = '',
  slug = {},
  className = '',
  publicationType = {},
  standfirst = '',
  pdfFile = {},
  legacypdf = {},
  shortversion = false,
  content = [],
}) => {
  const [isReading, setReading] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const pdfAsset = legacypdf.asset ? legacypdf.asset : pdfFile.asset

  return (
    <header {...classes('', null, className)}>
      <div className="o-wrapper-section c-article-header__container">
        <div {...classes('meta')}>
          <h6 className="u-navy-small-headline">
            {publicationType.title && `Publication | ${publicationType.title}`}
          </h6>
        </div>
        <div {...classes('left')}>
          <h1 className="u-navy-mid-headline">{title}</h1>
          {standfirst ? <p {...classes('intro')}>{standfirst}</p> : null}
          
            <div {...classes('download')}>
            {pdfAsset && (<div className={`dropdown-select${downloadsOpen ? ' open' : ''}`}>
                <a
                  onClick={() => setDownloadsOpen(!downloadsOpen)}
                  {...classes('download-text button')}
                >
                  <span>Download as PDF</span>
                  <ArrowWhite />
                </a>
                <div className="other-links">
                  <a
                    href={`/publication/${slug.current}.pdf`}
                    download={`/publication/${slug.current}.pdf`}
                    {...classes('download-text button')}
                    target="_blank"
                  >
                    <span>Main points</span>
                  </a>
                  <a
                    href={`/publication/${slug.current}.pdf`}
                    download={`/publication/${slug.current}.pdf`}
                    {...classes('download-text button')}
                    target="_blank"
                  >
                    <span>Main points + summary</span>
                  </a>
                  <a
                    href={`/publication/${slug.current}.pdf`}
                    download={`/publication/${slug.current}.pdf`}
                    {...classes('download-text button')}
                    target="_blank"
                  >
                    <span>Full report</span>
                  </a>
                </div>
              </div>          )}
              {(content.length > 0 || legacypdf.asset) &&
              <button className="read-online button" onClick={() => setReading(true)}>
                Read online
                <ArrowRight />
              </button>}
            </div>

        </div>
        <div {...classes('right pdf-preview')}>
          {/* {useMediaQuery('tablet') && ( */}
          <Document file={pdfFile.asset ? pdfFile.asset : legacypdf.asset}>
            <Page pageNumber={1} />
          </Document>
          {/* )} */}
        </div>
      </div>
      {isReading && <Reader title={title} content={content} setReading={setReading} legacypdf={legacypdf}/>}
    </header>
  );
};

export default PublicationArticleHeader;
