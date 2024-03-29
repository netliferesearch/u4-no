import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Copy } from '../icons/Copy';

export const CopyToClipboardButton = ({
  reference = {},
  text = 'Copy',
  textAfterCopy = 'Copied to clipboard',
}) => {
  const [copyText, setCopyText] = useState(text);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const copyToClipboard = () => {
    if (documentLoaded) {
      const range = document.createRange();
      range.selectNode(reference.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      setCopyText(textAfterCopy);
    }
  };

  useEffect(() => {
    setDocumentLoaded(true);
  }, []);

  return documentLoaded && document.queryCommandSupported('copy') ? (
    <button onClick={copyToClipboard} className="c-btn c-btn--primary c-btn--primary--onDark">
      {text}
      {/* {copyText} */}
      {/* <Copy /> */}
    </button>
  ) : null;
};

CopyToClipboardButton.propTypes = {
  reference: PropTypes.object.isRequired,
  text: PropTypes.string,
  textAfterCopy: PropTypes.string,
};