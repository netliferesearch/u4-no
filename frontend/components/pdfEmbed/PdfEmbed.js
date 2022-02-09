import React from 'react';
import PropTypes from 'prop-types';
import Script from 'next/script';
import SizedContainer from './SizedContainer';
import FullWindow from './FullWindow';
import LightBox from './LightBox';
import InLine from './InLine';

// SizedContainer : must set height; one page at the time inside container
// FullWindow: must set height; all pages flowing inside container
// LightBox: click button to open full screen, flowing pages
// InLine: all pages flowing

const PdfEmbed = ({ src = '', title = '', mode = '' }) => (
  <div>
    <div>API key: ({process.env.ADOBE_PDF_API_KEY})</div>
    <Script id="pdfembed" src="https://documentcloud.adobe.com/view-sdk/main.js" />

    {(() => {
      switch (mode) {
        case 'sizedcontainer':
          return <SizedContainer src={src} title={title} />;
        case 'fullwindow':
          return <FullWindow src={src} title={title} />;
        case 'lightbox':
          return <LightBox src={src} title={title} />;
        case 'inline':
          return <InLine src={src} title={title} />;
        default:
          return <InLine src={src} title={title} />;
      }
    })()}
  </div>
);

PdfEmbed.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  mode: PropTypes.string,
};

PdfEmbed.defaultProps = {
  title: '',
  mode: '',
};

export default PdfEmbed;
