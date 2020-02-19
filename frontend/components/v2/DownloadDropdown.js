import React, { useState } from 'react';
import { ArrowWhite } from '../icons/ArrowWhite';

export const DownloadPdf = ({ pdfFile, slug }) => {
  const [downloadsOpen, setDownloadsOpen] = useState(false);

  //TO DO: check pdf services, in case a pdf generation is necessary.

  return pdfFile.asset ? (
    <div className="download">
      <div className={`dropdown-select${downloadsOpen ? ' open' : ''}`}>
        <a
          onClick={() => setDownloadsOpen(!downloadsOpen)}
          href={pdfFile.asset.url}
          target="_blank"
          className="download-text button"
        >
          <span>Download PDF</span>
          <ArrowWhite />
        </a>
      </div>
    </div>
  ) : null;
};
