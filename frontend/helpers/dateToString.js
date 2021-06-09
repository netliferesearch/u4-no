import { format } from 'date-fns'

/*
  return date formatted as format string
  if start and end dates don't repeat year and month if same
*/
const DateToString = ({ start = '', end = '', dateFormat = 'D MMMM YYYY' }) => {
  if (start === '') {
    return '';

  } else if (end === '') {
    return format(new Date(start), dateFormat)
    
  } else if (format(new Date(start), 'Y') !== format(new Date(end), 'Y') ){
    return `${format(new Date(start), dateFormat)} - ${format(new Date(end), dateFormat)}`;

  } else if (format(new Date(start), 'M') !== format(new Date(end), 'M') ){
    return `${format(new Date(start), 'D MMMM')} - ${format(new Date(end), dateFormat)}`;

  } else if (format(new Date(start), 'd') !== format(new Date(end), 'd') ){
    return `${format(new Date(start), 'D')} - ${format(new Date(end), dateFormat)}`;
  }
  return format(new Date(start), dateFormat)
};

export default DateToString