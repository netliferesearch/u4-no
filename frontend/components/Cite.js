import React, { useRef } from 'react';
import { CopyToClipboardButton } from './CopyToClipboardButton';
import dateToString from '../helpers/dateToString';

export const Cite = ({ date = {}, title = '', publicationType = {}, header = 'publication' }) => {
  const citeRef = useRef(null);

  return (
    <div className="c-cite">
      <hr className="u-section-underline--no-margins" />
      <div className="c-cite__action">
        <h3 className="u-primary-heading">{`Cite this ${header}`}</h3>
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
