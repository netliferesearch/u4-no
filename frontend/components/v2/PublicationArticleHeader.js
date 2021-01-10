import React from 'react';
import BEMHelper from 'react-bem-helper';
import { getRouteByType } from '../../helpers/getRouteByType';
import { Link } from '../../routes';
import { Reader } from './Reader';

const classes = BEMHelper({
  name: 'article-header-v2',
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
      <div className="o-wrapper-section c-article-header__container">
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
            {(content.length > 0 || legacypdf.asset) && (
              <button
                className="c-btn c-btn--sec"
                onClick={() => {
                  setReaderOpen(true);
                }}
              >
                Read online
              </button>
            )}
            {pdfAsset && (
              <a
                href={`/publication/${slug.current}.pdf`}
                //download={`/publication/${slug.current}.pdf`}
                target="_blank"
                className="c-btn c-btn--qua"
              >
                <span>Download as PDF</span>
              </a>
            )}

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

// const PublicationArticleHeader = ({
//   title = '',
//   subtitle = '',
//   lead = '',
//   slug = {},
//   className = '',
//   publicationType = {},
//   standfirst = '',
//   pdfFile = {},
//   legacypdf = {},
//   shortversion = false,
//   content = [],
//   summary = [],
//   mainPoints = [],
//   setReaderOpen = null,
//   readerOpen = false
// }) => {
//   const [downloadsOpen, setDownloadsOpen] = useState(false);
//   const pdfAsset = legacypdf.asset ? legacypdf.asset : pdfFile.asset;

//   return (
//     <header {...classes('', null, className)}>
//       <div className="o-wrapper-section c-article-header__container">
//         <div {...classes('meta')}>
//           <h6 className="u-navy-small-headline">
//             {publicationType.title && `Publication | ${publicationType.title}`}
//           </h6>
//         </div>
//         <div {...classes('left')}>
//           <h1 className="u-navy-mid-headline">{title}</h1>
//           {standfirst ? <p {...classes('intro')}>{standfirst}</p> : null}
//           <div {...classes('download')}>
//             {pdfAsset && (
//               <div className={`dropdown-select${downloadsOpen ? ' open' : ''}`}>
//                 <a
//                   onClick={() => setDownloadsOpen(!downloadsOpen)}
//                   {...classes('download-text button')}
//                 >
//                   <span>Download as PDF</span>
//                   <ArrowWhite />
//                 </a>
//                 <div className="other-links">
//                   {mainPoints.length > 0 && (
//                     <a
//                       href={`/publication/${slug.current}.pdf`}
//                       //download={`/publication/${slug.current}.pdf`}
//                       {...classes('download-text button')}
//                       target="_blank"
//                     >
//                       <span>Main points</span>
//                     </a>
//                   )}
//                   {mainPoints.length > 0 && summary.length > 0 && (
//                     <a
//                       href={`/publication/${slug.current}.pdf`}
//                       //download={`/publication/${slug.current}.pdf`}
//                       {...classes('download-text button')}
//                       target="_blank"
//                     >
//                       <span>Main points + summary</span>
//                     </a>
//                   )}
//                   <a
//                     href={`/publication/${slug.current}.pdf`}
//                     //download={`/publication/${slug.current}.pdf`}
//                     {...classes('download-text button')}
//                     target="_blank"
//                   >
//                     <span>Full report</span>
//                   </a>
//                 </div>
//               </div>
//             )}
//             {(content.length > 0 || legacypdf.asset) && (
//               <button
//                 className="read-online button"
//                 onClick={() => {
//                   setReaderOpen(true)
//                   setDownloadsOpen(false);
//                 }}
//               >
//                 Read online
//                 <ArrowRight />
//               </button>
//             )}
//           </div>
//         </div>
//         {(pdfFile.asset || legacypdf.asset) && (
//           <div {...classes('right pdf-preview')}>
//             {/* {useMediaQuery('tablet') && ( */}
//             <Document file={pdfFile.asset ? pdfFile.asset : legacypdf.asset}>
//               <Page pageNumber={1} />
//             </Document>
//             {/* )} */}
//           </div>
//         )}
//       </div>
//       {readerOpen && (
//         <Reader title={title} content={content} setReaderOpen={setReaderOpen} legacypdf={legacypdf} />
//       )}
//     </header>
//   );
// };

// export default PublicationArticleHeader;
