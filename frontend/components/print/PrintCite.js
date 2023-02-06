import React from 'react';
import dateToString from '../../helpers/dateToString';

export const Cite = ({
    authors = [],
    date = {},
    title = '',
    publicationType = {},
    publicationNumber = '',
  }) => {
    const authorsFiltered = authors.map(author => (author.target ? author.target : author));
    // console.log(authorsFiltered)
    const authorsString = authorsFiltered
      .map((a, index) => {
        return a.surname && a.firstName
          ? `${a.surname}, ${a.firstName.substring(0, 1)}.; `
          : a.surname
          ? `${a.surname}; `
          : a.firstName
          ? `${a.firstName}; `
          : '';
      })
      .join('');
    return (
            <div className='back-inside-details-content'>
              {`${authorsString} (${
                date ? dateToString({ start: date.utc }).split(' ')[2] : ''
              }) ${title}. Bergen: U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute
              (${publicationType.title} ${publicationNumber})`}
            </div>
    );
  };
  