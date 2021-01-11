import React, { useState, useRef } from 'react';
import { CopyToClipboardButton } from './';
import dateToString from '../../helpers/dateToString';
import { Copy } from './icons/Copy';

export const Cite = ({ date = {}, title = '', publicationType = {}, header = 'publication' }) => {
  // const [activeAccordion, setActiveAccordion] = useState(-1);
  // const toggleAccordion = index => {
  //   const newIndex = index === activeAccordion ? -1 : index;
  //   setActiveAccordion(newIndex);
  // };
  const citeRef = useRef(null);

  return (
    <div className="c-cite">
      <hr className="u-section-underline--no-margins" />
      <div className="c-cite__action">
        <h3 className="u-headline--2">{`Cite this ${header}`}</h3>
        <CopyToClipboardButton reference={citeRef} />
      </div>
      <div className="c-cite__content">
        <p ref={citeRef}>{`U4. ${
          date ? dateToString({ start: date.utc }).split(' ')[2] : ''
        }. ${title}. ${
          publicationType.title
        }. Bergen: U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute.`}</p>
      </div>
    </div>
  );
};
