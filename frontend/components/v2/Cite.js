import React, { useState, useRef } from 'react';
import { CopyToClipboardButton } from './';
import dateToString from '../../helpers/dateToString';
import { Copy } from './icons/Copy';

export const Cite = ({ date = {}, title = '', publicationType = {}, header='publication' }) => {
  // const [activeAccordion, setActiveAccordion] = useState(-1);
  // const toggleAccordion = index => {
  //   const newIndex = index === activeAccordion ? -1 : index;
  //   setActiveAccordion(newIndex);
  // };
  const citeRef = useRef(null);

  return (
    <div className="c-cite">
      <div className="c-accordion__block">
        <div className="c-accordion__container">
          <h3 className="c-accordion__title">{`Cite this ${header}`}</h3>
          <CopyToClipboardButton reference={citeRef} />

          <div className={`c-accordion__content open`}>
            <p ref={citeRef}>{`U4. ${
              date ? dateToString({ start: date.utc }).split(' ')[2] : ''
            }. ${title}. ${
              publicationType.title
            }. Bergen: U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute.`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
