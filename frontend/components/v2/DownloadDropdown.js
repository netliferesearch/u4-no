import React, { useState } from 'react';
import { ArrowWhite } from '../icons/ArrowWhite';

export const DownloadPdf = (url) => {
  const [downloadsOpen, setDownloadsOpen] = useState(false);

  //TO DO: check pdf services, in case a pdf generation is necessary.
 
  return url ? (
    <div className="download">
      <div className={`dropdown-select${downloadsOpen ? ' open' : ''}`}>
        <a
          onClick={() => setDownloadsOpen(!downloadsOpen)}
          href={url}
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
