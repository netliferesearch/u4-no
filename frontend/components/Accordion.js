import React, { useState } from 'react';
import { ArrowDownCollapsible } from './icons/ArrowDownCollapsible';

export const Accordion = ({}) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const toggleAccordion = index => {
    const newIndex = index === activeAccordion ? -1 : index;
    setActiveAccordion(newIndex);
  };

  return (
    <div className="c_accordion">
      <div className="c-accordion__block" onClick={e => toggleAccordion(0)}>
        <div className="c-accordion__container">
          <h3 className="c-accordion__title">Cite this publication</h3>
          <div className={`c-accordion__content${activeAccordion === 0 ? ' open' : ''}`} />
        </div>
        <div className={`c-accordion__arrow${activeAccordion === 0 ? ' open' : ''}`}>
          <ArrowDownCollapsible />
        </div>
      </div>
      <div className="c-accordion__block" onClick={e => toggleAccordion(1)}>
        <div className="c-accordion__container">
          <h3 className="c-accordion__title">Licence</h3>
          <div className={`c-accordion__content${activeAccordion === 1 ? ' open' : ''}`} />
        </div>
        <div className={`c-accordion__arrow${activeAccordion === 1 ? ' open' : ''}`}>
          <ArrowDownCollapsible />
        </div>
      </div>
      <div className="c-accordion__block" onClick={e => toggleAccordion(2)}>
        <div className="c-accordion__container">
          <h3 className="c-accordion__title">Disclaimer</h3>
          <div className={`c-accordion__content${activeAccordion === 2 ? ' open' : ''}`} />
        </div>
        <div className={`c-accordion__arrow${activeAccordion === 2 ? ' open' : ''}`}>
          <ArrowDownCollapsible />
        </div>
      </div>
    </div>
  );
};
