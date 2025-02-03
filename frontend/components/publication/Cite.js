'use client';

import React, { useRef } from 'react';
import { CopyToClipboardButton } from '../general/CopyToClipboardButton';
import dateToString from '../../helpers/dateToString';
import fullTitle from '@/helpers/fullTitle';

export const Cite = ({
  authors = [],
  date = {},
  title = '',
  subtitle = '',
  publicationType = {},
  header = 'publication',
  publicationNumber = '',
  reference = '',
}) => {
  const citeRef = useRef(null);
  // const authorsString = authors.map(author => (author.target ? author.target : author)).map((a,index) => (`${a.surname}, ${a.firstName.slice(1)}. ${index < authors.length - 1 ? ', ' : ''}`)
  const authorsFiltered = authors.map(author => (author.target ? author.target : author));
  // console.log(authorsFiltered)
  const authorsString = authorsFiltered
    .map((a, index) => {
      return a.surname && a.firstName
        ? `${a.surname}, ${a.firstName.substring(0, 1)}.`
        : a.surname
        ? `${a.surname}`
        : a.firstName
        ? `${a.firstName}`
        : '';
    })
    .join('; ');
  const titleSubtitle = fullTitle({ title, subtitle });
  const titleString = titleSubtitle.concat('.!?'.includes(titleSubtitle.slice(-1)) ? '' : '.');
  const refString =
    reference ||
    `Bergen: U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute (${
      publicationType.title
    } ${publicationNumber})`;
  return (
    <div className="c-cite">
      <div className="c-cite__container">
        <h4 className="u-secondary-heading u-secondary-h4 u-text--white">{`Cite this ${header}`}</h4>
        <hr className="u-section-underline--no-margins" />
        <div className="c-cite__content">
          <p className="u-body--white" ref={citeRef}>
            {`${authorsString} ${authorsString.slice(-1) === '.' ? '' : '.'} ${
              date ? dateToString({ start: date.utc }).split(' ')[2] : ''
            }. ${titleString} ${refString}`}
          </p>
        </div>
        <div className="c-cite__action">
          <CopyToClipboardButton reference={citeRef} />
        </div>
      </div>
    </div>
  );
};
