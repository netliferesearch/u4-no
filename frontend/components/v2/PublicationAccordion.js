import React, { useState, useRef } from 'react';
import { CopyToClipboardButton } from './';
import {
  CreativecommonsCC,
  CreativecommonsBY,
  CreativecommonsNC,
  CreativecommonsND,
} from '../icons';

const PublicationAccordion = ({ standfirst = '', date = {} }) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const toggleAccordion = index => {
    const newIndex = index === activeAccordion ? -1 : index;
    setActiveAccordion(newIndex);
  };
  const citeRef = useRef(null);
  return (
    <div className="publication-accordion">
      <div className="c-accordion__block" onClick={e => toggleAccordion(0)}>
        <div className="c-accordion__container">
          <h3 className="title">Cite this publication</h3>
          <div className={`c-accordion__content${activeAccordion === 0 ? ' open' : ''}`}>
            <p ref={citeRef}>{standfirst}</p>
            <CopyToClipboardButton reference={citeRef} />
          </div>
        </div>
        <div className="c-accordion__arrow">
          <img src="/static/arrow-right-slim.svg" alt="Accordion arrow" />
        </div>
      </div>
      <div className="c-accordion__block" onClick={e => toggleAccordion(1)}>
        <div className="c-accordion__container">
          <h3 className="title">Licence</h3>
          <div className={`c-accordion__content${activeAccordion === 1 ? ' open' : ''}`}>
            <p>
              <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                <CreativecommonsCC className="page2-ccimage" />
                <CreativecommonsBY className="page2-ccimage" />
                <CreativecommonsNC className="page2-ccimage" />
                <CreativecommonsND className="page2-ccimage" />
              </a>
              <br />
              This work is licenced under a Creative Commons Attribution-NonCommercial-NoDerivatives
              4.0 International licence (
              <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>)
            </p>
          </div>
        </div>
        <div className="c-accordion__arrow">
          <img src="/static/arrow-right-slim.svg" alt="Accordion arrow" />
        </div>
      </div>
      <div className="c-accordion__block" onClick={e => toggleAccordion(2)}>
        <div className="c-accordion__container">
          <h3 className="title">Disclaimer</h3>
          <div className={`c-accordion__content${activeAccordion === 2 ? ' open' : ''}`}>
            <p>
              All views in this text are the author(s)’, and may differ from the U4 partner
              agencies’ policies.
            </p>
          </div>
        </div>
        <div className="c-accordion__arrow">
          <img src="/static/arrow-right-slim.svg" alt="Accordion arrow" />
        </div>
      </div>
    </div>
  );
};

export default PublicationAccordion;
