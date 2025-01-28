import React from 'react';
//import { Document, Page } from 'react-pdf/build/entry.noworker';
import { getPdfUrl } from '../../helpers/getPdfUrl';
import { Post, POST_TYPE } from '../general/post/Post';
import { getPlaceholder } from '../../helpers/imgloader';
import Link from 'next/link';
import sanityImageLoader from '../../helpers/sanityImageLoader';
import Image from 'next/image';

export const SearchResult = props => {
  const { _source = {} } = props;
  const { type = '' } = _source;
  //converting empty arrays to strings
  const pdfFileView = getPdfUrl(_source.pdfFile);
  const pdfFileUrlView = getPdfUrl(_source.pdfFileUrl);
  const legacypdfFileUrlView = getPdfUrl(_source.legacypdfFileUrl);
  const pdfThumbnailUrlView = getPdfUrl(_source.pdfThumbnailUrl);
  const { termTitle = '', url = '', termContent = {} } = _source;
  return (
    <div>
      {type === 'term' ? (
        <div className="c-search-results-v2__glossary">
          <span className="c-search-results-v2__items-type">Glossary</span>
          <br />
          <Link href={url} className="c-search-results-v2__items-title">
            {termTitle}
          </Link>
          <br />
          <p>{termContent}</p>
        </div>
      ) : (
        <div className="c-search-results-v2__pdf-container">
          {props.publications &&
          (pdfFileView || pdfFileUrlView || legacypdfFileUrlView || pdfThumbnailUrlView) ? (
            <div className="pdf-preview">
              {pdfThumbnailUrlView ? (
                <div className="pdf-thumbnail">
                  <Image
                    loader={sanityImageLoader}
                    src={pdfThumbnailUrlView}
                    alt=""
                    loading="lazy"
                    width={180}
                    height={0}
                    style={{
                      objectFit: 'contain',
                      width: '180px',
                      height: 'auto',
                    }}
                  />
                </div>
              ) : null}
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
