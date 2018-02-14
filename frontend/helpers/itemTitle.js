export default ({
  _type = '', title = '', firstName = '', surname = '', term = '',
}) => {
  if (_type === 'person') return `${firstName} ${surname}`;
  if (_type === 'term') return term;
  return title;
};
