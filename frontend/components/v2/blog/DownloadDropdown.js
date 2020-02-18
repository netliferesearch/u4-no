import React, { useState } from 'react';
import { ArrowWhite } from '../../../components/icons/ArrowWhite';


export const DownloadPdf = ({pdfFile}) => {
  const [downloadsOpen, setDownloadsOpen] = useState(false)

  return ( 
    pdfFile.asset ? (
      <div className="download">
        <div className={`dropdown-select${downloadsOpen ? ' open' : ''}`}>
          <a onClick={() => setDownloadsOpen(!downloadsOpen)} className="download-text button">
            <span>Download PDF</span>
            <ArrowWhite />
          </a>
          <div className="other-links">
            {/* <a
              href={`/publication/${slug.current}.pdf`}
              download={`/publication/${slug.current}.pdf`}
              className="download-text button"
              target="_blank"
            >
              <span>Main points</span>
            </a>
            <a
              href={`/publication/${slug.current}.pdf`}
              download={`/publication/${slug.current}.pdf`}
              className="download-text button"
              target="_blank"
            >
              <span>Main points + summary</span>
            </a>
            <a
              href={`/publication/${slug.current}.pdf`}
              download={`/publication/${slug.current}.pdf`}
              className="download-text button"
              target="_blank"
            >
              <span>Full report</span>
            </a> */}
          </div>
        </div>
        {/* <button className="read-online button" onClick={() => setReading(true)}>
          Read online
          <ArrowRight />
        </button> */}
      </div>
    ) : null
  ) }
