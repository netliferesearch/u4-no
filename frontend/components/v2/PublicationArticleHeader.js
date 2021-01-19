import React from 'react';
import BEMHelper from 'react-bem-helper';
import { getRouteByType } from '../../helpers/getRouteByType';
import { Link } from '../../routes';
const classes = BEMHelper({
  name: 'pubHeader',
  prefix: 'c-',
});

const PublicationArticleHeader = ({
  title = '',
  subtitle = '',
  slug = {},
  className = '',
  publicationType = {},
  pdfFile = {},
  legacypdf = {},
  shortversion = false,
  content = [],
  summary = [],
  setReaderOpen = null,
  readerOpen = false,
}) => {
  const pdfAsset = legacypdf.asset ? legacypdf.asset : pdfFile.asset;

  return (
    <header {...classes('', null, className)}>
      <div className="c-article-header__container">
        <div {...classes('content')}>
          <Link route={getRouteByType(publicationType.title)}>
            <a className="c-btn--sen">
              <h6>
                {' '}
                {/* {publicationType.title && `Publication | ${publicationType.title}`} */}
                {publicationType.title && `${publicationType.title}`}
              </h6>
            </a>
          </Link>

          <h2 className="u-headline--black--44">{title}</h2>
          {subtitle ? <p {...classes('subtitle')}>{subtitle}</p> : null}
          {/* {standfirst ? <p {...classes('intro')}>{standfirst}</p> : null} */}
          <div {...classes('actions')}>
            {content.length > 0 && (
              <button
                className="c-btn c-btn--sec"
                onClick={() => {
                  setReaderOpen(true);
                  if (typeof window !== 'undefined') {
                    window.scrollTo(0, 0);
                  }
                }}
              >
                Read online
              </button>
            )}
            {pdfAsset && content.length > 0 && (
              <a
                href={`/publications/${slug.current}.pdf`}
                //download={`/publication/${slug.current}.pdf`}
                target="_blank"
                className="c-btn c-btn--qua"
              >
                <span>Download PDF</span>
              </a>
            )}

            {!content.length && legacypdf.asset ? (
              <a
                href={`/publications/${slug.current}.pdf`}
                //download={`/publication/${slug.current}.pdf`}
                target="_blank"
                className="c-btn c-btn--sec"
              >
                <span>Read online</span>
              </a>
            ) : null}
            {!content.length && legacypdf.asset ? (
              <a
                href={`/publications/${slug.current}.pdf`}
                download={`/publication/${slug.current}.pdf`}
                target="_blank"
                className="c-btn c-btn--qua"
              >
                <span>Download PDF</span>
              </a>
            ) : null}

            {summary.length > 0 && (
              <Link route="publication.shortVersion" params={{ slug: slug.current }}>
                <a className="c-btn c-btn--qua">
                  <span {...classes('button-text')}>Read short version</span>
                  {/* <div {...classes('button-icon')} /> */}
                </a>
              </Link>
            )}
          </div>
        </div>
        <hr className="u-section-underline--no-margins" />
      </div>
    </header>
  );
};

export default PublicationArticleHeader;
