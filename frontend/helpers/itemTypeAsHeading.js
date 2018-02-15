export default ({ _type = '', publicationType = false, articleType = '' }) => {
  if (_type === 'publication' && publicationType) return publicationType.title;
  if (_type === 'article' && articleType) return articleType;
  if (_type === 'topics') return 'Topic';
  if (_type === 'term') return 'Glossary term';
  return _type;
};
