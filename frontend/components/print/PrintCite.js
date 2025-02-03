import React from 'react';
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
  const authorsFiltered = authors.map(author => (author.target ? author.target : author));
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
    <div className="back-inside-details-content">
      {`${authorsString} ${authorsString.slice(-1) === '.' ? '' : '.'} ${
        date ? dateToString({ start: date.utc }).split(' ')[2] : ''
      }. ${titleString} ${refString}`}
    </div>
  );
};
