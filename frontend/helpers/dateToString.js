import { format } from 'date-fns'

/*
  return date formatted as format string
  if start and end dates don't repeat year and month if same
*/
const DateToString = ({ start = '', end = '', dateFormat = 'd MMMM yyyy' }) => {

  // just use date part to avoid any timezone hassle
  const startDate = start? new Date(start.split('T')[0]) : null;
  const endDate = end ? new Date(end.split('T')[0]) : null;
  
  if (start === '') {
    return '';

  } else if (end === '') {
    return format(startDate, dateFormat)
    
  } else if (format(startDate, 'Y') !== format(endDate, 'Y') ){
    return `${format(startDate, dateFormat)} - ${format(endDate, dateFormat)}`;

  } else if (format(startDate, 'M') !== format(endDate, 'M') ){
    return `${format(startDate, 'd MMMM')} - ${format(endDate, dateFormat)}`;

  } else if (format(startDate, 'd') !== format(endDate, 'd') ){
    return `${format(startDate, 'd')} - ${format(endDate, dateFormat)}`;
  }
  return format(startDate, dateFormat)
};

export default DateToString