import moment from 'moment';

/*
  return date formatted as format string
  if start and end dates don't repeat year and month if same
*/
export default ({ start = '', end = '', format = 'D MMMM YYYY' }) => {
  if (start === '') {
    return '';
  } else if (end === '') {
    return moment(start).format(format);
  } else if (moment(start).year() !== moment(end).year()) {
    return `${moment(start).format(format)} - ${moment(end).format(format)}`;
  } else if (moment(start).month() !== moment(end).month()) {
    return `${moment(start).format('D MMMM')} - ${moment(end).format(format)}`;
  } else if (moment(start).day() !== moment(end).day()) {
    return `${moment(start).format('D')} - ${moment(end).format(format)}`;
  }
  return moment(start).format(format);
};
