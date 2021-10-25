import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { getPdfUrl } from '../../helpers/getPdfUrl';
import { Post, POST_TYPE } from '../general/post/Post';
import { getPlaceholder } from '../../helpers/imgloader';
import Link from 'next/link';

export const SearchResult = props => {
  const { _source = {} } = props;
  const { type = '' } = _source;
  //converting empty arrays to strings
  console.log('_source', _source)
  const pdfFileView = getPdfUrl(_source.pdfFile);
  const pdfFileUrlView = getPdfUrl(_source.pdfFileUrl);
  const legacypdfFileUrlView = getPdfUrl(_source.legacypdfFileUrl);
  const { termTitle = '', url = '', termContent = {} } = _source;
  return (
    <div>
      {type === 'term' ? (
        <div className="c-search-results-v2__glossary">
          <span className="c-search-results-v2__items-type">Glossary</span>
          <br />
          <Link href={url}>
            <a className="c-search-results-v2__items-title">{termTitle}</a>
          </Link>
          <br />
          <p>{termContent}</p>
        </div>
      ) : (
        <div className="c-search-results-v2__pdf-container">
          {props.publications && (pdfFileView || pdfFileUrlView || legacypdfFileUrlView) ? (
            <div className="pdf-preview">
              <Document file={pdfFileView || pdfFileUrlView || legacypdfFileUrlView}>
                <Page pageNumber={1} />
              </Document>
            </div>
          ) : null}

          <Post
            showImage={false}
            type={POST_TYPE.SEARCH}
            post={_source}
            placeholder={getPlaceholder(1)}
          />
        </div>
      )}
    </div>
  );
};
